import { NavLink } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { useStore } from "../store/StoreProvider";
import { products } from "../data/products";

function findProductById(id) {
  return products.find(
    (product) => String(product.id) === String(id)
  );
}

function normalizeWishlistFromStore(store) {
  const raw =
    store.wishlistItems ||
    store.wishlist ||
    store.wishlistList ||
    store.savedItems ||
    null;

  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (item && typeof item === "object") {
          return item;
        }

        return findProductById(item);
      })
      .filter(Boolean);
  }

  const ids =
    store.wishlistIds ||
    store.wishlistIDs ||
    null;

  if (Array.isArray(ids)) {
    return ids
      .map((id) => findProductById(id))
      .filter(Boolean);
  }

  const map =
    store.wishlistMap ||
    store.wishlistObject ||
    raw;

  if (map && typeof map === "object") {
    return Object.entries(map)
      .filter(([, value]) => Boolean(value))
      .map(([id]) => findProductById(id))
      .filter(Boolean);
  }

  return [];
}

export default function Wishlist() {
  const store = useStore();

  const wishlistItems = normalizeWishlistFromStore(store);

  const toggleWishlist =
    store.toggleWishlist ||
    store.removeFromWishlist ||
    store.addToWishlist ||
    null;

  const addToCart =
    store.addToCart || null;

  const handleRemove = (product) => {
    if (typeof toggleWishlist !== "function") {
      return;
    }

    toggleWishlist(product);
  };

  const handleAddAllToCart = () => {
    if (typeof addToCart !== "function") {
      return;
    }

    wishlistItems.forEach((product) => {
      addToCart(product);
    });
  };

  const handleClearWishlist = () => {
    if (typeof toggleWishlist !== "function") {
      return;
    }

    wishlistItems.forEach((product) => {
      toggleWishlist(product);
    });
  };

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
              {typeof addToCart === "function" && (
                <button
                  type="button"
                  onClick={handleAddAllToCart}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98]"
                >
                  Shto të gjitha në shportë
                </button>
              )}

              {typeof toggleWishlist === "function" && (
                <button
                  type="button"
                  onClick={handleClearWishlist}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                >
                  Pastro listën
                </button>
              )}
            </div>
          )}
        </div>

        {wishlistItems.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="relative"
              >
                <ProductCard product={product} />

                {typeof toggleWishlist === "function" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
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
                )}
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