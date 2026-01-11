import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useStore } from "../store/StoreProvider";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

function formatPriceEUR(v) {
  const n = Number(v || 0);
  return `€${n.toFixed(2)}`;
}

function findProductById(id) {
  return products.find((p) => p.id === id);
}

function normalizeCartFromStore(store) {
  const raw =
    store.cartItems || store.cart || store.cartList || store.itemsInCart || null;

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
        return p ? { ...p, qty: 1 } : null;
      })
      .filter(Boolean);
  }

  const mapObj = store.cartMap || store.cartObject || store.cartById || raw;
  if (mapObj && typeof mapObj === "object") {
    const entries = Object.entries(mapObj);
    if (entries.length && typeof entries[0][1] !== "object") {
      return entries
        .map(([id, qty]) => {
          const p = findProductById(id);
          if (!p) return null;
          return { ...p, qty: Number(qty || 1) };
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
    store.removeFromCart || store.removeCartItem || store.deleteFromCart || null;

  const updateCartQty =
    store.updateCartQty ||
    store.setCartQty ||
    store.changeCartQty ||
    store.updateQty ||
    null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
    0
  );
  const shipping = subtotal >= 100 ? 0 : cartItems.length ? 5.99 : 0;

  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 overflow-x-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Cart</h1>
            <p className="mt-1 text-sm text-slate-600">
              {cartItems.length} item{cartItems.length === 1 ? "" : "s"} in your cart
            </p>
          </div>

          {cartItems.length > 0 && subtotal >= 100 && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
              Free delivery applied
            </span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate-600">
              Add products to your cart to see them here.
            </p>
            <a
              href="/shop"
              className="mt-5 inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              Go to Shop
            </a>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
           <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => {
                  const qty = Number(item.qty || 1);
                  const lineTotal = Number(item.price || 0) * qty;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 sm:p-5 flex-col sm:flex-row"
                    >
                      <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-50 p-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 break-words">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 break-words">
                          {item.brand} • {item.category}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          {typeof updateCartQty === "function" ? (
                            <div className="inline-flex items-center rounded-md border border-slate-200 max-w-full">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQty(item.id, Math.max(1, qty - 1))
                                }
                                className="px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                              >
                                −
                              </button>

                              <span className="px-3 py-2 text-sm font-semibold text-slate-900">
                                {qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => updateCartQty(item.id, qty + 1)}
                                className="px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <span className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
                              Qty: {qty}
                            </span>
                          )}

                          {typeof toggleWishlist === "function" &&
                            typeof isWishlisted === "function" && (
                              <button
                                type="button"
                                onClick={() => toggleWishlist(item)}
                                className={`rounded-md px-3 py-2 text-sm font-semibold transition whitespace-nowrap ${
                                  isWishlisted(item.id)
                                    ? "bg-emerald-900 text-white hover:bg-emerald-950"
                                    : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                {isWishlisted(item.id) ? "Wishlisted" : "Save"}
                              </button>
                            )}

                           {typeof removeFromCart === "function" ? (
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                            >
                              Remove
                            </button>
                          ) : (
                            <span className="text-xs text-slate-500">
                              (Remove function missing in store)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {formatPriceEUR(lineTotal)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatPriceEUR(item.price)} each
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Order summary</h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatPriceEUR(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 ? "Free" : formatPriceEUR(shipping)}
                  </span>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-slate-900 font-semibold">Total</span>
                  <span className="text-slate-900 font-bold">
                    {formatPriceEUR(total)}
                  </span>
                </div>
              </div>

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
                className="mt-5 w-full rounded-md bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition"
              >
                Checkout
              </button>

              <p className="mt-3 text-xs text-slate-500">
                Free delivery over €100. Taxes included where applicable.
              </p>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
