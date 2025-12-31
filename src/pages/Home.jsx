import { Link } from "react-router-dom";
import { Search, Menu, User, ShoppingBag } from "lucide-react";

export default function Home() {
  const products = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Header */}
      <header className="bg-[#0A3D38] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold">Techverse</Link>
              <nav className="hidden md:flex gap-6">
                <Link to="/deals" className="hover:text-gray-300">Deals</Link>
                <Link to="/categories" className="hover:text-gray-300">Categories</Link>
                <Link to="/electronics" className="hover:text-gray-300">Electronics</Link>
                <Link to="/fashion" className="hover:text-gray-300">Fashion</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block"><User size={22} /></button>
              <button><ShoppingBag size={22} /></button>
              <button className="md:hidden"><Menu size={22} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-[#0A3D38] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Everything 50% Off Today!
          </h1>
          <p className="text-lg mb-8 opacity-90">
            Shop thousands of tech products with free delivery in Kosovo
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-sm overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 px-6 py-4 text-gray-800 outline-none"
              />
              <button className="bg-orange-500 px-8 py-4 hover:bg-orange-600 transition">
                <Search className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0A3D38] mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Phones", "Laptops", "Fashion", "Home", "Beauty", "Sports"].map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className="bg-white rounded-sm shadow hover:shadow-lg transition text-center p-6"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-sm w-20 h-20 mx-auto mb-3" />
                <p className="text-[#0A3D38] font-medium">{cat}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0A3D38] mb-8">Today’s Best Deals</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {products.map((i) => {
              // Insert a big Oferta Speciale card at index 9 (halfway)
              if (i === 10) {
                return (
                  <div key="oferta" className="col-span-2 md:col-span-2 bg-[#0A3D38] text-white p-6 flex flex-col justify-center items-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Oferta Speciale</h3>
                    <p className="text-lg opacity-90 mb-4">Limited time special deal on this amazing gadget!</p>
                    <div className="bg-gray-200 rounded-sm w-full h-48 mb-4" />
                    <button className="bg-orange-500 px-4 py-2 hover:bg-orange-600 transition rounded-sm font-semibold">
                      View Offer
                    </button>
                  </div>
                );
              }
              return (
                <div key={i} className="bg-white rounded-sm shadow hover:shadow-lg transition flex flex-col">
                  <div className="bg-gray-200 border border-gray-300 rounded-sm h-48 mb-3" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="text-[#0A3D38] font-semibold mb-1">Product {i}</p>
                    <p className="text-2xl font-bold text-orange-500 mb-1">€49.99</p>
                    <p className="text-sm text-gray-500 line-through">€99.99</p>
                    <Link
                      to="/products"
                      className="mt-2 bg-green-900 text-white text-center py-2 font-semibold hover:bg-green-800 transition rounded-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A3D38] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Techverse</h4>
              <p className="text-sm opacity-80">Kosovo’s #1 Online Tech Store</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Help</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/delivery">Delivery Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <p className="text-sm opacity-80">Instagram • Facebook • TikTok</p>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-white/20 text-center text-sm opacity-80">
            © 2025 Techverse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
