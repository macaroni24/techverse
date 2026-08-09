import {
  useEffect,
  useRef,
  useState,
} from "react";

import { NavLink } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import CategoriesMenu from "../components/shop/CategoriesMenu";
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
        stroke="#f97316"
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
        stroke="#f97316"
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
        stroke="#f97316"
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
        stroke="#f97316"
        strokeWidth="2"
      />
    </svg>
  );
}

/* =========================================================
   SAFE SHOPPING DATA
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

  /* AUTO SLIDE MOBILE */
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth >= 1024) return;

      setActiveIndex(
        (current) =>
          (current + 1) %
          shoppingBenefits.length
      );
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  /* MOVE SLIDER */
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard = slider.children[0];

    if (!firstCard) return;

    const styles =
      window.getComputedStyle(slider);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      0;

    const step =
      firstCard.getBoundingClientRect().width +
      gap;

    slider.scrollTo({
      left: activeIndex * step,
      behavior: "smooth",
    });
  }, [activeIndex]);

  /* USER SWIPE */
  function handleMobileScroll() {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard = slider.children[0];

    if (!firstCard) return;

    const styles =
      window.getComputedStyle(slider);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      0;

    const step =
      firstCard.getBoundingClientRect().width +
      gap;

    const newIndex = Math.round(
      slider.scrollLeft / step
    );

    if (
      newIndex >= 0 &&
      newIndex < shoppingBenefits.length
    ) {
      setActiveIndex(newIndex);
    }
  }

  return (
    <section className="w-full bg-white">

      {/* =================================================
          MOBILE VERSION — RESTORED
      ================================================= */}

      <div className="mx-auto w-full max-w-7xl px-4 pb-3 pt-4 sm:px-6 lg:hidden">

        <h2 className="mb-2 text-[14px] font-medium text-slate-700">
          Blerje të sigurta
        </h2>

        <div
          className="
            overflow-hidden
            rounded-[7px]
            border
            border-slate-100
            bg-slate-50/60
          "
        >
          <div
            ref={sliderRef}
            onScroll={handleMobileScroll}
            className="
              safe-shopping-carousel
              flex
              w-full
              snap-x
              snap-mandatory
              overflow-x-auto
              scroll-smooth
            "
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
                    w-[68%]
                    shrink-0
                    snap-start
                    items-center
                    gap-2.5
                    border-r
                    border-slate-200/70
                    px-3
                    py-2.5

                    sm:w-[48%]

                    md:w-[36%]
                  "
                >
                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      text-slate-500
                      opacity-80
                    "
                  >
                    <Icon />
                  </div>

                  {/* TEXT */}

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-[11px]
                        font-semibold
                        leading-4
                        text-slate-700
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-[2px]
                        truncate
                        text-[9.5px]
                        leading-3
                        text-slate-400
                      "
                    >
                      {description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* =================================================
          DESKTOP VERSION
      ================================================= */}

      <div className="mx-auto hidden w-full max-w-7xl px-4 py-7 sm:px-6 lg:block">

        <h2 className="mb-4 text-[18px] font-semibold text-slate-950">
          Blerje të sigurta
        </h2>

        <div
          className="
            grid
            grid-cols-4
            overflow-hidden
            rounded-[7px]
            bg-slate-50
            shadow-[0_2px_10px_rgba(15,23,42,0.035)]
          "
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
                  min-h-[82px]
                  items-center
                  gap-3
                  border-r
                  border-slate-200
                  px-5
                  py-4
                  last:border-r-0
                  xl:px-7
                "
              >
                <div className="shrink-0 text-orange-500">
                  <div className="scale-125">
                    <Icon />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-[13px] font-semibold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-0.5 text-[11px] text-slate-500">
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
            overscroll-behavior-x: contain;
            -webkit-overflow-scrolling: touch;
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
   HOME
========================================================= */

export default function Home() {
  const [
    visibleMoreProducts,
    setVisibleMoreProducts,
  ] = useState(15);

  const [
    categoriesCollapsed,
    setCategoriesCollapsed,
  ] = useState(false);

  /* =======================================================
     CATEGORY COLLAPSE
  ======================================================= */

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;

      setCategoriesCollapsed(
        (current) => {
          if (y >= 90) {
            return true;
          }

          if (y <= 25) {
            return false;
          }

          return current;
        }
      );
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     PRODUCTS
  ======================================================= */

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
    <div className="min-h-screen w-full bg-white">

      {/* NAVBAR */}

      <Navbar />

      {/* =================================================
          HERO AREA
      ================================================= */}

      <div className="w-full bg-white">

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">

          {/* =============================================
              MOBILE INFO BAR
              PHONE ONLY
          ============================================= */}

          <div
            className="
              mb-2
              mt-2

              flex
              items-center
              justify-between

              rounded-[6px]

              border
              border-slate-100

              bg-slate-100/70

              px-3
              py-[7px]

              md:hidden
            "
          >
            {/* LEFT */}

            <div className="min-w-0">
              <p
                className="
                  text-[10px]
                  font-medium
                  leading-[14px]
                  text-slate-600
                "
              >
                Dërgesa të shpejta • 100% të sigurta
              </p>

              <NavLink
                to="/terms"
                className="
                  block
                  text-[8.5px]
                  leading-3
                  text-slate-400
                  transition
                  hover:text-emerald-800
                "
              >
                Termat & Kushtet
              </NavLink>
            </div>

            {/* RIGHT */}

            <NavLink
              to="/contact"
              className="
                ml-3
                shrink-0

                border-l
                border-slate-300/70

                pl-3

                text-[9.5px]
                font-medium
                text-slate-500

                transition
                hover:text-emerald-900
              "
            >
              Support
            </NavLink>
          </div>

          {/* =============================================
              CATEGORIES + HERO
          ============================================= */}

          <div
            className={`
              relative
              grid
              w-full
              grid-cols-1
              gap-3
              overflow-visible

              ${
                categoriesCollapsed
                  ? "lg:grid-cols-[0px_minmax(0,1fr)]"
                  : "lg:grid-cols-[230px_minmax(0,1fr)]"
              }
            `}
            style={{
              transition:
                "grid-template-columns 650ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* CATEGORIES */}

            <div
              className={`
                relative
                z-[80]

                hidden

                min-w-0
                overflow-visible

                lg:block

                ${
                  categoriesCollapsed
                    ? "lg:pointer-events-none lg:-translate-x-8 lg:opacity-0"
                    : "lg:translate-x-0 lg:opacity-100"
                }
              `}
              style={{
                transition:
                  "opacity 420ms ease, transform 580ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <CategoriesMenu />
            </div>

            {/* HERO */}

            <div className="relative z-0 w-full min-w-0">
              <HeroSlider />
            </div>
          </div>
        </div>

        {/* SAFE SHOPPING */}

        <SafeShopping />

      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* FEATURED PRODUCTS */}

        <section>

          <h1 className="text-2xl font-bold text-slate-900">
            Produktet e Veçuara
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Zgjedhjet më të mira të përzgjedhura për ju.
          </p>

          <div
            className="
              mt-8
              grid
              grid-cols-2
              gap-4

              sm:grid-cols-2
              sm:gap-5

              md:grid-cols-4

              lg:gap-6
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
          </div>

        </section>

        {/* SPECIAL OFFER */}

        <SpecialOffer
          items={products}
          intervalMs={3000}
        />

        {/* MORE PRODUCTS */}

        <section className="mt-14">

          <h2 className="text-xl font-bold text-slate-900">
            Më Shumë Produkte
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Shikoni më shumë oferta dhe artikuj të njohur.
          </p>

          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-4

              sm:grid-cols-3
              sm:gap-5

              md:grid-cols-4

              lg:grid-cols-5
              lg:gap-6
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
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleShowMore}
                className="
                  min-w-[150px]
                  rounded-md
                  bg-emerald-900
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-emerald-800
                  hover:shadow-md
                  active:scale-[0.98]
                "
              >
                Më shumë
              </button>
            </div>
          )}

        </section>
      </main>

      <Footer />

    </div>
  );
}