import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const StoreContext = createContext(null);

const API_URL = "http://localhost:5000/api";

function getToken() {
  return (
    localStorage.getItem("techverse_token") ||
    sessionStorage.getItem("techverse_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    ""
  );
}

async function apiRequest(path, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loadingStore, setLoadingStore] = useState(false);
  const [storeError, setStoreError] = useState("");

  const loadCart = useCallback(async () => {
    if (!getToken()) {
      setCart([]);
      return;
    }

    const data = await apiRequest("/Cart");

    setCart(
      (data || []).map((item) => ({
        ...item.product,
        cartItemId: item.id,
        qty: item.quantity,
      }))
    );
  }, []);

  const loadWishlist = useCallback(async () => {
    if (!getToken()) {
      setWishlist([]);
      return;
    }

    const data = await apiRequest("/Wishlist");

    setWishlist(
      (data || []).map((item) => ({
        ...item.product,
        wishlistItemId: item.id,
      }))
    );
  }, []);

  const refreshStore = useCallback(async () => {
    if (!getToken()) {
      setCart([]);
      setWishlist([]);
      return;
    }

    setLoadingStore(true);
    setStoreError("");

    try {
      await Promise.all([loadCart(), loadWishlist()]);
    } catch (error) {
      setStoreError(error.message);
    } finally {
      setLoadingStore(false);
    }
  }, [loadCart, loadWishlist]);

  useEffect(() => {
    refreshStore();
  }, [refreshStore]);

  const addToCart = useCallback(
    async (product) => {
      if (!getToken()) {
        throw new Error("Duhet të kyçeni për të shtuar produkte në shportë.");
      }

      setStoreError("");

      try {
        await apiRequest("/Cart", {
          method: "POST",
          body: JSON.stringify({
            productId: product.id,
            quantity: 1,
          }),
        });

        await loadCart();
      } catch (error) {
        setStoreError(error.message);
        throw error;
      }
    },
    [loadCart]
  );

  const removeFromCart = useCallback(async (id) => {
    if (!getToken()) {
      return;
    }

    const item = cart.find((product) => product.id === id);

    if (!item?.cartItemId) {
      return;
    }

    setStoreError("");

    try {
      await apiRequest(`/Cart/${item.cartItemId}`, {
        method: "DELETE",
      });

      setCart((current) => current.filter((product) => product.id !== id));
    } catch (error) {
      setStoreError(error.message);
      throw error;
    }
  }, [cart]);

  const setCartQty = useCallback(
    async (id, qty) => {
      if (!getToken()) {
        return;
      }

      const item = cart.find((product) => product.id === id);

      if (!item?.cartItemId) {
        return;
      }

      const quantity = Math.max(1, Number(qty || 1));

      setStoreError("");

      try {
        await apiRequest(`/Cart/${item.cartItemId}`, {
          method: "PUT",
          body: JSON.stringify({
            quantity,
          }),
        });

        setCart((current) =>
          current.map((product) =>
            product.id === id ? { ...product, qty: quantity } : product
          )
        );
      } catch (error) {
        setStoreError(error.message);
        throw error;
      }
    },
    [cart]
  );

  const clearCart = useCallback(async () => {
    if (!getToken()) {
      setCart([]);
      return;
    }

    setStoreError("");

    try {
      await apiRequest("/Cart", {
        method: "DELETE",
      });

      setCart([]);
    } catch (error) {
      setStoreError(error.message);
      throw error;
    }
  }, []);

  const toggleWishlist = useCallback(
    async (product) => {
      if (!getToken()) {
        throw new Error("Duhet të kyçeni për të përdorur wishlist.");
      }

      const exists = wishlist.some((item) => item.id === product.id);

      setStoreError("");

      try {
        if (exists) {
          await apiRequest(`/Wishlist/${product.id}`, {
            method: "DELETE",
          });

          setWishlist((current) =>
            current.filter((item) => item.id !== product.id)
          );
        } else {
          await apiRequest(`/Wishlist/${product.id}`, {
            method: "POST",
          });

          await loadWishlist();
        }
      } catch (error) {
        setStoreError(error.message);
        throw error;
      }
    },
    [wishlist, loadWishlist]
  );

  const removeFromWishlist = useCallback(async (id) => {
    if (!getToken()) {
      return;
    }

    setStoreError("");

    try {
      await apiRequest(`/Wishlist/${id}`, {
        method: "DELETE",
      });

      setWishlist((current) =>
        current.filter((product) => product.id !== id)
      );
    } catch (error) {
      setStoreError(error.message);
      throw error;
    }
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.some((product) => product.id === id),
    [wishlist]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.qty || 0), 0),
    [cart]
  );

  const wishlistCount = wishlist.length;

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount,
      wishlistCount,
      loadingStore,
      storeError,
      addToCart,
      removeFromCart,
      setCartQty,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted,
      refreshStore,
    }),
    [
      cart,
      wishlist,
      cartCount,
      wishlistCount,
      loadingStore,
      storeError,
      addToCart,
      removeFromCart,
      setCartQty,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted,
      refreshStore,
    ]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw new Error("useStore duhet te perdoret brenda StoreProvider");
  }

  return ctx;
}