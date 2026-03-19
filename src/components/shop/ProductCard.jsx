import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../store/StoreProvider";

function formatPriceEUR(value) {
  const num = Number(value || 0);
  return `€${num.toFixed(2)}`;
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [added, setAdded] = useState(false);

  const wish = isWishlisted(product.id);

  const hasDiscount = useMemo(() => {
    return typeof product.oldPrice === "number" && product.oldPrice > product.price;
  }, [product.oldPrice, product.price]);

  const discountPct = useMemo(() => {
    if (!hasDiscount) return null;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [hasDiscount, product.oldPrice, product.price]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;
    addToCart(product);
    setAdded(true);
  }

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex h-full flex-col">
        <NavLink to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden rounded-xl bg-slate-50">
            {hasDiscount && (
              <span className="absolute left-3 top-3 z-10 max-w-[70px] truncate rounded-full bg-orange-500 px-2 py-[3px] text-[10px] font-bold text-white shadow-sm">
                -{discountPct}%
              </span>
            )}

            {product.badge && (
              <span className="absolute right-3 top-3 z-10 max-w-[90px] truncate rounded-full bg-emerald-900 px-2 py-[3px] text-[10px] font-semibold text-white shadow-sm">
                {product.badge}
              </span>
            )}

            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain p-4 pt-10 transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>

          <h3 className="mt-4 line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-slate-900">
            {product.title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {product.brand} • {product.category}
          </p>

          <div className="mt-3 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-emerald-900">
                {formatPriceEUR(product.price)}
              </span>

              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPriceEUR(product.oldPrice)}
                </span>
              )}
            </div>

            {product.stock === 0 ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                Pa stok
              </span>
            ) : (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
                Stok
              </span>
            )}
          </div>
        </NavLink>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            type="button"
            onClick={handleWishlist}
            className="inline-flex h-11 w-11 items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
            aria-label={wish ? "Largo nga lista e dëshirave" : "Shto në listën e dëshirave"}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-7 w-7 transition-colors duration-200 ${
                wish
                  ? "fill-emerald-800 stroke-emerald-800"
                  : "fill-none stroke-slate-500 hover:stroke-emerald-700"
              }`}
            >
              <path
                d="M12 21s-7.5-4.8-9.9-9.4C0.6 8.2 3.1 5 6.8 5c2.1 0 3.9 1.1 5.2 2.7C13.3 6.1 15.1 5 17.2 5c3.7 0 6.2 3.2 4.7 6.6C19.5 16.2 12 21 12 21Z"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 rounded-md px-4 py-3 text-sm font-semibold transition ${
              product.stock === 0
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : added
                ? "bg-emerald-900 text-white"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {product.stock === 0 ? "Pa stok" : added ? "U shtua" : "Shto"}
          </button>
        </div>
      </div>
    </div>
  );
}