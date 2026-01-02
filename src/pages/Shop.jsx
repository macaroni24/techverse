import { useMemo, useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { products } from "../data/products";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

export default function Shop() {
  const query = useQuery();

  const categoryParam = query.get("category") || "All";
  const searchParam = query.get("q") || "";
  const sortParam = query.get("sort") || "relevance";

  const [sort, setSort] = useState(sortParam);

  // ✅ IMPORTANT: keep state in sync when URL changes
  useEffect(() => {
    setSort(sortParam);
  }, [sortParam]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (categoryParam !== "All") {
      // Optional: if you ever use /shop?category=laptops-phones
      if (categoryParam === "laptops-phones") {
        list = list.filter((p) => p.category === "Laptops" || p.category === "Phones");
      } else {
        list = list.filter((p) => p.category === categoryParam);
      }
    }

    // Search filter
    const q = normalize(searchParam);
    if (q) {
      list = list.filter((p) =>
        normalize(`${p.title} ${p.brand} ${p.category}`).includes(q)
      );
    }

    // Sorting (safe because list is a copy)
    if (sort === "price-asc") {
      list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price-desc") {
      list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sort === "discount") {
      list.sort((a, b) => {
        const da =
          a.oldPrice && a.oldPrice > a.price
            ? (a.oldPrice - a.price) / a.oldPrice
            : 0;
        const db =
          b.oldPrice && b.oldPrice > b.price
            ? (b.oldPrice - b.price) / b.oldPrice
            : 0;
        return db - da;
      });
    }

    return list;
  }, [categoryParam, searchParam, sort]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {categoryParam !== "All" ? categoryParam : "Shop"}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              {searchParam ? ` for “${searchParam}”` : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">Sort by</label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="discount">Best Discount</option>
            </select>

            <NavLink
              to="/shop"
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              Clear
            </NavLink>
          </div>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-12 rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No products found</p>
            <p className="mt-2 text-sm text-slate-600">
              Try a different category or clear filters.
            </p>
            <NavLink
              to="/shop"
              className="mt-5 inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              Back to Shop
            </NavLink>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
