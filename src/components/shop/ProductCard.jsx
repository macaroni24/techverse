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
        flex
        h-full
        min-w-0
        flex-col
        border
        border-slate-200
        bg-white
        p-3

        transition
        duration-300

        hover:border-slate-300
        hover:shadow-md

        md:p-2.5
        lg:p-2.5
        xl:p-3

        2xl:p-4
      "
    >
      <NavLink
        to={`/product/${product.id}`}
        className="flex h-full min-w-0 flex-col"
      >
        {/* PRODUCT IMAGE */}

        <div
          className="
            flex
            h-[155px]
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-white

            sm:h-[165px]

            md:h-[135px]

            lg:h-[145px]

            xl:h-[160px]

            2xl:h-[220px]
          "
        >
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

              md:p-1
              lg:p-1.5
              xl:p-1.5

              2xl:p-2
            "
          />
        </div>

        {/* PRODUCT TITLE */}

        <h3
          className="
            mt-3
            line-clamp-2
            min-h-[40px]

            text-[14px]
            font-semibold
            leading-[1.4]
            text-slate-900

            md:mt-2
            md:min-h-[34px]
            md:text-[12px]
            md:leading-[1.35]

            lg:mt-2.5
            lg:min-h-[36px]
            lg:text-[12.5px]

            xl:mt-2.5
            xl:min-h-[38px]
            xl:text-[13px]
            xl:leading-[1.4]

            2xl:mt-4
            2xl:min-h-[44px]
            2xl:text-[15px]
            2xl:leading-[1.45]
          "
        >
          {product.title}
        </h3>

        {/* PRICE / WISHLIST */}

        <div
          className="
            mt-auto
            pt-3

            md:pt-2

            lg:pt-2.5

            xl:pt-2.5

            2xl:pt-4
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-2

              xl:gap-2.5

              2xl:gap-4
            "
          >
            <span
              className="
                min-w-0

                text-[18px]
                font-bold
                tracking-tight
                text-slate-950

                md:text-[14.5px]

                lg:text-[15px]

                xl:text-[16px]

                2xl:text-[20px]
              "
            >
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
                className="
                  h-6
                  w-6

                  md:h-[18px]
                  md:w-[18px]

                  lg:h-5
                  lg:w-5

                  xl:h-[21px]
                  xl:w-[21px]

                  2xl:h-7
                  2xl:w-7
                "
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

          {/* DISCOUNT INFO */}

          <div
            className="
              mt-1
              flex
              min-h-[18px]
              items-center
              gap-1.5

              md:min-h-[15px]
              md:gap-1

              lg:min-h-[16px]

              xl:min-h-[17px]
              xl:gap-1.5

              2xl:mt-1.5
              2xl:min-h-[20px]
              2xl:gap-2
            "
          >
            {hasDiscount && (
              <>
                <span
                  className="
                    text-[10px]
                    text-slate-400
                    line-through

                    md:text-[8px]

                    lg:text-[8.5px]

                    xl:text-[9px]

                    2xl:text-xs
                  "
                >
                  {formatPriceEUR(product.oldPrice)}
                </span>

                <span
                  className="
                    rounded-full
                    bg-blue-50

                    px-1.5
                    py-[2px]

                    text-[9px]
                    font-bold
                    text-blue-700

                    md:px-1
                    md:py-[1px]
                    md:text-[7.5px]

                    lg:text-[8px]

                    xl:px-1.5
                    xl:text-[8.5px]

                    2xl:px-2
                    2xl:py-[3px]
                    2xl:text-[10px]
                  "
                >
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