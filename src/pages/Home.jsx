import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import SpecialOffer from "../components/home/SpecialOffer";
import HeroSlider from "../components/home/HeroSlider";

import { products } from "../data/products";

/* =========================================================
   ICONS
   ========================================================= */

function DeliveryIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M6 14h22v19H6V14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M28 21h8l7 7v5H28V21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M2 20h8M2 25h6"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle
        cx="14"
        cy="35"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="36"
        cy="35"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M6 9h5l4 21h22l4-15H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M19 9c0-2 1.6-3.5 3.5-3.5S26 7 26 9"
        stroke="#1e40af"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle
        cx="20"
        cy="37"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="35"
        cy="37"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M10 25v-4C10 13.3 16.3 7 24 7s14 6.3 14 14v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M9 24h5v11H9a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M39 24h-5v11h5a4 4 0 0 0 4-4v-3a4 4 0 0 0-4-4Z"
        stroke="#1e40af"
        strokeWidth="2"
      />

      <path
        d="M34 35c0 4-3 6-8 6h-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M6 25 25 6h15v15L21 40 6 25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <circle
        cx="32"
        cy="14"
        r="2.5"
        stroke="#1e40af"
        strokeWidth="2"
      />
    </svg>
  );
}

/* =========================================================
   SHOPPING BENEFITS DATA
   ========================================================= */

const shoppingBenefits = [
  {
    id: 1,
    title: "Dërgesa të shpejta",
    description: "Kudo në Kosovë",
    Icon: DeliveryIcon,
  },
  {
    id: 2,
    title: "Mbi 100,000 produkte",
    description: "Origjinale dhe me garancion",
    Icon: ProductsIcon,
  },
  {
    id: 3,
    title: "Kujdesi ndaj klientit",
    description: "Përgjigje të shpejta",
    Icon: SupportIcon,
  },
  {
    id: 4,
    title: "Çmimi më i mirë",
    description: "Në çdo produkt",
    Icon: PriceIcon,
  },
];

/* =========================================================
   SAFE SHOPPING
   ========================================================= */

function SafeShopping() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef(null);
  const activeIndexRef = useRef(0);
  const isTouchingRef = useRef(false);
  const scrollEndTimerRef = useRef(null);

  function getBenefitStep() {
    const slider = sliderRef.current;

    if (!slider) {
      return 0;
    }

    const firstCard = slider.children[0];

    if (!firstCard) {
      return 0;
    }

    const styles = window.getComputedStyle(slider);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      0;

    return (
      firstCard.getBoundingClientRect().width +
      gap
    );
  }

  function goToBenefit(
    targetIndex,
    behavior = "smooth"
  ) {
    const slider = sliderRef.current;
    const total = shoppingBenefits.length;

    const safeIndex =
      ((targetIndex % total) + total) %
      total;

    activeIndexRef.current = safeIndex;
    setActiveIndex(safeIndex);

    if (!slider) {
      return;
    }

    const step = getBenefitStep();

    if (!step) {
      return;
    }

    slider.scrollTo({
      left: safeIndex * step,
      behavior,
    });
  }

  /* Auto slide on phone / tablet */

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth >= 1024) {
        return;
      }

      if (isTouchingRef.current) {
        return;
      }

      goToBenefit(
        activeIndexRef.current + 1
      );
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  function handleBenefitScroll() {
    if (scrollEndTimerRef.current) {
      clearTimeout(
        scrollEndTimerRef.current
      );
    }

    scrollEndTimerRef.current =
      setTimeout(() => {
        const slider = sliderRef.current;

        if (!slider) {
          return;
        }

        const step = getBenefitStep();

        if (!step) {
          return;
        }

        const calculatedIndex =
          Math.round(
            slider.scrollLeft / step
          );

        const safeIndex = Math.max(
          0,
          Math.min(
            calculatedIndex,
            shoppingBenefits.length - 1
          )
        );

        activeIndexRef.current =
          safeIndex;

        setActiveIndex(safeIndex);
      }, 120);
  }

  function handleBenefitTouchStart() {
    isTouchingRef.current = true;
  }

  function handleBenefitTouchEnd() {
    setTimeout(() => {
      isTouchingRef.current = false;
    }, 300);
  }

  /* Keep correct position after resize */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        return;
      }

      requestAnimationFrame(() => {
        const slider = sliderRef.current;

        if (!slider) {
          return;
        }

        const step = getBenefitStep();

        if (!step) {
          return;
        }

        slider.scrollTo({
          left: activeIndexRef.current * step,
          behavior: "auto",
        });
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener(
      "orientationchange",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "orientationchange",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current) {
        clearTimeout(
          scrollEndTimerRef.current
        );
      }
    };
  }, []);

  return (
<<<<<<< HEAD
    <section className="w-full min-w-0 bg-white">
      {/* =====================================================
          MOBILE / TABLET
          ===================================================== */}

=======
    <section className="w-full bg-white">
      {/* MOBILE / TABLET */}
>>>>>>> 222fe74b8c7fe2bbe7585a81486da94cab8fd794
      <div className="w-full pb-3 pt-4 lg:hidden">
        <h2 className="mb-2 text-[14px] font-medium text-slate-700">
          Blerje të sigurta
        </h2>

        <div className="w-full overflow-hidden rounded-[7px] border border-slate-100 bg-slate-50/60">
          <div
            ref={sliderRef}
            onScroll={
              handleBenefitScroll
            }
            onTouchStart={
              handleBenefitTouchStart
            }
            onTouchEnd={
              handleBenefitTouchEnd
            }
            onTouchCancel={
              handleBenefitTouchEnd
            }
            className="safe-shopping-carousel flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
          >
            {shoppingBenefits.map(
              ({
                id,
                title,
                description,
                Icon,
              }) => (
                <div
                  key={id}
                  className="
                    flex
                    min-h-[60px]
                    w-[72%]
                    shrink-0
                    snap-start
                    items-center
                    gap-2.5
                    border-r
                    border-slate-200/70
                    px-3
                    py-2.5
                    min-[400px]:w-[65%]
                    sm:w-[48%]
                    md:w-[36%]
                  "
                  style={{
                    scrollSnapStop:
                      "always",
                  }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center text-blue-800">
                    <Icon />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-[11px] font-semibold leading-4 text-slate-700">
                      {title}
                    </h3>

                    <p className="mt-[2px] truncate text-[9.5px] leading-3 text-slate-400">
                      {description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-1">
<<<<<<< HEAD
          {shoppingBenefits.map((benefit, benefitIndex) => (
            <button
              key={benefit.id}
              type="button"
              onClick={() => goToBenefit(benefitIndex)}
              aria-label={`Shfaq ${benefit.title}`}
              className={`
                h-[4px]
                rounded-full
                transition-all
                duration-300
                ${
                  activeIndex === benefitIndex
                    ? "w-3.5 bg-blue-800"
                    : "w-[4px] bg-slate-200"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          DESKTOP
          ===================================================== */}

=======
          {shoppingBenefits.map(
            (benefit, index) => (
              <button
                key={benefit.id}
                type="button"
                onClick={() =>
                  goToBenefit(index)
                }
                aria-label={`Shfaq ${benefit.title}`}
                className={`h-[4px] rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-3.5 bg-blue-800"
                    : "w-[4px] bg-slate-200"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* DESKTOP */}
>>>>>>> 222fe74b8c7fe2bbe7585a81486da94cab8fd794
      <div className="hidden w-full py-6 lg:block">
        <h2 className="mb-4 text-[18px] font-semibold text-slate-950">
          Blerje të sigurta
        </h2>

        <div className="grid w-full grid-cols-4 overflow-hidden rounded-[7px] bg-slate-50 shadow-[0_2px_10px_rgba(15,23,42,0.035)]">
          {shoppingBenefits.map(
            ({
              id,
              title,
              description,
              Icon,
            }) => (
              <div
                key={id}
                className="
                  flex
                  min-w-0
                  min-h-[82px]
                  items-center
                  gap-3
                  border-r
                  border-slate-200
                  px-4
                  py-4
                  last:border-r-0
                  xl:px-5
                  2xl:px-7
                "
              >
                <div className="shrink-0 text-blue-800">
                  <div className="scale-125">
                    <Icon />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-[13px] font-semibold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-0.5 truncate text-[11px] text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <style>
        {`
          .safe-shopping-carousel {
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            touch-action: pan-x pan-y;
          }

          .safe-shopping-carousel::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */

export default function Home() {
  const [
    visibleMoreProducts,
    setVisibleMoreProducts,
  ] = useState(15);

  const moreProducts = products.slice(
    4,
    4 + visibleMoreProducts
  );

  const hasMoreProducts =
    4 + visibleMoreProducts <
    products.length;

  function handleShowMore() {
    setVisibleMoreProducts(
      (current) => current + 10
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />

<<<<<<< HEAD
      {/* =====================================================
          HERO AREA
          ===================================================== */}
=======
      {/* ================================= */}
      {/* HERO AREA */}
      {/* ================================= */}
>>>>>>> 222fe74b8c7fe2bbe7585a81486da94cab8fd794

      <div className="w-full bg-white">
        <div
          className="
            mx-auto
            w-full
            max-w-[1460px]
            px-4
            pt-3
            sm:px-6
<<<<<<< HEAD
            2xl:px-5
          "
        >
          {/* Mobile top info */}

          <div className="mb-2 mt-2 flex w-full min-w-0 items-center justify-between rounded-[6px] border border-slate-100 bg-slate-100/70 px-3 py-[7px] md:hidden">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium leading-[14px] text-slate-600">
                Dërgesa të shpejta • 100% të sigurta
=======
          "
        >
          <div className="mb-2 mt-2 flex items-center justify-between rounded-[6px] border border-slate-100 bg-slate-100/70 px-3 py-[7px] md:hidden">
            <div className="min-w-0">
              <p className="text-[10px] font-medium leading-[14px] text-slate-600">
                Dërgesa të shpejta •
                100% të sigurta
>>>>>>> 222fe74b8c7fe2bbe7585a81486da94cab8fd794
              </p>

              <NavLink
                to="/terms"
                className="block text-[8.5px] leading-3 text-slate-400 transition hover:text-blue-800"
              >
                Termat & Kushtet
              </NavLink>
            </div>

            <NavLink
              to="/contact"
              className="ml-3 shrink-0 border-l border-slate-300/70 pl-3 text-[9.5px] font-medium text-slate-500 transition hover:text-blue-900"
            >
              Support
            </NavLink>
          </div>

          <HeroSlider />

          <SafeShopping />
        </div>
      </div>

<<<<<<< HEAD
      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main
        className="
          mx-auto
          w-full
          max-w-[1460px]
          min-w-0
          px-4
          py-8
          sm:px-6
          sm:py-10
          2xl:px-5
        "
      >
        {/* ===================================================
            FEATURED PRODUCTS
            =================================================== */}

        <section className="w-full min-w-0">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Produktet e Veçuara
          </h1>

          <p className="mt-2 text-[13px] text-slate-600 sm:text-sm">
            Zgjedhjet më të mira të përzgjedhura për ju.
          </p>

          <div
            className="
              mt-6
              grid
              w-full
              min-w-0
              grid-cols-2
              gap-3
              sm:mt-8
              sm:gap-5
              md:grid-cols-4
              lg:gap-6
            "
          >
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            SPECIAL OFFER
            =================================================== */}

        <div className="w-full min-w-0 overflow-hidden">
          <SpecialOffer
            items={products}
            intervalMs={3000}
          />
        </div>

        {/* ===================================================
            MORE PRODUCTS
            =================================================== */}

        <section className="mt-10 w-full min-w-0 sm:mt-14">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Më Shumë Produkte
          </h2>

          <p className="mt-1 text-[13px] text-slate-600 sm:text-sm">
            Shikoni më shumë oferta dhe artikuj të njohur.
          </p>

          <div
            className="
              mt-5
              grid
              w-full
              min-w-0
              grid-cols-2
              gap-3
              sm:mt-6
              sm:grid-cols-3
              sm:gap-5
              md:grid-cols-4
              lg:grid-cols-5
              lg:gap-6
            "
          >
            {moreProducts.map((product) => (
              <div key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {hasMoreProducts && (
            <div className="mt-8 flex w-full justify-center">
              <button
                type="button"
                onClick={handleShowMore}
                className="
                  w-full
                  max-w-[260px]
                  rounded-md
                  border
                  border-slate-300
                  bg-white
                  px-5
                  py-3
                  text-[12px]
                  font-semibold
                  text-slate-950
                  transition-all
                  duration-200
                  hover:border-slate-500
                  hover:bg-slate-50
                  active:scale-[0.98]
                  sm:min-w-[210px]
                  sm:text-sm
                "
              >
                SHFAQ MË SHUMË PRODUKTE
              </button>
=======
      {/* ================================= */}
      {/* PRODUCTS */}
      {/* ================================= */}

      <main className="w-full py-8 md:py-9 xl:py-10">
        {/*
          IMPORTANT:
          This wrapper creates the white
          space on BOTH SIDES of the
          entire products section.
        */}
        <div
          className="
            mx-auto
            w-full
            px-4
            sm:px-6

            md:max-w-[900px]

            lg:max-w-[1040px]

            xl:max-w-[1240px]

            2xl:max-w-[1400px]
          "
        >
          {/* FEATURED PRODUCTS */}
          <section>
            <h1
              className="
                text-xl
                font-bold
                text-slate-900

                md:text-[20px]

                xl:text-2xl
              "
            >
              Produktet e Veçuara
            </h1>

            <p
              className="
                mt-1.5
                text-[13px]
                text-slate-600

                xl:mt-2
                xl:text-sm
              "
            >
              Zgjedhjet më të mira të
              përzgjedhura për ju.
            </p>

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-3

                sm:gap-4

                md:grid-cols-4
                md:gap-3.5

                lg:gap-4

                xl:mt-8
                xl:gap-5

                2xl:gap-6
              "
            >
              {products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
>>>>>>> 222fe74b8c7fe2bbe7585a81486da94cab8fd794
            </div>
          </section>

          {/* SPECIAL OFFER */}
          <SpecialOffer
            items={products}
            intervalMs={3000}
          />

          {/* MORE PRODUCTS */}
          <section className="mt-10 xl:mt-14">
            <h2
              className="
                text-lg
                font-bold
                text-slate-900

                md:text-[19px]

                xl:text-xl
              "
            >
              Më Shumë Produkte
            </h2>

            <p
              className="
                mt-1
                text-[13px]
                text-slate-600

                xl:text-sm
              "
            >
              Shikoni më shumë oferta dhe
              artikuj të njohur.
            </p>

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-3

                sm:grid-cols-3
                sm:gap-4

                md:grid-cols-4
                md:gap-3.5

                lg:grid-cols-5
                lg:gap-4

                xl:mt-6
                xl:gap-5

                2xl:gap-6
              "
            >
              {moreProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
            </div>

            {hasMoreProducts && (
              <div className="mt-7 flex justify-center xl:mt-8">
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="
                    min-w-[190px]
                    rounded-md
                    border
                    border-slate-300
                    bg-white
                    px-5
                    py-2.5
                    text-[12px]
                    font-semibold
                    text-slate-950
                    transition-all
                    duration-200
                    hover:border-slate-500
                    hover:bg-slate-50
                    active:scale-[0.98]

                    xl:min-w-[210px]
                    xl:px-6
                    xl:py-3
                    xl:text-sm
                  "
                >
                  SHFAQ MË SHUMË PRODUKTE
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}