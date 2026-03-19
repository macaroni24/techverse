import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import h1 from "../../assets/h1.jpeg";
import h2 from "../../assets/h2.jpg";
import h3 from "../../assets/h3.png";

const slides = [
  {
    id: 1,
    image: h1,
    subtitle: "Gaming PC, laptopë, komponentë dhe pajisje premium për performancë maksimale.",
    to: "/gaming",
  },
  {
    id: 2,
    image: h2,
    subtitle: "Apple, Samsung, Xiaomi dhe më shumë — zbulo pajisjet më të reja në një vend.",
    to: "/laptops-phones",
  },
  {
    id: 3,
    image: h3,
    subtitle: "Tastiera, mouse, kufje, monitorë dhe pajisje që bëjnë diferencën çdo ditë.",
    to: "/Accessories",
  },
];

const sideCategories = [
  { label: "Gaming", to: "/gaming" },
  { label: "Laptopë & Telefona", to: "/laptops-phones" },
  { label: "Aksesorë", to: "/Accessories" },
  { label: "Monitorë", to: "/Monitors" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white mt-0 pt-0">
      <div className="mx-auto max-w-7xl px-0 mt-0 pt-0">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-3">
          <aside className="hidden lg:block">
            <div className="h-full rounded-md border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                  Kategoritë
                </h2>
              </div>

              <nav className="flex flex-col py-2">
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    cx(
                      "flex items-center justify-between px-5 py-4 text-sm font-semibold transition",
                      isActive
                        ? "bg-emerald-50 text-emerald-900"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )
                  }
                >
                  <span>Dyqani</span>
                  <span className="text-slate-400">→</span>
                </NavLink>

                {sideCategories.map((category) => (
                  <NavLink
                    key={category.to}
                    to={category.to}
                    className={({ isActive }) =>
                      cx(
                        "flex items-center justify-between px-5 py-4 text-sm font-medium transition",
                        isActive
                          ? "bg-emerald-50 text-emerald-900"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      )
                    }
                  >
                    <span>{category.label}</span>
                    <span className="text-slate-400">→</span>
                  </NavLink>
                ))}
              </nav>

              <div className="border-t border-slate-200 px-5 py-4">
                <div className="space-y-2 text-sm text-slate-600">
                  <p>✓ Dërgesë falas mbi €100</p>
                  <p>✓ Mbështetje 24/7</p>
                  <p>✓ Garanci e përfshirë</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="px-3 pt-0 mt-0 sm:px-0">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-black sm:rounded-md">
              <div className="relative h-[210px] sm:h-[300px] lg:h-[380px] xl:h-[400px]">
                {slides.map((slide, i) => (
                  <NavLink
                    key={slide.id}
                    to={slide.to}
                    className={cx(
                      "absolute inset-0 block transition-all duration-700 ease-out",
                      i === index
                        ? "translate-x-0 opacity-100"
                        : "pointer-events-none translate-x-8 opacity-0"
                    )}
                  >
                    <img
                      src={slide.image}
                      alt={slide.subtitle}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-emerald-950/10" />

                    <div className="absolute bottom-0 left-0 right-0 z-10">
                      <div className="px-4 pb-4 sm:px-6 sm:pb-5 lg:px-8 lg:pb-6">
                        <p className="max-w-[92%] text-[12px] font-medium leading-5 text-white/90 sm:max-w-[75%] sm:text-sm lg:max-w-[60%] lg:text-base">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-3">
              <div className="flex gap-2 rounded-full bg-slate-100 px-3 py-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Shko te slajdi ${i + 1}`}
                    className={cx(
                      "h-2 rounded-full transition-all duration-300 sm:h-2.5",
                      i === index ? "w-5 bg-emerald-500 sm:w-6" : "w-2 bg-slate-300 sm:w-2.5"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}