import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useStore } from "../store/StoreProvider";
import { products } from "../data/products";
import { NavLink, useNavigate } from "react-router-dom";

function formatPriceEUR(v) {
  const n = Number(v || 0);
  return `€${n.toFixed(2)}`;
}

function findProductById(id) {
  return products.find((p) => String(p.id) === String(id));
}

function normalizeCartFromStore(store) {
  const raw =
    store.cartItems ||
    store.cart ||
    store.cartList ||
    store.itemsInCart ||
    null;

  if (Array.isArray(raw)) {
    return raw.map((x) => ({
      ...x,
      qty: Number(x.qty || x.quantity || 1),
    }));
  }

  const ids = store.cartIds || store.cartIDs || null;

  if (Array.isArray(ids)) {
    return ids
      .map((id) => {
        const p = findProductById(id);

        return p
          ? {
              ...p,
              qty: 1,
            }
          : null;
      })
      .filter(Boolean);
  }

  const mapObj =
    store.cartMap ||
    store.cartObject ||
    store.cartById ||
    raw;

  if (mapObj && typeof mapObj === "object") {
    const entries = Object.entries(mapObj);

    if (entries.length && typeof entries[0][1] !== "object") {
      return entries
        .map(([id, qty]) => {
          const p = findProductById(id);

          if (!p) return null;

          return {
            ...p,
            qty: Number(qty || 1),
          };
        })
        .filter(Boolean);
    }
  }

  return [];
}

export default function Cart() {
  const store = useStore();
  const navigate = useNavigate();

  const cartItems = normalizeCartFromStore(store);

  const toggleWishlist = store.toggleWishlist;
  const isWishlisted = store.isWishlisted;

  const removeFromCart =
    store.removeFromCart ||
    store.removeCartItem ||
    store.deleteFromCart ||
    null;

  const updateCartQty =
    store.updateCartQty ||
    store.setCartQty ||
    store.changeCartQty ||
    store.updateQty ||
    null;

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.qty || 1),
    0
  );

  const shipping =
    subtotal >= 100
      ? 0
      : cartItems.length
      ? 5.99
      : 0;

  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Shporta
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              {cartItems.length}{" "}
              produkt{cartItems.length === 1 ? "" : "e"} në shportën tuaj
            </p>
          </div>

          {cartItems.length > 0 && subtotal >= 100 && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              Dërgesa falas u aplikua
            </span>
          )}
        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              Shporta juaj është bosh
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Shtoni produkte në shportë për t&apos;i parë këtu.
            </p>

            <NavLink
              to="/shop"
              className="mt-5 inline-flex rounded-md bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              Shko te Dyqani
            </NavLink>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* CART PRODUCTS */}
            <div className="space-y-3">
              {cartItems.map((item) => {
                const qty = Number(item.qty || 1);

                const lineTotal =
                  Number(item.price || 0) * qty;

                return (
                  <div
                    key={item.id}
                    className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                  >
                    
                    {/* REMOVE X */}
                    {typeof removeFromCart === "function" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        aria-label="Largo nga shporta"
                        title="Largo nga shporta"
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

                    <div className="flex flex-col gap-4 sm:flex-row">
                      
                      {/* CLICKABLE PRODUCT IMAGE */}
                      <NavLink
                        to={`/product/${item.id}`}
                        className="group h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-2"
                        aria-label={`Shiko ${item.title}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                          loading="lazy"
                        />
                      </NavLink>

                      {/* PRODUCT INFORMATION */}
                      <div className="min-w-0 flex-1">
                        
                        {/* CLICKABLE PRODUCT TITLE */}
                        <NavLink
                          to={`/product/${item.id}`}
                          className="inline-block"
                        >
                          <p className="break-words pr-2 text-sm font-semibold text-slate-900 transition hover:text-blue-800">
                            {item.title}
                          </p>
                        </NavLink>

                        {/* ACTIONS */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          
                          {/* QUANTITY */}
                          {typeof updateCartQty === "function" ? (
                            <div className="inline-flex max-w-full items-center rounded-md border border-slate-200">
                              
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQty(
                                    item.id,
                                    Math.max(1, qty - 1)
                                  )
                                }
                                className="px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                                aria-label="Zvogëlo sasinë"
                              >
                                −
                              </button>

                              <span className="px-3 py-2 text-sm font-semibold text-slate-900">
                                {qty}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQty(
                                    item.id,
                                    qty + 1
                                  )
                                }
                                className="px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                                aria-label="Rrit sasinë"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <span className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
                              Sasia: {qty}
                            </span>
                          )}

                          {/* WISHLIST */}
                          {typeof toggleWishlist === "function" &&
                            typeof isWishlisted === "function" && (
                              <button
                                type="button"
                                onClick={() =>
                                  toggleWishlist(item)
                                }
                                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition ${
                                  isWishlisted(item.id)
                                    ? "bg-blue-800 text-white hover:bg-blue-900"
                                    : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                                }`}
                              >
                                {isWishlisted(item.id)
                                  ? "Në listën e dëshirave"
                                  : "Ruaj"}
                              </button>
                            )}
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="shrink-0 pr-2 text-left sm:pr-3 sm:text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {formatPriceEUR(lineTotal)}
                        </p>

                        {qty > 1 && (
                          <p className="mt-1 text-xs text-slate-500">
                            {formatPriceEUR(item.price)} secila
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Përmbledhja e porosisë
              </h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">
                    Nëntotali
                  </span>

                  <span className="font-semibold text-slate-900">
                    {formatPriceEUR(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">
                    Transporti
                  </span>

                  <span className="font-semibold text-slate-900">
                    {shipping === 0
                      ? "Falas"
                      : formatPriceEUR(shipping)}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="font-semibold text-slate-900">
                    Totali
                  </span>

                  <span className="font-bold text-slate-900">
                    {formatPriceEUR(total)}
                  </span>
                </div>
              </div>

              {/* CHECKOUT */}
              <button
                type="button"
                onClick={() => {
                  const first = cartItems[0];

                  if (!first) return;

                  navigate("/paying", {
                    state: {
                      product: first,
                      qty: Number(first.qty || 1),
                    },
                  });
                }}
                className="mt-5 w-full rounded-md bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
              >
                Vazhdo me pagesën
              </button>

              <p className="mt-3 text-xs text-slate-500">
                Dërgesë falas mbi €100. Taksat përfshihen aty ku aplikohen.
              </p>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}