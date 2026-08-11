import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import CategoriesMenu from "../components/shop/CategoriesMenu";
import { products } from "../data/products";

export default function LaptopsPhones() {
  const lpProducts = products.filter((product) => {
    const category = (product.category || "").toLowerCase();
    const section = (product.section || "").toLowerCase();

    if (section === "laptops-phones") {
      return true;
    }

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

      <main className="mx-auto w-full max-w-[1460px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-7 border-b border-slate-200 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Laptopë & Telefona
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Duke shfaqur {lpProducts.length}{" "}
            {lpProducts.length === 1 ? "produkt" : "produkte"}
          </p>
        </div>

        {lpProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {lpProducts.map((product) => (
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
              Nuk u gjetën laptopë ose telefona
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Ju lutem kontrolloni përsëri më vonë.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}