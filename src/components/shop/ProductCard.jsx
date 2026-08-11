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
    if (!hasDiscount) {
      return null;
    }

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
    <div
      className="
        group
        mx-auto
        flex
        h-full
        w-[96%]
        flex-col
        border
        border-slate-200
        bg-white
        p-3
        transition
        duration-300
        hover:border-slate-300
        hover:shadow-md
        sm:w-[95%]
        sm:p-4
      "
    >
      <NavLink
        to={`/product/${product.id}`}
        className="flex h-full min-w-0 flex-col"
      >
        {/* PRODUCT IMAGE */}
        <div className="flex h-[155px] w-full items-center justify-center overflow-hidden bg-white sm:h-[250px]">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-contain
              p-1.5
              transition
              duration-300
              group-hover:scale-[1.035]
              sm:p-2
            "
          />
        </div>

        {/* TITLE */}
        <h3
          className="
            mt-3
            line-clamp-2
            min-h-[42px]
            text-[14px]
            font-semibold
            leading-[1.45]
            text-slate-900
            sm:mt-4
            sm:min-h-[48px]
            sm:text-[16px]
            sm:leading-[1.5]
          "
        >
          {product.title}
        </h3>

        {/* PRICE AREA */}
        <div className="mt-auto pt-4 sm:pt-5">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <span className="text-[19px] font-bold tracking-tight text-slate-950 sm:text-[22px]">
              {formatPriceEUR(product.price)}
            </span>

            {/* WISHLIST */}
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                wish
                  ? "Largo nga lista e dëshirave"
                  : "Shto në listën e dëshirave"
              }
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                transition
                duration-200
                hover:scale-110
                active:scale-95
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-7 sm:w-7"
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

          {/* DISCOUNT */}
          <div className="mt-1 flex min-h-[18px] items-center gap-1.5 sm:mt-1.5 sm:min-h-[20px] sm:gap-2">
            {hasDiscount && (
              <>
                <span className="text-[10px] text-slate-400 line-through sm:text-xs">
                  {formatPriceEUR(product.oldPrice)}
                </span>

                <span className="rounded-full bg-blue-50 px-1.5 py-[2px] text-[9px] font-bold text-blue-700 sm:px-2 sm:py-[3px] sm:text-[10px]">
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