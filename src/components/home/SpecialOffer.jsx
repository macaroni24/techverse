import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useStore } from "../../store/StoreProvider";

/* =========================================================
   HELPERS
========================================================= */

function formatPriceEUR(v) {
  const n = Number(v || 0);
  return `€${n.toFixed(2)}`;
}

function discountPct(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) {
    return null;
  }

  return Math.round(
    ((oldPrice - price) / oldPrice) * 100
  );
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =========================================================
   COMPONENT
========================================================= */

export default function SpecialOffer({
  items = [],
  intervalMs = 3000,
  maxItems = 6,
}) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStore();

  /* =========================================================
     OFFERS
  ========================================================= */

  const offers = useMemo(() => {
    const discounted = items.filter(
      (x) =>
        typeof x.oldPrice === "number" &&
        x.oldPrice > x.price
    );

    const list = discounted.length
      ? discounted
      : items;

    return list.slice(0, maxItems);
  }, [items, maxItems]);

  /* =========================================================
     STATE
  ========================================================= */

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [animKey, setAnimKey] =
    useState(0);

  /* Product that was just added to cart */
  const [addedProductId, setAddedProductId] =
    useState(null);

  const pausedRef = useRef(false);

  const cartTimerRef = useRef(null);

  /* =========================================================
     KEEP INDEX VALID
  ========================================================= */

  useEffect(() => {
    if (activeIndex >= offers.length) {
      setActiveIndex(0);
    }
  }, [offers.length, activeIndex]);

  const active = offers[activeIndex];

  /* =========================================================
     OFFER AUTO SLIDER
  ========================================================= */

  useEffect(() => {
    if (!offers.length) return;

    const id = setInterval(() => {
      if (pausedRef.current) {
        return;
      }

      setActiveIndex(
        (i) => (i + 1) % offers.length
      );

      setAnimKey((k) => k + 1);
    }, intervalMs);

    return () => {
      clearInterval(id);
    };
  }, [offers.length, intervalMs]);

  /* =========================================================
     CLEANUP CART TIMER
  ========================================================= */

  useEffect(() => {
    return () => {
      if (cartTimerRef.current) {
        clearTimeout(cartTimerRef.current);
      }
    };
  }, []);

  /* =========================================================
     SELECT OFFER
  ========================================================= */

  function selectIndex(i) {
    setActiveIndex(i);
    setAnimKey((k) => k + 1);
  }

  /* =========================================================
     ADD TO CART ANIMATION
  ========================================================= */

  function handleAddToCart(product) {
    addToCart(product);

    setAddedProductId(product.id);

    if (cartTimerRef.current) {
      clearTimeout(cartTimerRef.current);
    }

    cartTimerRef.current = setTimeout(() => {
      setAddedProductId(null);
    }, 1300);
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!offers.length) {
    return null;
  }

  /* =========================================================
     ACTIVE PRODUCT VALUES
  ========================================================= */

  const pct = discountPct(
    active.price,
    active.oldPrice
  );

  const saved = pct
    ? active.oldPrice - active.price
    : 0;

  const wish = isWishlisted(active.id);

  const isAdded =
    addedProductId === active.id;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      {/* =====================================================
          TITLE
      ====================================================== */}

      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Oferta speciale
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Shikoni ofertat më të mira të ditës
          </p>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ===================================================
            MAIN ACTIVE OFFER
        ==================================================== */}

        <div
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          <div
            key={animKey}
            className="
              animate-[fadeIn_.35s_ease-out]
              motion-reduce:animate-none
            "
          >
            {/* =================================================
                PRODUCT IMAGE AREA
            ================================================== */}

            <div className="relative w-full rounded-xl bg-slate-50 p-6">
              {/* DISCOUNT */}

              {pct !== null && (
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span
                    className="
                      rounded-full
                      bg-orange-500
                      px-3
                      py-1
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    -{pct}%
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-emerald-900
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    24h
                  </span>
                </div>
              )}

              {/* =================================================
                  HEART
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  toggleWishlist(active)
                }
                className="
                  absolute
                  right-4
                  top-4
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-sm
                  ring-1
                  ring-slate-200
                  transition-all
                  duration-200

                  hover:bg-emerald-50
                  active:scale-90
                "
                aria-label={
                  wish
                    ? "Largo nga lista e dëshirave"
                    : "Shto në listën e dëshirave"
                }
                title={
                  wish
                    ? "Largo nga lista e dëshirave"
                    : "Shto në listën e dëshirave"
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="
                    h-[22px]
                    w-[22px]
                    overflow-visible
                  "
                  aria-hidden="true"
                >
                  <path
                    d="
                      M20.84 4.61
                      a5.5 5.5 0 0 0-7.78 0
                      L12 5.67
                      l-1.06-1.06
                      a5.5 5.5 0 0 0-7.78 7.78
                      L12 21.23
                      l8.84-8.84
                      a5.5 5.5 0 0 0 0-7.78
                      Z
                    "
                    fill={
                      wish
                        ? "#065f46"
                        : "#ffffff"
                    }
                    stroke="#065f46"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="
                      transition-all
                      duration-200
                    "
                  />
                </svg>
              </button>

              {/* PRODUCT */}

              <img
                src={active.image}
                alt={active.title}
                className="
                  mx-auto
                  h-56
                  w-full
                  max-w-[420px]
                  object-contain

                  sm:h-64
                "
                loading="lazy"
              />
            </div>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================== */}

            <div className="mt-5 text-center">
              <h3
                className="
                  mx-auto
                  max-w-xl
                  text-base
                  font-semibold
                  text-slate-900

                  sm:text-lg
                "
              >
                {active.title}
              </h3>

              {/* PRICE */}

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-2
                "
              >
                <span className="text-2xl font-bold text-slate-900">
                  {formatPriceEUR(
                    active.price
                  )}
                </span>

                {pct !== null && (
                  <>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPriceEUR(
                        active.oldPrice
                      )}
                    </span>

                    <span
                      className="
                        rounded-md
                        bg-orange-50
                        px-2
                        py-1
                        text-xs
                        font-bold
                        text-orange-600
                      "
                    >
                      -{pct}%
                    </span>
                  </>
                )}
              </div>

              {/* SAVINGS */}

              {pct !== null && (
                <p className="mt-2 text-sm text-slate-600">
                  Ju kurseni{" "}
                  <span className="font-semibold text-slate-900">
                    {formatPriceEUR(saved)}
                  </span>
                </p>
              )}

              {/* =================================================
                  BUTTONS
              ================================================== */}

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  justify-center
                  gap-3

                  sm:flex-row
                "
              >
                {/* ===============================================
                    ADD TO CART
                ================================================ */}

                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(active)
                  }
                  className={`
                    relative
                    inline-flex
                    min-w-[185px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white

                    transition-all
                    duration-300
                    ease-out

                    active:scale-[0.96]

                    ${
                      isAdded
                        ? `
                          scale-[1.025]
                          border-emerald-700
                          bg-emerald-700
                          shadow-[0_5px_18px_rgba(4,120,87,0.22)]
                        `
                        : `
                          border-orange-500
                          bg-orange-500

                          hover:border-orange-600
                          hover:bg-orange-600
                          hover:shadow-md
                        `
                    }
                  `}
                >
                  {/* CART STATE */}

                  <span
                    className={`
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300

                      ${
                        isAdded
                          ? "-translate-y-5 opacity-0"
                          : "translate-y-0 opacity-100"
                      }
                    `}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M6.5 6h15l-1.5 9h-12L6.5 6Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M6.5 6 5.7 3.8A2 2 0 0 0 3.8 2.5H2.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>

                    Shto në shportë
                  </span>

                  {/* SUCCESS STATE */}

                  <span
                    className={`
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300

                      ${
                        isAdded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-5 opacity-0"
                      }
                    `}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="m5 12 4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    U shtua në shportë
                  </span>
                </button>

                {/* ===============================================
                    WISHLIST BUTTON
                ================================================ */}

                <button
                  type="button"
                  onClick={() =>
                    toggleWishlist(active)
                  }
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                    active:scale-[0.97]

                    ${
                      wish
                        ? `
                          bg-emerald-900
                          text-white

                          hover:bg-emerald-950
                        `
                        : `
                          bg-orange-500
                          text-white

                          hover:bg-orange-600
                        `
                    }
                  `}
                >
                  {wish
                    ? "Në listën e dëshirave"
                    : "Lista e dëshirave"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            OFFER LIST
        ==================================================== */}

        <div
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          <div className="max-h-[360px] overflow-auto lg:max-h-[520px]">
            {offers.map((p, idx) => {
              const isActive =
                idx === activeIndex;

              const pct2 =
                discountPct(
                  p.price,
                  p.oldPrice
                );

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    selectIndex(idx)
                  }
                  className={cx(
                    `
                      flex
                      w-full
                      items-center
                      gap-4
                      border-b
                      border-slate-100
                      px-4
                      py-4
                      text-left
                      transition
                    `,
                    isActive
                      ? "bg-emerald-50"
                      : "bg-white hover:bg-slate-50"
                  )}
                >
                  {/* IMAGE */}

                  <div
                    className="
                      h-12
                      w-12
                      shrink-0
                      rounded-md
                      bg-slate-50
                      p-2
                    "
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* INFO */}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {p.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {formatPriceEUR(
                          p.price
                        )}
                      </span>

                      {pct2 !== null && (
                        <>
                          <span className="text-xs text-slate-400 line-through">
                            {formatPriceEUR(
                              p.oldPrice
                            )}
                          </span>

                          <span
                            className="
                              rounded-md
                              bg-orange-50
                              px-2
                              py-0.5
                              text-[11px]
                              font-bold
                              text-orange-600
                            "
                          >
                            -{pct2}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ACTIVE */}

                  {isActive && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          CSS ANIMATIONS
      ====================================================== */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}