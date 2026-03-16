import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const StoreContext = createContext(null);

const STORAGE_KEYS = {
  cart: "techverse_cart",
  wishlist: "techverse_wishlist",
};

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadInitialState() {
  const cart = safeParse(localStorage.getItem(STORAGE_KEYS.cart), []);
  const wishlist = safeParse(localStorage.getItem(STORAGE_KEYS.wishlist), []);
  return { cart, wishlist };
}

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD": {
      const item = action.payload;
      const existing = state.cart.find((x) => x.id === item.id);
      const cart = existing
        ? state.cart.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + 1 } : x
          )
        : [...state.cart, { ...item, qty: 1 }];
      return { ...state, cart };
    }

    case "CART_REMOVE": {
      const id = action.payload;
      const cart = state.cart.filter((x) => x.id !== id);
      return { ...state, cart };
    }

    case "CART_SET_QTY": {
      const { id, qty } = action.payload;
      const q = Math.max(1, Number(qty || 1));
      const cart = state.cart.map((x) => (x.id === id ? { ...x, qty: q } : x));
      return { ...state, cart };
    }

    case "CART_CLEAR":
      return { ...state, cart: [] };

    case "WISHLIST_TOGGLE": {
      const item = action.payload;
      const exists = state.wishlist.some((x) => x.id === item.id);
      const wishlist = exists
        ? state.wishlist.filter((x) => x.id !== item.id)
        : [...state.wishlist, item];
      return { ...state, wishlist };
    }

    case "WISHLIST_REMOVE": {
      const id = action.payload;
      const wishlist = state.wishlist.filter((x) => x.id !== id);
      return { ...state, wishlist };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const cartCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + (item.qty || 0), 0),
    [state.cart]
  );

  const wishlistCount = useMemo(() => state.wishlist.length, [state.wishlist]);

  const value = useMemo(
    () => ({
      cart: state.cart,
      wishlist: state.wishlist,
      cartCount,
      wishlistCount,
      addToCart: (product) => dispatch({ type: "CART_ADD", payload: product }),
      removeFromCart: (id) => dispatch({ type: "CART_REMOVE", payload: id }),
      setCartQty: (id, qty) =>
        dispatch({ type: "CART_SET_QTY", payload: { id, qty } }),
      clearCart: () => dispatch({ type: "CART_CLEAR" }),
      toggleWishlist: (product) =>
        dispatch({ type: "WISHLIST_TOGGLE", payload: product }),
      removeFromWishlist: (id) =>
        dispatch({ type: "WISHLIST_REMOVE", payload: id }),
      isWishlisted: (id) => state.wishlist.some((x) => x.id === id),
    }),
    [state.cart, state.wishlist, cartCount, wishlistCount]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore duhet te perdoret brenda StoreProvider");
  return ctx;
}