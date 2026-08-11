import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../store/StoreProvider";

function formatPriceEUR(value) {
  return `€${Number(value || 0).toFixed(2)}`;
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const [added, setAdded] = useState(false);

  const wish = isWishlisted(product.id);

  const hasDiscount = useMemo(() => {
    return (
      typeof product.oldPrice === "number" &&
      product.oldPrice > product.price
    );
  }, [product.oldPrice, product.price]);

  const discountPct = useMemo(() => {
    if (!hasDiscount) return null;

    return Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  }, [hasDiscount, product.oldPrice, product.price]);

  useEffect(() => {
    if (!added) return;

    const timeout = setTimeout(() => {
      setAdded(false);
    }, 1300);

    return () => clearTimeout(timeout);
  }, [added]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    addToCart(product);
    setAdded(true);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white p-2.5 shadow-sm transition hover:shadow-md sm:p-4">
      <NavLink to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-white">
          {hasDiscount && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-white px-2 py-[3px] text-[10px] font-bold text-blue-800 shadow-sm ring-1 ring-slate-200 sm:left-3 sm:top-3">
              -{discountPct}%
            </span>
          )}

          {product.badge && (
            <span className="absolute right-2 top-2 z-10 max-w-[82px] truncate rounded-full bg-white px-2 py-[3px] text-[9px] font-semibold text-blue-800 shadow-sm ring-1 ring-slate-200 sm:right-3 sm:top-3 sm:max-w-[90px] sm:text-[10px]">
              {product.badge}
            </span>
          )}

          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-36 w-full object-contain p-3 pt-8 transition duration-300 group-hover:scale-[1.02] sm:h-48 sm:p-4 sm:pt-10"
          />
        </div>

        <h3 className="mt-2.5 line-clamp-2 min-h-[2.35rem] text-[13px] font-semibold leading-[1.4] text-slate-900 sm:mt-4 sm:min-h-[2.75rem] sm:text-sm">
          {product.title}
        </h3>

        <div className="mt-2 flex items-end justify-between gap-2 sm:mt-3">
          <div className="flex min-w-0 flex-col">
            <span className="text-base font-bold text-slate-900 sm:text-lg">
              {formatPriceEUR(product.price)}
            </span>

            {hasDiscount && (
              <span className="text-[11px] text-slate-400 line-through sm:text-xs">
                {formatPriceEUR(product.oldPrice)}
              </span>
            )}
          </div>

          {product.stock === 0 ? (
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500 sm:px-3 sm:text-xs">
              Pa stok
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-800 sm:px-3 sm:text-xs">
              Stok
            </span>
          )}
        </div>
      </NavLink>

      <div className="mt-auto flex items-center gap-1.5 pt-3 sm:gap-2 sm:pt-4">
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            wish
              ? "Largo nga lista e dëshirave"
              : "Shto në listën e dëshirave"
          }
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-11 sm:w-11"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 overflow-visible sm:h-7 sm:w-7"
            aria-hidden="true"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
              fill={wish ? "#1e3a8a" : "#ffffff"}
              stroke="#1e3a8a"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`relative flex h-10 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-md border px-2.5 text-[11px] font-semibold transition-all duration-300 ease-out active:scale-[0.96] sm:h-11 sm:px-4 sm:text-sm ${
            product.stock === 0
              ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400"
              : added
                ? "scale-[1.025] border-blue-800 bg-blue-800 text-white shadow-[0_5px_18px_rgba(30,64,175,0.20)]"
                : "border-blue-800 bg-blue-800 text-white hover:border-blue-900 hover:bg-blue-900 hover:shadow-md"
          }`}
        >
          {product.stock === 0 ? (
            <span>Pa stok</span>
          ) : (
            <>
              <span
                className={`flex items-center justify-center whitespace-nowrap transition-all duration-300 ${
                  added
                    ? "-translate-y-5 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                Shto
              </span>

              <span
                className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-300 ${
                  added
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                U shtua
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}