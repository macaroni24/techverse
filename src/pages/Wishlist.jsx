import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { useStore } from "../store/StoreProvider";
import { products } from "../data/products";

function findProductById(id) {
  return products.find((p) => p.id === id);
}

function normalizeWishlistFromStore(store) {
  const raw =
    store.wishlistItems ||
    store.wishlist ||
    store.wishlistList ||
    store.savedItems ||
    null;

  if (Array.isArray(raw)) return raw;

  const ids = store.wishlistIds || store.wishlistIDs || null;
  if (Array.isArray(ids)) {
    return ids
      .map((id) => findProductById(id))
      .filter(Boolean);
  }

  // wishlist object map: { id: true } or { id: 1 }
  const mapObj = store.wishlistMap || store.wishlistObject || raw;
  if (mapObj && typeof mapObj === "object") {
    const entries = Object.entries(mapObj);
    return entries
      .filter(([, v]) => Boolean(v))
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

  const addToCart = store.addToCart || null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Wishlist</h1>
          <p className="mt-1 text-sm text-slate-600">
            {wishlistItems.length} saved item{wishlistItems.length === 1 ? "" : "s"}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No items saved</p>
            <p className="mt-2 text-sm text-slate-600">
              Tap the heart icon on products to add them here.
            </p>
            <a
              href="/shop"
              className="mt-5 inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              Browse products
            </a>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap gap-3">
              {typeof addToCart === "function" && (
                <button
                  type="button"
                  onClick={() => wishlistItems.forEach((p) => addToCart(p))}
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
                >
                  Add all to cart
                </button>
              )}

              {typeof toggleWishlist === "function" && (
                <button
                  type="button"
                  onClick={() => wishlistItems.forEach((p) => toggleWishlist(p))}
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                >
                  Clear wishlist
                </button>
              )}
            </div>

            <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {wishlistItems.map((p) => (
                <div key={p.id} className="relative">
                  <ProductCard product={p} />

                  {typeof toggleWishlist === "function" && (
                    <button
                      type="button"
                      onClick={() => toggleWishlist(p)}
                      className="absolute right-3 top-3 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
