import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=2000",
    title: "Make Your Good Time worth it",
    subtitle: "High performance parts & setups",
  },
  {
    id: 2,
    image:
      "https://article.images.consumerreports.org/image/upload/w_652,f_auto,q_auto,ar_16:9,c_lfill/v1757514488/prod/content/dam/CRO-Images-2025/Electronics/CR-Electronics-InlineHero-Best-Portable-Chargers-0925",
    title: "Latest Phones & Tech",
    subtitle: "Apple, Samsung, Xiaomi & more",
  },
  {
    id: 3,
    image:
      "https://cdn.create.vista.com/api/media/medium/223900254/stock-photo-close-shot-modern-workplace-various-devices-wooden-desk?token=",
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

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text */}
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

      {/* Dots */}
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
