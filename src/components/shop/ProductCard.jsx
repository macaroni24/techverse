import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { useStore } from "../../store/StoreProvider";

function formatPriceEUR(value) {
  return `€${Number(value || 0).toFixed(2)}`;
}

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useStore();

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

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <div className="group flex h-full min-h-[440px] flex-col border border-slate-200 bg-white p-4 transition duration-300 hover:border-slate-300 hover:shadow-md sm:min-h-[480px] sm:p-5">
      <NavLink
        to={`/product/${product.id}`}
        className="flex flex-1 flex-col"
      >
        <div className="flex h-[250px] items-center justify-center overflow-hidden bg-white sm:h-[290px]">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain p-1 transition duration-300 group-hover:scale-[1.035]"
          />
        </div>

        <h3 className="mt-5 line-clamp-2 min-h-[52px] text-[16px] font-semibold leading-[1.5] text-slate-900">
          {product.title}
        </h3>

        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[22px] font-bold tracking-tight text-slate-950 sm:text-[24px]">
              {formatPriceEUR(product.price)}
            </span>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                wish
                  ? "Largo nga lista e dëshirave"
                  : "Shto në listën e dëshirave"
              }
              className="inline-flex shrink-0 items-center justify-center transition duration-200 hover:scale-110 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                  fill={wish ? "#1e3a8a" : "none"}
                  stroke="#1e3a8a"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition duration-200"
                />
              </svg>
            </button>
          </div>

          <div className="mt-1.5 flex min-h-[20px] items-center gap-2">
            {hasDiscount && (
              <>
                <span className="text-xs text-slate-400 line-through">
                  {formatPriceEUR(product.oldPrice)}
                </span>

                <span className="rounded-full bg-blue-50 px-2 py-[3px] text-[10px] font-bold text-blue-700">
                  -{discountPct}%
                </span>
              </>
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
}