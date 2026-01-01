import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../../store/StoreProvider";

function formatPriceEUR(v) {
  const n = Number(v || 0);
  return `€${n.toFixed(2)}`;
}

function discountPct(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SpecialOffer({
  items = [],
  intervalMs = 3000,
  maxItems = 6, // ✅ limit offers list (5 or 6 etc.)
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  // ✅ Filter discounted first, fallback to all, then LIMIT to maxItems
  const offers = useMemo(() => {
    const discounted = items.filter(
      (x) => typeof x.oldPrice === "number" && x.oldPrice > x.price
    );

    const list = discounted.length ? discounted : items;
    return list.slice(0, maxItems);
  }, [items, maxItems]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const pausedRef = useRef(false);

  // ✅ Keep index safe if offers length changes
  useEffect(() => {
    if (activeIndex >= offers.length) setActiveIndex(0);
  }, [offers.length, activeIndex]);

  const active = offers[activeIndex];

  // Auto-rotate every intervalMs
  useEffect(() => {
    if (!offers.length) return;

    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((i) => (i + 1) % offers.length);
      setAnimKey((k) => k + 1);
    }, intervalMs);

    return () => clearInterval(id);
  }, [offers.length, intervalMs]);

  function selectIndex(i) {
    setActiveIndex(i);
    setAnimKey((k) => k + 1);
  }

  if (!offers.length) return null;

  const pct = discountPct(active.price, active.oldPrice);
  const saved = pct ? active.oldPrice - active.price : 0;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Oferta speciale
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Zgjedhjet më të mira me zbritje — përditësohen automatikisht.
          </p>
        </div>
      </div>

      {/* Responsive layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT: Big offer */}
        <div
          className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div
            key={animKey}
            className="animate-[fadeIn_.35s_ease-out] motion-reduce:animate-none"
          >
            <div className="relative w-full rounded-xl bg-slate-50 p-6">
              {pct !== null && (
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                    -{pct}%
                  </span>
                  <span className="rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold text-white">
                    24h
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(active)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition"
                aria-label="Toggle wishlist"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-slate-900"
                >
                  <path
                    d="M12 20.5s-7-4.5-9.2-8.8C1.3 8.8 3.2 6 6.4 6c1.8 0 3.3.9 4.2 2 0 0 .9-2 4.2-2C18 6 20 8.8 21.2 11.7 19 16 12 20.5 12 20.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <img
                src={active.image}
                alt={active.title}
                className="mx-auto h-56 w-full max-w-[420px] object-contain sm:h-64"
                loading="lazy"
              />
            </div>

            <div className="mt-5 text-center">
              <h3 className="mx-auto max-w-xl text-base font-semibold text-slate-900 sm:text-lg">
                {active.title}
              </h3>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  {formatPriceEUR(active.price)}
                </span>

                {pct !== null && (
                  <>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPriceEUR(active.oldPrice)}
                    </span>
                    <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-bold text-orange-600">
                      -{pct}%
                    </span>
                  </>
                )}
              </div>

              {pct !== null && (
                <p className="mt-2 text-sm text-slate-600">
                  Ju kurseni{" "}
                  <span className="font-semibold text-slate-900">
                    {formatPriceEUR(saved)}
                  </span>
                </p>
              )}

              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => addToCart(active)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-2 h-5 w-5 text-slate-900"
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
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(active)}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                    isWishlisted(active.id)
                      ? "bg-emerald-900 text-white hover:bg-emerald-950"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {isWishlisted(active.id) ? "Në Wishlist" : "Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Offer list (limited to maxItems) */}
        <div
          className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div className="max-h-[360px] overflow-auto lg:max-h-[520px]">
            {offers.map((p, idx) => {
              const isActive = idx === activeIndex;
              const pct2 = discountPct(p.price, p.oldPrice);

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectIndex(idx)}
                  className={cx(
                    "w-full text-left flex items-center gap-4 px-4 py-4 border-b border-slate-100 transition",
                    isActive ? "bg-emerald-50" : "bg-white hover:bg-slate-50"
                  )}
                >
                  <div className="h-12 w-12 shrink-0 rounded-md bg-slate-50 p-2">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {p.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {formatPriceEUR(p.price)}
                      </span>
                      {pct2 !== null && (
                        <>
                          <span className="text-xs text-slate-400 line-through">
                            {formatPriceEUR(p.oldPrice)}
                          </span>
                          <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-600">
                            -{pct2}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {isActive && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
