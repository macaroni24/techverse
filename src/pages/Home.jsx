import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import SpecialOffer from "../components/home/SpecialOffer";
import { products } from "../data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* ===== Top section: 4 products ===== */}
        <h1 className="text-2xl font-bold text-slate-900">
          Featured Products
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Top picks selected for you.
        </p>

        <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* ===== Special Offer ===== */}
        <SpecialOffer items={products} intervalMs={3000} />

        {/* ===== 3 rows × 5 products ===== */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">
            More Products
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Browse more deals and popular items.
          </p>

          {/* Row 1 */}
          <div className="mt-6 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(4, 9).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(9, 14).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(14, 19).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
             <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(14, 19).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>   <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(14, 19).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
