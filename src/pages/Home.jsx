import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import CategoriesMenu from "../components/shop/CategoriesMenu";
import ProductCard from "../components/shop/ProductCard";
import SpecialOffer from "../components/home/SpecialOffer";
import HeroSlider from "../components/home/HeroSlider";

import { products } from "../data/products";

function DeliveryIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-7 w-7"
    >
      <path
        d="M5 14h22v20H5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M27 21h8l7 7v6H27V21Z"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="14"
        cy="35"
        r="3.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="35"
        cy="35"
        r="3.5"
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
      className="h-7 w-7"
    >
      <path
        d="M9 11h4l3 22h21l4-15H15"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="20"
        cy="38"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="35"
        cy="38"
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
      className="h-7 w-7"
    >
      <path
        d="M9 26v-4c0-8.3 6.7-15 15-15s15 6.7 15 15v4"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M9 24h5v11H9a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4ZM39 24h-5v11h5a4 4 0 0 0 4-4v-3a4 4 0 0 0-4-4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-7 w-7"
    >
      <path
        d="M7 23 23 7h14l4 4v14L25 41 7 23Z"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="32"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function SafeShopping() {
  return (
    <div className="mx-auto mt-5 w-full max-w-[1340px] px-4 sm:px-6">
      <h2 className="mb-3 text-[16px] font-semibold text-slate-900">
        Blerje të sigurta
      </h2>

      <div className="overflow-hidden rounded-[7px] bg-slate-50 shadow-[0_2px_10px_rgba(15,23,42,0.035)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 px-5 py-4 lg:px-7">
            <div className="shrink-0 text-orange-500">
              <DeliveryIcon />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-slate-900">
                Dërgesa të shpejta
              </h3>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Kudo në Kosovë
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-200 px-5 py-4 sm:border-l sm:border-t-0 lg:px-7">
            <div className="shrink-0 text-orange-500">
              <ProductsIcon />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-slate-900">
                Mbi 100,000 produkte
              </h3>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Origjinale dhe me garancion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-200 px-5 py-4 sm:border-l-0 lg:border-l lg:border-t-0 lg:px-7">
            <div className="shrink-0 text-orange-500">
              <SupportIcon />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-slate-900">
                Kujdesi ndaj klientit
              </h3>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Përgjigje të shpejta
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-200 px-5 py-4 sm:border-l lg:border-t-0 lg:px-7">
            <div className="shrink-0 text-orange-500">
              <PriceIcon />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-slate-900">
                Çmimi më i mirë i garantuar
              </h3>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Në çdo produkt
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [
    visibleMoreProducts,
    setVisibleMoreProducts,
  ] = useState(15);

  const [
    categoriesCollapsed,
    setCategoriesCollapsed,
  ] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;

      setCategoriesCollapsed((current) => {
        if (y >= 90) {
          return true;
        }

        if (y <= 25) {
          return false;
        }

        return current;
      });
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

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
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div
            className="relative grid grid-cols-1 gap-3 overflow-visible lg:grid"
            style={{
              gridTemplateColumns:
                categoriesCollapsed
                  ? "0px minmax(0, 1fr)"
                  : "230px minmax(0, 1fr)",
              transition:
                "grid-template-columns 650ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className={`relative z-[80] hidden min-w-0 overflow-visible lg:block ${
                categoriesCollapsed
                  ? "pointer-events-none -translate-x-8 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
              style={{
                transition:
                  "opacity 420ms ease, transform 580ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <CategoriesMenu />
            </div>

            <div
              className="relative z-0 min-w-0"
              style={{
                transition:
                  "width 650ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <HeroSlider />
            </div>
          </div>
        </div>

        <SafeShopping />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <section>
          <h1 className="text-2xl font-bold text-slate-900">
            Produktet e Veçuara
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Zgjedhjet më të mira të përzgjedhura për ju.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4 lg:gap-6">
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

        <SpecialOffer
          items={products}
          intervalMs={3000}
        />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">
            Më Shumë Produkte
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Shikoni më shumë oferta dhe artikuj të njohur.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
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
                className="min-w-[150px] rounded-md bg-emerald-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:shadow-md active:scale-[0.98]"
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