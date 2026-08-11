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
    <>
      <div
        className="
          product-card-shell

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
          lg:p-3
          xl:p-4
        "
      >
        <NavLink
          to={`/product/${product.id}`}
          className="flex h-full min-w-0 flex-col"
        >
          {/* PRODUCT IMAGE */}

          <div
            className="
              product-card-image

              flex
              h-[155px]
              w-full
              items-center
              justify-center

              overflow-hidden

              bg-white

              sm:h-[165px]

              md:h-[145px]

              lg:h-[155px]

              xl:h-[205px]

              2xl:h-[235px]
            "
          >
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="
                product-card-img

                h-full
                w-full

                object-contain

                p-1.5

                transition
                duration-300

                group-hover:scale-[1.035]

                md:p-1.5

                xl:p-2
              "
            />
          </div>

          {/* PRODUCT TITLE */}

          <h3
            className="
              product-card-title

              mt-3

              line-clamp-2

              min-h-[40px]

              text-[14px]
              font-semibold
              leading-[1.4]

              text-slate-900

              md:mt-2.5
              md:min-h-[36px]
              md:text-[12.5px]
              md:leading-[1.4]

              lg:text-[13px]

              xl:mt-4
              xl:min-h-[44px]
              xl:text-[15px]
              xl:leading-[1.45]

              2xl:text-[16px]
            "
          >
            {product.title}
          </h3>

          {/* PRICE / WISHLIST */}

          <div
            className="
              product-card-bottom

              mt-auto

              pt-3

              md:pt-2.5

              xl:pt-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                gap-2

                xl:gap-4
              "
            >
              <span
                className="
                  product-card-price

                  min-w-0

                  text-[18px]
                  font-bold
                  tracking-tight

                  text-slate-950

                  md:text-[15px]

                  lg:text-[16px]

                  xl:text-[20px]

                  2xl:text-[22px]
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
                    product-card-heart

                    h-6
                    w-6

                    md:h-5
                    md:w-5

                    xl:h-7
                    xl:w-7
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
                product-card-discount-row

                mt-1

                flex
                min-h-[18px]
                items-center

                gap-1.5

                md:min-h-[16px]

                xl:mt-1.5
                xl:min-h-[20px]
                xl:gap-2
              "
            >
              {hasDiscount && (
                <>
                  <span
                    className="
                      product-card-old-price

                      text-[10px]

                      text-slate-400

                      line-through

                      md:text-[9px]

                      xl:text-xs
                    "
                  >
                    {formatPriceEUR(product.oldPrice)}
                  </span>

                  <span
                    className="
                      product-card-discount

                      rounded-full

                      bg-blue-50

                      px-1.5
                      py-[2px]

                      text-[9px]
                      font-bold

                      text-blue-700

                      md:px-1.5
                      md:py-[1px]
                      md:text-[8px]

                      xl:px-2
                      xl:py-[3px]
                      xl:text-[10px]
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

      <style>
        {`
          /*
            LAPTOP ONLY

            The normal Tailwind styles above remain untouched.

            This override only activates when:
            - width is between 1024px and 1600px
            - height is 900px or smaller

            Example:
            1366 x 768  -> compact
            1536 x 864  -> compact

            Large external monitor:
            1920 x 1080 -> ORIGINAL LARGE VERSION
          */

          @media
            (min-width: 1024px)
            and (max-width: 1600px)
            and (max-height: 900px) {

            .product-card-shell {
              padding: 10px !important;
            }

            .product-card-image {
              height: 145px !important;
            }

            .product-card-img {
              padding: 5px !important;
            }

            .product-card-title {
              margin-top: 9px !important;

              min-height: 36px !important;

              font-size: 12.5px !important;

              line-height: 1.4 !important;
            }

            .product-card-bottom {
              padding-top: 9px !important;
            }

            .product-card-price {
              font-size: 16px !important;
            }

            .product-card-heart {
              width: 21px !important;
              height: 21px !important;
            }

            .product-card-discount-row {
              margin-top: 4px !important;

              min-height: 16px !important;

              gap: 5px !important;
            }

            .product-card-old-price {
              font-size: 9px !important;
            }

            .product-card-discount {
              padding: 1px 6px !important;

              font-size: 8px !important;
            }
          }
        `}
      </style>
    </>
  );
}