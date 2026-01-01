import { Link } from "react-router-dom";
import { Search, Menu, User, ShoppingBag, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

const products = Array.from({ length: 10 });

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: "Kompiuter, Laptop & Monitor", icon: "🖥️" },
    { name: "Celular, Tablet & Navigim", icon: "📱" },
    { name: "TV, Audio & Foto", icon: "📺" },
    { name: "Gaming", icon: "🎮" },
    { name: "SMART", icon: "🏠" },
    { name: "Aksesorë", icon: "🔌" },
    { name: "Pjesë për kompjuter", icon: "💻" },
  ];

  const slides = [
    "https://static.tweaktown.com/news/4x3/100344_acers-project-dualplay-gaming-laptop-has-hidden-controller-under-the-trackpad.jpg",
    "https://images.ctfassets.net/16nm6vz43ids/ym2NwtECWCYL3JGOCVv3r/a7cf06b969e456efcf39a8eddb6f9337/Best_time_to_buy_a_new_computer.jpg?fm=webp&q=65",
    "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-plus/db16250/notebook-db16250nt-copilot-pc-mg.png?fmt=pjpg&pscan=auto&scl=1&wid=2048&hei=1397&qlt=100,1&resMode=sharp2&size=2048,1397&chrss=full&imwidth=5000",
    "https://60a99bedadae98078522-a9b6cded92292ef3bace063619038eb1.ssl.cf2.rackcdn.com/images_images_razer-blade-16%20dan.jpg",
    "https://media.wired.com/photos/684cee1bfa9dc2887ce54979/4:3/w_1064,h_798,c_limit/How%20to%20Buy%20A%20Laptop.png",
    "https://us.v-cdn.net/6031942/uploads/KBLFU5KXWB72/image.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Top Bar */}
<div className="bg-white border-b border-gray-200 mb-6">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-sm">
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="lg:hidden flex items-center gap-2 text-orange-600 font-medium"
    >
      {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      Kategoritë
    </button>

    <div className="hidden lg:flex items-center gap-8 text-gray-700">
      <Link to="/categories" className="hover:text-orange-600 font-medium">Kategoritë</Link>
      <Link to="/outlet" className="hover:text-orange-600">Outlet</Link>
      <Link to="/cfare-ka-te-re" className="hover:text-orange-600">Çfarë ka të re?</Link>
    </div>

    <button className="flex items-center gap-2 text-orange-600">
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
      </div>
      Chat
    </button>
  </div>
</div>
   {/* Hero Search Bar (moved below carousel for better flow) */}
            <div className="max-w-3xl mx-auto -mt-20 relative z-10">
              <div className="flex bg-white shadow-xl rounded-lg overflow-hidden">
                <input
                  className="flex-1 px-6 py-5 text-lg text-gray-800 outline-none"
                  placeholder="Search for products..."
                />
                <button className="bg-orange-500 px-10 hover:bg-orange-600 transition">
                  <Search className="text-white" size={28} />
                </button>
              </div>
            </div>
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Left Sidebar - Categories */}
          <aside className={`${mobileMenuOpen ? "fixed inset-0 z-50 bg-white overflow-y-auto" : "hidden"} lg:block lg:relative w-64`}>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/category/${cat.name.toLowerCase().replace(/,/g, '').replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-orange-50 transition border-b border-gray-100 last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-gray-800">{cat.name}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="flex-1 space-y-12">
            {/* Auto-Rotating Carousel */}
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <div className="relative h-96 md:h-[500px]">
                {slides.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Tech promotion ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">Tech Deals of the Day</h2>
                  <p className="text-xl">Up to 50% off on top brands!</p>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

         

            {/* ROW ABOVE OFERTA */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {products.slice(0, 5).map((_, i) => (
                  <div key={i} className="bg-white border p-4 hover:shadow-lg transition rounded-lg">
                    <div className="bg-gray-200 h-40 mb-3 rounded" />
                    <p className="text-sm font-medium text-[#0A3D38]">Tech Product {i + 1}</p>
                    <p className="font-bold mt-1">€{(299 - i * 20).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Oferta Speciale */}
            <section className="bg-gray-50 rounded-lg py-8 px-6">
              <h2 className="text-2xl font-bold text-[#0A3D38] mb-6">Oferta Speciale</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Big card */}
                <div className="bg-white border p-6 rounded-lg">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 inline-block mb-2">-50%</span>
                  <div className="bg-gray-200 h-64 mb-4 rounded" />
                  <p className="font-semibold text-[#0A3D38]">Gaming Chair SENSE7</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-2xl font-bold">€129.50</span>
                    <span className="line-through text-gray-400">€259.50</span>
                  </div>
                  <button className="mt-4 w-full border border-[#0A3D38] py-2 font-semibold hover:bg-[#0A3D38] hover:text-white transition rounded">
                    SHTO NË SHPORTË
                  </button>
                </div>

                {/* Right list */}
                <div className="md:col-span-2 bg-white border divide-y rounded-lg">
                  {["MacBook Pro M4", "Galaxy S25 Ultra", "Dell XPS 15", "LG UltraWide", "PS5 Pro"].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 hover:bg-gray-50">
                      <div className="bg-gray-200 w-16 h-16 rounded" />
                      <div>
                        <p className="text-sm font-medium text-[#0A3D38]">{item}</p>
                        <p className="font-bold">€{(999 - i * 90).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TWO ROWS BELOW OFERTA */}
            <section className="space-y-8">
              {[0, 5].map(start => (
                <div key={start} className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {products.slice(start, start + 5).map((_, i) => (
                    <div key={i} className="bg-white border p-4 hover:shadow-lg transition rounded-lg">
                      <div className="bg-gray-200 h-40 mb-3 rounded" />
                      <p className="text-sm font-medium text-[#0A3D38]">Tech Product {start + i + 1}</p>
                      <p className="font-bold mt-1">€{(349 - i * 30).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm text-gray-700">
            <div><div className="text-3xl mb-2">🚚</div><p className="font-medium">Dërgesa të shpejta</p><p className="text-gray-500">Kudo në Kosovë</p></div>
            <div><div className="text-3xl mb-2">🛍️</div><p className="font-medium">Mbi 100,000 produkte</p><p className="text-gray-500">Originale dhe me garancion</p></div>
            <div><div className="text-3xl mb-2">🎧</div><p className="font-medium">Kujdesi ndaj klientit</p><p className="text-gray-500">Prano përgjigje brenda sekondave</p></div>
            <div><div className="text-3xl mb-2">❤️</div><p className="font-medium">Çmimi më i mirë i garantuar</p><p className="text-gray-500">Në çdo produkt</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}