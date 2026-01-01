import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { products } from "../data/products";

export default function Accessories() {
  const accessoriesProducts = products.filter((p) => {
    const text = `${p.title || ""} ${p.category || ""}`.toLowerCase();

    return (
      text.includes("accessor") ||
      text.includes("keyboard") ||
      text.includes("mouse") ||
      text.includes("headset") ||
      text.includes("earbud") ||
      text.includes("airpods") ||
      text.includes("watch") ||
      text.includes("controller")
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Accessories</h1>
          <p className="mt-1 text-sm text-slate-600">
            Keyboards, mice, headsets, smart accessories and more.
          </p>
        </div>

        {accessoriesProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No accessories found
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {accessoriesProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
