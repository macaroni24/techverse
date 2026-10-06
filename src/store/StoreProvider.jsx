import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const StoreContext = createContext(null);
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://techverse.runasp.net/api";

function getToken() {
  const directToken =
    localStorage.getItem("techverse_token") ||
    sessionStorage.getItem("techverse_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (directToken) {
    return directToken;
  }

  const storedAuth =
    localStorage.getItem("techverse_auth") ||
    sessionStorage.getItem("techverse_auth");

  if (storedAuth) {
    try {
      const parsed = JSON.parse(storedAuth);
      return parsed?.token || "";
    } catch {
      return "";
    }
  }

  return "";
}

function clearAuthStorage() {
  localStorage.removeItem("techverse_token");
  localStorage.removeItem("techverse_user");
  localStorage.removeItem("techverse_auth");
  localStorage.removeItem("token");

  sessionStorage.removeItem("techverse_token");
  sessionStorage.removeItem("techverse_user");
  sessionStorage.removeItem("techverse_auth");
  sessionStorage.removeItem("token");
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
    const error = new Error(
      data?.message || `Request failed with status ${response.status}`
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loadingStore, setLoadingStore] = useState(false);
  const [storeError, setStoreError] = useState("");

  const resetStore = useCallback(() => {
    setCart([]);
    setWishlist([]);
    setStoreError("");
    setLoadingStore(false);
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    resetStore();
  }, [resetStore]);

  const loadCart = useCallback(async () => {
    const requestToken = getToken();

    if (!requestToken) {
      setCart([]);
      return;
    }

    const data = await apiRequest("/Cart");

    if (requestToken !== getToken()) {
      return;
    }

    setCart(
      (data || []).map((item) => ({
        ...item.product,
        cartItemId: item.id,
        qty: item.quantity,
      }))
    );
  }, []);

  const loadWishlist = useCallback(async () => {
    const requestToken = getToken();

    if (!requestToken) {
      setWishlist([]);
      return;
    }

    const data = await apiRequest("/Wishlist");

    if (requestToken !== getToken()) {
      return;
    }

    setWishlist(
      (data || []).map((item) => ({
        ...item.product,
        wishlistItemId: item.id,
      }))
    );
  }, []);

  const refreshStore = useCallback(async () => {
    const token = getToken();

    if (!token) {
      resetStore();
      return;
    }

    setLoadingStore(true);
    setStoreError("");
    setCart([]);
    setWishlist([]);

    try {
      await Promise.all([loadCart(), loadWishlist()]);
    } catch (error) {
      if (error.status === 401) {
        logout();
        return;
      }

      setStoreError(error.message);
    } finally {
      setLoadingStore(false);
    }
  }, [loadCart, loadWishlist, logout, resetStore]);

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
        if (error.status === 401) {
          logout();
        }

        setStoreError(error.message);
        throw error;
      }
    },
    [loadCart, logout]
  );

  const removeFromCart = useCallback(
    async (id) => {
      if (!getToken()) {
        setCart([]);
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

        setCart((current) =>
          current.filter((product) => product.id !== id)
        );
      } catch (error) {
        if (error.status === 401) {
          logout();
        }

        setStoreError(error.message);
        throw error;
      }
    },
    [cart, logout]
  );

  const setCartQty = useCallback(
    async (id, qty) => {
      if (!getToken()) {
        setCart([]);
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
            product.id === id
              ? { ...product, qty: quantity }
              : product
          )
        );
      } catch (error) {
        if (error.status === 401) {
          logout();
        }

        setStoreError(error.message);
        throw error;
      }
    },
    [cart, logout]
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
      if (error.status === 401) {
        logout();
      }

      setStoreError(error.message);
      throw error;
    }
  }, [logout]);

  const toggleWishlist = useCallback(
    async (product) => {
      if (!getToken()) {
        setWishlist([]);
        throw new Error("Duhet të kyçeni për të përdorur wishlist.");
      }

      const exists = wishlist.some(
        (item) => item.id === product.id
      );

      setStoreError("");

      try {
        if (exists) {
          await apiRequest(`/Wishlist/${product.id}`, {
            method: "DELETE",
          });

          setWishlist((current) =>
            current.filter(
              (item) => item.id !== product.id
            )
          );
        } else {
          await apiRequest(`/Wishlist/${product.id}`, {
            method: "POST",
          });

          await loadWishlist();
        }
      } catch (error) {
        if (error.status === 401) {
          logout();
        }

        setStoreError(error.message);
        throw error;
      }
    },
    [wishlist, loadWishlist, logout]
  );

  const removeFromWishlist = useCallback(
    async (id) => {
      if (!getToken()) {
        setWishlist([]);
        return;
      }

      setStoreError("");

      try {
        await apiRequest(`/Wishlist/${id}`, {
          method: "DELETE",
        });

        setWishlist((current) =>
          current.filter(
            (product) => product.id !== id
          )
        );
      } catch (error) {
        if (error.status === 401) {
          logout();
        }

        setStoreError(error.message);
        throw error;
      }
    },
    [logout]
  );

  const isWishlisted = useCallback(
    (id) => {
      if (!getToken()) {
        return false;
      }

      return wishlist.some(
        (product) => product.id === id
      );
    },
    [wishlist]
  );

  const cartCount = useMemo(() => {
    if (!getToken()) {
      return 0;
    }

    return cart.reduce(
      (sum, item) => sum + (item.qty || 0),
      0
    );
  }, [cart]);

  const wishlistCount = getToken()
    ? wishlist.length
    : 0;

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
      resetStore,
      logout,
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
      resetStore,
      logout,
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
    throw new Error(
      "useStore duhet te perdoret brenda StoreProvider"
    );
  }

  return ctx;
}