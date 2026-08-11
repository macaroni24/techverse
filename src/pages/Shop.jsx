import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { products } from "../data/products";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

export default function Shop() {
  const query = useQuery();

  const categoryParam = query.get("category") || "All";
  const searchParam = query.get("q") || "";
  const sortParam = query.get("sort") || "relevance";

  const [sort, setSort] = useState(sortParam);

  useEffect(() => {
    setSort(sortParam);
  }, [sortParam]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (categoryParam !== "All") {
      if (categoryParam === "laptops-phones") {
        list = list.filter(
          (product) =>
            product.category === "Laptops" ||
            product.category === "Phones"
        );
      } else {
        list = list.filter(
          (product) => product.category === categoryParam
        );
      }
    }

    const searchValue = normalize(searchParam);

    if (searchValue) {
      list = list.filter((product) => {
        const searchableText = normalize(
          `${product.title} ${product.brand} ${product.category}`
        );

        return searchableText.includes(searchValue);
      });
    }

    if (sort === "price-asc") {
      list.sort(
        (a, b) =>
          Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sort === "price-desc") {
      list.sort(
        (a, b) =>
          Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sort === "discount") {
      list.sort((a, b) => {
        const discountA =
          a.oldPrice && a.oldPrice > a.price
            ? (a.oldPrice - a.price) / a.oldPrice
            : 0;

        const discountB =
          b.oldPrice && b.oldPrice > b.price
            ? (b.oldPrice - b.price) / b.oldPrice
            : 0;

        return discountB - discountA;
      });
    }

    return list;
  }, [categoryParam, searchParam, sort]);

  const pageTitle =
    categoryParam !== "All"
      ? categoryParam
      : "Dyqani";

  const productCountLabel =
    filteredProducts.length === 1
      ? "produkt"
      : "produkte";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-[1460px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {pageTitle}
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              {filteredProducts.length} {productCountLabel}

              {searchParam && (
                <span>
                  {" "}
                  për{" "}
                  <span className="font-medium text-slate-700">
                    “{searchParam}”
                  </span>
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              Rendit sipas
            </span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 min-w-[180px] rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            >
              <option value="relevance">
                Relevanca
              </option>

              <option value="price-asc">
                Çmimi: Ulët → Lartë
              </option>

              <option value="price-desc">
                Çmimi: Lartë → Ulët
              </option>

              <option value="discount">
                Zbritja më e madhe
              </option>
            </select>

            <NavLink
              to="/shop"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              Pastro
            </NavLink>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-20 flex max-w-lg flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path
                  d="m20 20-4-4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Nuk u gjet asnjë produkt
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Provoni një kërkim tjetër, ndryshoni kategorinë ose pastroni filtrat.
            </p>

            <NavLink
              to="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-6 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98]"
            >
              Kthehu te Dyqani
            </NavLink>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}