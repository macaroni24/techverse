import { Link } from "react-router-dom";
import { Search, Menu, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";

const products = Array.from({ length: 10 });

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    { name: "Kompiuter, Laptop & Monitor", sub: ["Laptops", "Desktops", "Monitors", "All-in-One", "Accessories"] },
    { name: "Celular, Tablet & Navigim", sub: ["Smartphones", "Tablets", "Smart Watches", "GPS Navigation", "Cases"] },
    { name: "TV, Audio & Foto", sub: ["Televisions", "Soundbars", "Headphones", "Cameras", "Speakers"] },
    { name: "Gaming", sub: ["Consoles", "Games", "Controllers", "Gaming Laptops", "Accessories"] },
    { name: "SMART", sub: ["Smart Home", "Lights", "Cameras", "Thermostats", "Plugs"] },
    { name: "Aksesorë", sub: ["Cables", "Chargers", "Bags", "Stands", "Keyboards"] },
    { name: "Pjesë për kompjuter", sub: ["CPU", "GPU", "RAM", "Storage", "Motherboards"] },
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
          {/* Mobile Burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center gap-2 text-orange-600 font-medium"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            Kategoritë
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-gray-700">
            <Link to="/categories" className="hover:text-orange-600 font-medium">Kategoritë</Link>
            <Link to="/outlet" className="hover:text-orange-600">Outlet</Link>
            <Link to="/cfare-ka-te-re" className="hover:text-orange-600">Çfarë ka të re?</Link>
          </div>
        </div>
      </div>

      {/* Horizontal Categories Bar */}
      <div className="bg-[#0A3D38] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Mega Dropdown */}
          <nav className="hidden lg:flex items-center justify-center gap-10 py-4 relative">
            {categories.map((cat, index) => (
              <div
                key={cat.name}
                className="relative"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="flex items-center gap-2 text-sm font-medium hover:text-orange-400 transition">
                  {cat.name}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${hoveredCategory === index ? "rotate-180" : ""}`}
                  />
                </button>

                {hoveredCategory === index && (
                  <div className="absolute top-full left-0 mt-2 w-max min-w-[250px] max-w-[600px] bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-[#0A3D38] mb-4">{cat.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {cat.sub.map((subItem) => (
                          <div key={subItem} className="space-y-2">
                            <Link
                              to={`/category/${subItem.toLowerCase().replace(/ /g, '-')}`}
                              className="block font-medium hover:text-orange-600 transition flex items-center gap-2"
                            >
                              <span className="text-gray-500">▶</span>
                              {subItem}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Accordion */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/10">
              {categories.map((cat) => (
                <details key={cat.name} className="border-b border-white/10 last:border-0 group">
                  <summary className="py-4 flex justify-between items-center cursor-pointer font-medium">
                    {cat.name}
                    <ChevronDown 
                      size={18} 
                      className="transition-transform group-open:rotate-180" 
                    />
                  </summary>
                  <div className="pl-4 py-2 space-y-2 max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-open:max-h-96">
                    {cat.sub.map((subItem) => (
                      <Link
                        key={subItem}
                        to={`/category/${subItem.toLowerCase().replace(/ /g, '-')}`}
                        className="block py-2 hover:text-orange-400 transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Carousel */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-12">
          <div className="relative h-96 md:h-[600px]">
            {slides.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Tech promotion ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Tech Deals of the Day</h2>
              <p className="text-2xl">Up to 50% off on top brands!</p>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto -mt-20 relative z-10 mb-12">
          <div className="flex bg-white shadow-2xl rounded-lg overflow-hidden">
            <input
              className="flex-1 px-6 py-5 text-lg text-gray-800 outline-none"
              placeholder="Search for products..."
            />
            <button className="bg-orange-500 px-12 hover:bg-orange-600 transition">
              <Search className="text-white" size={28} />
            </button>
          </div>
        </div>

        {/* Product Rows */}
        <section className="mb-12">
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
        <section className="bg-gray-50 rounded-lg py-12 px-8 mb-12">
          <h2 className="text-3xl font-bold text-[#0A3D38] mb-8 text-center">Oferta Speciale</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border p-6 rounded-lg">
              <span className="bg-orange-500 text-white text-xs px-3 py-1 inline-block mb-3">-50%</span>
              <div className="bg-gray-200 h-64 mb-4 rounded" />
              <p className="font-semibold text-[#0A3D38]">Gaming Chair SENSE7</p>
              <div className="flex gap-3 mt-3">
                <span className="text-3xl font-bold">€129.50</span>
                <span className="line-through text-gray-400 mt-2">€259.50</span>
              </div>
              <button className="mt-6 w-full border-2 border-[#0A3D38] py-3 font-bold hover:bg-[#0A3D38] hover:text-white transition rounded">
                SHTO NË SHPORTË
              </button>
            </div>
            <div className="md:col-span-2 bg-white border divide-y rounded-lg">
              {["MacBook Pro M4", "Galaxy S25 Ultra", "Dell XPS 15", "LG UltraWide", "PS5 Pro"].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 hover:bg-gray-50">
                  <div className="bg-gray-200 w-20 h-20 rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-[#0A3D38]">{item}</p>
                    <p className="text-2xl font-bold mt-1">€{(999 - i * 90).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two More Product Rows */}
        <section className="space-y-12">
          {[0, 5].map((start) => (
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

      {/* Trust Badges */}
      <div className="bg-gray-50 border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-gray-700">
            <div>
              <div className="text-5xl mb-3">🚚</div>
              <p className="font-bold">Dërgesa të shpejta</p>
              <p className="text-sm">Kudo në Kosovë</p>
            </div>
            <div>
              <div className="text-5xl mb-3">🛍️</div>
              <p className="font-bold">Mbi 100,000 produkte</p>
              <p className="text-sm">Originale dhe me garancion</p>
            </div>
            <div>
              <div className="text-5xl mb-3">🎧</div>
              <p className="font-bold">Kujdesi ndaj klientit</p>
              <p className="text-sm">Prano përgjigje brenda sekondave</p>
            </div>
            <div>
              <div className="text-5xl mb-3">❤️</div>
              <p className="font-bold">Çmimi më i mirë i garantuar</p>
              <p className="text-sm">Në çdo produkt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

