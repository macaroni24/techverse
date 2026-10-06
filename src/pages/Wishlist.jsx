import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { useStore } from "../store/StoreProvider";

function getToken() {
  const directToken =
    localStorage.getItem("techverse_token") ||
    sessionStorage.getItem("techverse_token");

  if (directToken) {
    return directToken;
  }

  const auth =
    localStorage.getItem("techverse_auth") ||
    sessionStorage.getItem("techverse_auth");

  if (auth) {
    try {
      return JSON.parse(auth)?.token || "";
    } catch {
      return "";
    }
  }

  return "";
}

export default function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlist,
    addToCart,
    removeFromWishlist,
    loadingStore,
    storeError,
  } = useStore();

  const [processing, setProcessing] = useState(false);

  const token = getToken();

  const wishlistItems = Array.isArray(wishlist)
    ? wishlist
    : [];

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);

  async function handleRemove(product) {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      await removeFromWishlist(product.id);
    } catch {
      return;
    }
  }

  async function handleAddAllToCart() {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }

    if (wishlistItems.length === 0) {
      return;
    }

    setProcessing(true);

    try {
      for (const product of wishlistItems) {
        await addToCart(product);
      }
    } catch {
      return;
    } finally {
      setProcessing(false);
    }
  }

  async function handleClearWishlist() {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }

    if (wishlistItems.length === 0) {
      return;
    }

    setProcessing(true);

    try {
      const items = [...wishlistItems];

      for (const product of items) {
        await removeFromWishlist(product.id);
      }
    } catch {
      return;
    } finally {
      setProcessing(false);
    }
  }

  if (!token) {
    return null;
  }

  if (loadingStore) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="mx-auto flex min-h-[500px] w-full max-w-[1460px] items-center justify-center px-4 py-10 sm:px-6">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-800" />
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-[1460px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Lista e dëshirave
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "produkt i ruajtur"
                : "produkte të ruajtura"}
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddAllToCart}
                disabled={processing}
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing
                  ? "Ju lutem prisni..."
                  : "Shto të gjitha në shportë"}
              </button>

              <button
                type="button"
                onClick={handleClearWishlist}
                disabled={processing}
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Pastro listën
              </button>
            </div>
          )}
        </div>

        {storeError && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {storeError}
          </div>
        )}

        {wishlistItems.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="relative"
              >
                <ProductCard product={product} />

                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleRemove(product);
                  }}
                  aria-label="Largo nga lista e dëshirave"
                  title="Largo nga lista e dëshirave"
                  className="absolute right-3 top-3 z-30 inline-flex h-8 w-8 items-center justify-center text-slate-400 transition hover:scale-110 hover:text-red-600 active:scale-95"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-20 flex max-w-lg flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Asnjë produkt i ruajtur
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Shtoni produktet që ju pëlqejnë në listën e dëshirave dhe do t&apos;i gjeni këtu.
            </p>

            <NavLink
              to="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-6 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98]"
            >
              Shfleto produktet
            </NavLink>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}