import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import CategoriesMenu from "../components/shop/CategoriesMenu";
import { products } from "../data/products";

export default function LaptopsPhones() {
  const lpProducts = products.filter((p) => {
    const category = (p.category || "").toLowerCase();
    const section = (p.section || "").toLowerCase();

    if (section === "laptops-phones") return true;

    return (
      category === "laptop" ||
      category === "laptops" ||
      category === "telefon" ||
      category === "telefona" ||
      category === "phone" ||
      category === "phones"
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CategoriesMenu variant="topbar" />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Laptopë & Telefona
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Duke shfaqur {lpProducts.length} produkte
          </p>
        </div>

        {lpProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              Nuk u gjetën laptopë ose telefona
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Ju lutem kontrolloni përsëri më vonë.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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