import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { useStore } from "../store/StoreProvider";
import { products } from "../data/products";

function findProductById(id) {
  return products.find(
    (p) => String(p.id) === String(id)
  );
}

function normalizeWishlistFromStore(store) {
  const raw =
    store.wishlistItems ||
    store.wishlist ||
    store.wishlistList ||
    store.savedItems ||
    null;

  // Wishlist already contains full product objects
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        // If item is already a product object
        if (
          item &&
          typeof item === "object"
        ) {
          return item;
        }

        // If item is only an ID
        return findProductById(item);
      })
      .filter(Boolean);
  }

  // Wishlist contains IDs
  const ids =
    store.wishlistIds ||
    store.wishlistIDs ||
    null;

  if (Array.isArray(ids)) {
    return ids
      .map((id) =>
        findProductById(id)
      )
      .filter(Boolean);
  }

  // Wishlist stored as object/map
  const mapObj =
    store.wishlistMap ||
    store.wishlistObject ||
    raw;

  if (
    mapObj &&
    typeof mapObj === "object"
  ) {
    return Object.entries(mapObj)
      .filter(([, value]) =>
        Boolean(value)
      )
      .map(([id]) =>
        findProductById(id)
      )
      .filter(Boolean);
  }

  return [];
}

export default function Wishlist() {
  const store = useStore();

  const wishlistItems =
    normalizeWishlistFromStore(store);

  const toggleWishlist =
    store.toggleWishlist ||
    store.removeFromWishlist ||
    store.addToWishlist ||
    null;

  const addToCart =
    store.addToCart || null;

  function handleRemove(product) {
    if (
      typeof toggleWishlist !== "function"
    ) {
      return;
    }

    toggleWishlist(product);
  }

  function handleAddAllToCart() {
    if (
      typeof addToCart !== "function"
    ) {
      return;
    }

    wishlistItems.forEach((product) => {
      addToCart(product);
    });
  }

  function handleClearWishlist() {
    if (
      typeof toggleWishlist !== "function"
    ) {
      return;
    }

    wishlistItems.forEach((product) => {
      toggleWishlist(product);
    });
  }

  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* HEADER */}

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Lista e dëshirave
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            {wishlistItems.length}{" "}
            produkt
            {wishlistItems.length === 1
              ? ""
              : "e"}{" "}
            të ruajtura
          </p>
        </div>

        {/* EMPTY WISHLIST */}

        {wishlistItems.length === 0 ? (

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">

            <p className="text-lg font-semibold text-slate-900">
              Asnjë produkt i ruajtur
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Prekni ikonën e zemrës te produktet për
              t&apos;i shtuar këtu.
            </p>

            <a
              href="/shop"
              className="
                mt-5
                inline-flex
                rounded-md
                bg-blue-800
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-900
              "
            >
              Shfleto produktet
            </a>

          </div>

        ) : (

          <>

            {/* ACTION BUTTONS */}

            <div className="mt-6 flex flex-wrap gap-3">

              {typeof addToCart ===
                "function" && (

                <button
                  type="button"
                  onClick={handleAddAllToCart}
                  className="
                    rounded-md
                    bg-blue-800
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-900
                  "
                >
                  Shto të gjitha në shportë
                </button>

              )}

              {typeof toggleWishlist ===
                "function" && (

                <button
                  type="button"
                  onClick={
                    handleClearWishlist
                  }
                  className="
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-slate-900
                    transition
                    hover:bg-slate-50
                  "
                >
                  Pastro listën e dëshirave
                </button>

              )}

            </div>

            {/* PRODUCTS */}

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

              {wishlistItems.map(
                (product) => (

                  <div
                    key={product.id}
                    className="relative"
                  >

                    <ProductCard
                      product={product}
                    />

                    {/* REMOVE X */}

                    {typeof toggleWishlist ===
                      "function" && (

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(
                            product
                          );
                        }}
                        aria-label="Largo nga lista e dëshirave"
                        title="Largo nga lista e dëshirave"
                        className="
                          absolute
                          -right-2
                          -top-2
                          z-30
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-slate-200
                          bg-white
                          text-xl
                          font-semibold
                          leading-none
                          text-slate-600
                          shadow-md
                          transition

                          hover:border-red-200
                          hover:bg-red-50
                          hover:text-red-600
                        "
                      >
                        ×
                      </button>

                    )}

                  </div>

                )
              )}

            </div>

          </>

        )}

      </main>

      <Footer />

    </div>
  );
}