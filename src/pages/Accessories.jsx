import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";
import { products } from "../data/products";

function isMonitorLike(title, category) {
  return (
    category === "monitor" ||
    category === "monitors" ||
    category === "monitora" ||
    title.includes("monitor")
  );
}

function isAccessoryLike(title, category) {
  return (
    category === "smart accessories" ||
    category === "smart accessory" ||
    category === "smart aksesor" ||
    category === "aksesor" ||
    category === "aksesore" ||
    category === "keyboards & mice" ||
    category === "keyboard & mouse" ||
    category === "tastiera & maus" ||
    category === "tastiera dhe maus" ||
    title.includes("tastiere") ||
    title.includes("keyboard") ||
    title.includes("maus") ||
    title.includes("mouse") ||
    title.includes("headset") ||
    title.includes("earbud") ||
    title.includes("earbuds") ||
    title.includes("airpods") ||
    title.includes("watch") ||
    title.includes("ore") ||
    title.includes("charger") ||
    title.includes("karikues") ||
    title.includes("power bank") ||
    title.includes("powerbank") ||
    title.includes("cable") ||
    title.includes("kabllo") ||
    title.includes("case")
  );
}

export default function Accessories() {
  const accessoriesProducts = products.filter((p) => {
    const title = (p.title || "").toLowerCase();
    const category = (p.category || "").toLowerCase();
    const section = (p.section || "").toLowerCase();

    if (section === "accessories") return true;
    if (section === "monitors") return false;

    if (!isAccessoryLike(title, category)) return false;
    if (isMonitorLike(title, category)) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Aksesorë</h1>
          <p className="mt-1 text-sm text-slate-600">
            Tastiera, mausë, headset, AirPods, smart accessories dhe më shumë.
          </p>
        </div>

        {accessoriesProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              Nuk u gjetën aksesorë
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Ju lutem kontrolloni më vonë.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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