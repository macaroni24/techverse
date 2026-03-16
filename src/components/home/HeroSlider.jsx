import { useEffect, useState } from "react";
import h1 from "../../assets/h1.jpeg";
import h2 from "../../assets/h2.jpg";
import h3 from "../../assets/h3.png";

const slides = [
  {
    id: 1,
    image: h1,
    title: "Make Your Good Time worth it",
    subtitle: "High performance parts & setups",
  },
  {
    id: 2,
    image: h2,
    title: "Latest Phones & Tech",
    subtitle: "Apple, Samsung, Xiaomi & more",
  },
  {
    id: 3,
    image: h3,
    title: "Accessories That Matter",
    subtitle: "Keyboards, mice, monitors & gear",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative h-[220px] sm:h-[320px] lg:h-[420px] overflow-hidden rounded-3xl">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              i === index
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-10 text-white">
              <h2 className="text-xl sm:text-3xl font-bold">
                {slide.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-white/90">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? "bg-orange-500" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}