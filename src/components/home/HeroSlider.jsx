import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import h1 from "../../assets/h1.jpeg";
import h2 from "../../assets/h2.jpg";
import h3 from "../../assets/h3.png";

const slides = [
  {
    id: 1,
    image: h1,
    title: "Fuqizo setup-in tënd me teknologjinë e fundit",
    subtitle:
      "Gaming PC, laptopë, komponentë dhe pajisje premium për performancë maksimale.",
    primaryCta: "Bli Gaming",
    primaryTo: "/gaming",
    secondaryCta: "Shiko të gjitha",
    secondaryTo: "/shop",
  },
  {
    id: 2,
    image: h2,
    title: "Telefonat dhe teknologjia më e re",
    subtitle:
      "Apple, Samsung, Xiaomi dhe më shumë — zbulo pajisjet më të reja në një vend.",
    primaryCta: "Bli Telefona",
    primaryTo: "/laptops-phones",
    secondaryCta: "Shiko ofertat",
    secondaryTo: "/shop",
  },
  {
    id: 3,
    image: h3,
    title: "Aksesorë që e kompletojnë setup-in tënd",
    subtitle:
      "Tastiera, mouse, kufje, monitorë dhe pajisje që bëjnë diferencën çdo ditë.",
    primaryCta: "Bli Aksesorë",
    primaryTo: "/Accessories",
    secondaryCta: "Shiko të gjitha",
    secondaryTo: "/shop",
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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-0">
        <div className="grid grid-cols-1 gap-0 lg:gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
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

          <div className="relative overflow-hidden border-y border-slate-200 bg-black sm:rounded-md sm:border">
            <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] xl:h-[400px]">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={cx(
                    "absolute inset-0 transition-all duration-700 ease-out",
                    i === index
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-8 opacity-0"
                  )}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/25" />
                  <div className="absolute inset-0 bg-emerald-950/20" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full px-4 sm:px-8 lg:px-10">
                      <div className="max-w-[520px]">
                        <div className="mb-3 inline-flex rounded-md border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300 sm:text-xs">
                          Dyqan Premium i Teknologjisë
                        </div>

                        <h1 className="text-2xl font-extrabold leading-[1.05] text-white sm:text-4xl lg:text-5xl">
                          {slide.title}
                        </h1>

                        <p className="mt-3 max-w-[500px] text-sm leading-6 text-white/85 sm:text-base">
                          {slide.subtitle}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                          <NavLink
                            to={slide.primaryTo}
                            className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 sm:px-5"
                          >
                            {slide.primaryCta}
                          </NavLink>

                          <NavLink
                            to={slide.secondaryTo}
                            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15 sm:px-5"
                          >
                            {slide.secondaryCta}
                          </NavLink>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80 sm:text-sm">
                          <span>✓ Dërgesë falas mbi €100</span>
                          <span>✓ Mbështetje 24/7</span>
                          <span>✓ Garanci e përfshirë</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-md bg-black/30 px-3 py-2 backdrop-blur-sm">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Shko te slajdi ${i + 1}`}
                    className={cx(
                      "h-2.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-emerald-400" : "w-2.5 bg-white/50"
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