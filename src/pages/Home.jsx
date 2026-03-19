import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import SpecialOffer from "../components/home/SpecialOffer";
import { products } from "../data/products";
import HeroSlider from "../components/home/HeroSlider";
import CategoriesMenu from "../components/shop/CategoriesMenu";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CategoriesMenu variant="topbar" disableDropdown />

      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-0">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
            <CategoriesMenu variant="sidebar" />
            <HeroSlider />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Produktet e Veçuara
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Zgjedhjet më të mira të përzgjedhura për ju.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <SpecialOffer items={products} intervalMs={3000} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">
            Më Shumë Produkte
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Shikoni më shumë oferta dhe artikuj të njohur.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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