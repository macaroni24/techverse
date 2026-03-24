import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import SpecialOffer from "../components/home/SpecialOffer";
import HeroSlider from "../components/home/HeroSlider";
import CategoriesMenu from "../components/shop/CategoriesMenu";
import { products } from "../data/products";

export default function Dashboard() {
  const featuredProducts = products.slice(0, 4);
  const latestProducts = products.slice(4, 12);
  const topDeals = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <CategoriesMenu variant="topbar" disableDropdown />

      <section className="w-full bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm text-slate-300">Mirë se erdhe</p>
              <h1 className="mt-2 text-2xl font-bold">Dashboard</h1>
              <p className="mt-2 text-sm text-slate-300">
                Menaxho produktet, ofertat dhe shiko artikujt më të kërkuar për
                dyqanin tënd të teknologjisë.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">Produkte aktive</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {products.length}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                PC, laptopë, telefona dhe aksesorë në katalog.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">Kategori kryesore</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Tech</h2>
              <p className="mt-2 text-sm text-slate-600">
                Fokus në pajisje moderne dhe oferta speciale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
            <CategoriesMenu variant="sidebar" />
            <HeroSlider />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Produktet e Veçuara
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Artikujt më të mirë për klientët e dyqanit.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="grid gap-4 md:grid-cols-3">
            {topDeals.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Oferta
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Shiko këtë produkt të rekomanduar për performancë dhe vlerë.
                </p>
                <div className="mt-4 text-sm font-semibold text-slate-900">
                  {product.price}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SpecialOffer items={products} intervalMs={3000} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">
            Produktet më të fundit
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Laptopë, telefona, PC dhe aksesorë të rinj në shitje.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}