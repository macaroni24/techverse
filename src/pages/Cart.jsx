import { NavLink, useNavigate } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useStore } from "../store/StoreProvider";
import { products } from "../data/products";

function formatPriceEUR(value) {
  return `${Number(value || 0).toFixed(2)} €`;
}

function findProductById(id) {
  return products.find(
    (product) => String(product.id) === String(id)
  );
}

function normalizeCartFromStore(store) {
  const raw =
    store.cartItems ||
    store.cart ||
    store.cartList ||
    store.itemsInCart ||
    null;

  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      ...item,
      qty: Number(item.qty || item.quantity || 1),
    }));
  }

  const ids =
    store.cartIds ||
    store.cartIDs ||
    null;

  if (Array.isArray(ids)) {
    return ids
      .map((id) => {
        const product = findProductById(id);

        if (!product) {
          return null;
        }

        return {
          ...product,
          qty: 1,
        };
      })
      .filter(Boolean);
  }

  const map =
    store.cartMap ||
    store.cartObject ||
    store.cartById ||
    raw;

  if (map && typeof map === "object") {
    const entries = Object.entries(map);

    if (
      entries.length &&
      typeof entries[0][1] !== "object"
    ) {
      return entries
        .map(([id, qty]) => {
          const product = findProductById(id);

          if (!product) {
            return null;
          }

          return {
            ...product,
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
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.qty || 1),
    0
  );

  const shipping =
    subtotal >= 100
      ? 0
      : cartItems.length > 0
        ? 5.99
        : 0;

  const total = subtotal + shipping;

  const handleCheckout = () => {
    const firstProduct = cartItems[0];

    if (!firstProduct) {
      return;
    }

    navigate("/paying", {
      state: {
        product: firstProduct,
        qty: Number(firstProduct.qty || 1),
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-[1460px] px-3 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between sm:pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Shporta
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "produkt në shportën tuaj"
                : "produkte në shportën tuaj"}
            </p>
          </div>

          {cartItems.length > 0 &&
            subtotal >= 100 && (
              <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h11v9H3z"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 10h3l4 4v2h-7z"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="18" r="1.5" />
                  <circle cx="17" cy="18" r="1.5" />
                </svg>

                <span>Dërgesa falas u aplikua</span>
              </div>
            )}
        </div>

        {cartItems.length === 0 ? (
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
                  d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 8H7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Shporta juaj është bosh
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Shtoni produktet që dëshironi dhe do t&apos;i gjeni këtu.
            </p>

            <NavLink
              to="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-6 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98]"
            >
              Shko te Dyqani
            </NavLink>
          </div>
        ) : (
          <div className="mt-6 grid gap-8 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-3 lg:hidden">
              {cartItems.map((item) => {
                const qty = Number(item.qty || 1);
                const lineTotal =
                  Number(item.price || 0) * qty;

                const hasDiscount =
                  typeof item.oldPrice === "number" &&
                  item.oldPrice > item.price;

                const savedPerItem = hasDiscount
                  ? item.oldPrice - item.price
                  : 0;

                const totalSaved =
                  savedPerItem * qty;

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <div className="relative p-3">
                      <div className="flex gap-3 pr-9">
                        <NavLink
                          to={`/product/${item.id}`}
                          className="flex h-[72px] w-[72px] shrink-0 items-center justify-center"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        </NavLink>

                        <div className="min-w-0 flex-1">
                          <NavLink
                            to={`/product/${item.id}`}
                          >
                            <h2 className="line-clamp-2 text-[14px] font-medium leading-5 text-slate-900">
                              {item.title}
                            </h2>
                          </NavLink>
                        </div>
                      </div>

                      {typeof removeFromCart ===
                        "function" && (
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          aria-label="Largo nga shporta"
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-slate-50 text-slate-600 transition hover:bg-red-50 hover:text-red-600 active:scale-95"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-[18px] w-[18px]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 7h16"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9 3h6l1 4H8l1-4Z"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.5 7 7.5 21h9l1-14"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 11v6M14 11v6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      )}

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[17px] font-semibold tracking-tight text-slate-950">
                            {formatPriceEUR(
                              lineTotal
                            )}
                          </p>

                          {hasDiscount && (
                            <p className="mt-0.5 text-[12px] font-medium text-blue-700">
                              Ju kurseni:{" "}
                              <span className="font-bold">
                                {formatPriceEUR(
                                  totalSaved
                                )}
                              </span>
                            </p>
                          )}
                        </div>

                        {typeof updateCartQty ===
                        "function" ? (
                          <div className="inline-flex h-[34px] items-center overflow-hidden rounded-md border border-slate-200">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQty(
                                  item.id,
                                  Math.max(1, qty - 1)
                                )
                              }
                              className="flex h-full w-9 items-center justify-center text-base text-slate-600 transition hover:bg-slate-50"
                              aria-label="Zvogëlo sasinë"
                            >
                              −
                            </button>

                            <span className="flex h-full min-w-10 items-center justify-center border-x border-slate-200 px-2 text-sm font-medium text-slate-900">
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
                              className="flex h-full w-9 items-center justify-center text-base text-slate-600 transition hover:bg-slate-50"
                              aria-label="Rrit sasinë"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-slate-700">
                            Sasia: {qty}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mx-2 mb-2 flex items-center justify-between rounded-md bg-slate-50 px-3 py-2.5">
                      <span className="text-sm font-medium text-slate-700">
                        Total
                      </span>

                      <span className="text-[16px] font-semibold text-slate-900">
                        {formatPriceEUR(lineTotal)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden divide-y divide-slate-200 border-y border-slate-200 lg:block">
              {cartItems.map((item) => {
                const qty = Number(item.qty || 1);

                const lineTotal =
                  Number(item.price || 0) * qty;

                const wishlisted =
                  typeof isWishlisted === "function"
                    ? isWishlisted(item.id)
                    : false;

                return (
                  <div
                    key={item.id}
                    className="relative flex items-center gap-5 py-5"
                  >
                    <NavLink
                      to={`/product/${item.id}`}
                      className="group flex h-[135px] w-[150px] shrink-0 items-center justify-center overflow-hidden bg-white"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.04]"
                      />
                    </NavLink>

                    <div className="min-w-0 flex-1">
                      <NavLink
                        to={`/product/${item.id}`}
                      >
                        <h2 className="max-w-xl text-base font-semibold leading-6 text-slate-900 transition hover:text-blue-800">
                          {item.title}
                        </h2>
                      </NavLink>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        {typeof updateCartQty ===
                        "function" ? (
                          <div className="inline-flex h-10 items-center overflow-hidden rounded-md border border-slate-200">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQty(
                                  item.id,
                                  Math.max(1, qty - 1)
                                )
                              }
                              className="flex h-full w-10 items-center justify-center text-lg font-medium text-slate-600 transition hover:bg-slate-50"
                            >
                              −
                            </button>

                            <span className="flex h-full min-w-10 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900">
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
                              className="flex h-full w-10 items-center justify-center text-lg font-medium text-slate-600 transition hover:bg-slate-50"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex h-10 items-center rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-700">
                            Sasia: {qty}
                          </span>
                        )}

                        {typeof toggleWishlist ===
                          "function" &&
                          typeof isWishlisted ===
                            "function" && (
                            <button
                              type="button"
                              onClick={() =>
                                toggleWishlist(item)
                              }
                              className="inline-flex h-10 items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-800"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                aria-hidden="true"
                              >
                                <path
                                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                                  fill={
                                    wishlisted
                                      ? "#1e3a8a"
                                      : "none"
                                  }
                                  stroke="#1e3a8a"
                                  strokeWidth="1.7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>

                              {wishlisted
                                ? "E ruajtur"
                                : "Ruaj"}
                            </button>
                          )}
                      </div>
                    </div>

                    <div className="flex min-w-[130px] shrink-0 flex-col items-end self-stretch">
                      {typeof removeFromCart ===
                        "function" && (
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          aria-label="Largo nga shporta"
                          className="inline-flex h-8 w-8 items-center justify-center text-slate-400 transition hover:scale-110 hover:text-red-600"
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

                      <div className="mt-auto text-right">
                        <p className="text-lg font-bold tracking-tight text-slate-950">
                          {formatPriceEUR(lineTotal)}
                        </p>

                        {qty > 1 && (
                          <p className="mt-1 text-xs text-slate-400">
                            {formatPriceEUR(
                              item.price
                            )}{" "}
                            secila
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="h-fit border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                Përmbledhja e porosisë
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">
                    Nëntotali
                  </span>

                  <span className="font-semibold text-slate-900">
                    {formatPriceEUR(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">
                    Transporti
                  </span>

                  <span
                    className={
                      shipping === 0
                        ? "font-semibold text-blue-800"
                        : "font-semibold text-slate-900"
                    }
                  >
                    {shipping === 0
                      ? "Falas"
                      : formatPriceEUR(shipping)}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
                  <span className="font-semibold text-slate-900">
                    Totali
                  </span>

                  <span className="text-xl font-bold tracking-tight text-slate-950">
                    {formatPriceEUR(total)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.99]"
              >
                Vazhdo me pagesën
              </button>

              <p className="mt-4 text-xs leading-5 text-slate-500">
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