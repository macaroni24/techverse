import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { products } from "../data/products";

export default function LaptopsPhones() {
  const lpProducts = products.filter((p) => {
    const c = (p.category || "").toLowerCase();
    return c === "laptops" || c === "phones";
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Laptops & Phones
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Showing {lpProducts.length} products
          </p>
        </div>

        {lpProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No laptops or phones found
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {lpProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
