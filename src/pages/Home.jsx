import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import SpecialOffer from "../components/home/SpecialOffer";
import { products } from "../data/products";
import HeroSlider from "../components/home/HeroSlider";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
     
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

        <SpecialOffer items={products} intervalMs={3000} />

     
        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">
            More Products
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Browse more deals and popular items.
          </p>

    
          <div className="mt-6 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(4, 9).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

         
          
        </section>
      </main>

      <Footer />
    </div>
  );
}
