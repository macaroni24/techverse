import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import h1 from "../../assets/h1.png";
import h2 from "../../assets/h2.jpg";
import h3 from "../../assets/h3.png";

import promo1 from "../../assets/h1.png";
import promo2 from "../../assets/h2.jpg";
import promo3 from "../../assets/h3.png";
import promo4 from "../../assets/h1.jpeg";
import promo5 from "../../assets/h1.png";
import promo6 from "../../assets/h2.jpg";

const slides = [
  {
    id: 1,
    image: h1,
    subtitle:
      "Gaming PC, laptopë, komponentë dhe pajisje premium për performancë maksimale.",
    to: "/gaming",
  },
  {
    id: 2,
    image: h2,
    subtitle:
      "Apple, Samsung, Xiaomi dhe më shumë — zbulo pajisjet më të reja në një vend.",
    to: "/laptops-phones",
  },
  {
    id: 3,
    image: h3,
    subtitle:
      "Tastiera, mouse, kufje, monitorë dhe pajisje që bëjnë diferencën çdo ditë.",
    to: "/Accessories",
  },
];

const promos = [
  {
    id: 1,
    image: promo1,
    to: "/laptops-phones",
    alt: "Oferta për laptopë dhe telefona",
  },
  {
    id: 2,
    image: promo2,
    to: "/gaming",
    alt: "Oferta gaming",
  },
  {
    id: 3,
    image: promo3,
    to: "/Accessories",
    alt: "Oferta për aksesorë",
  },
  {
    id: 4,
    image: promo4,
    to: "/Monitors",
    alt: "Oferta për monitorë",
  },
  {
    id: 5,
    image: promo5,
    to: "/shop",
    alt: "Oferta speciale",
  },
  {
    id: 6,
    image: promo6,
    to: "/shop",
    alt: "Zbritjet më të reja",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);

  const promoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const slider = promoRef.current;

      if (!slider) return;

      const firstCard = slider.children[0];

      if (!firstCard) return;

      const styles = window.getComputedStyle(slider);

      const gap =
        parseFloat(styles.columnGap) ||
        parseFloat(styles.gap) ||
        10;

      const step =
        firstCard.getBoundingClientRect().width + gap;

      const maxScroll =
        slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft + step >= maxScroll - 8) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        setPromoIndex(0);
      } else {
        slider.scrollBy({
          left: step,
          behavior: "smooth",
        });

        setPromoIndex((current) => current + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [promoIndex]);

  function previousHero(event) {
    event.preventDefault();
    event.stopPropagation();

    setIndex(
      (current) =>
        (current - 1 + slides.length) % slides.length
    );
  }

  function nextHero(event) {
    event.preventDefault();
    event.stopPropagation();

    setIndex((current) => (current + 1) % slides.length);
  }

  function handlePromoScroll() {
    const slider = promoRef.current;

    if (!slider) return;

    const firstCard = slider.children[0];

    if (!firstCard) return;

    const styles = window.getComputedStyle(slider);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      10;

    const step =
      firstCard.getBoundingClientRect().width + gap;

    setPromoIndex(
      Math.round(slider.scrollLeft / step)
    );
  }

  function getPromoStyle(itemIndex) {
    const relative = itemIndex - promoIndex;

    if (relative <= 0) {
      return {
        filter: "blur(0px)",
        opacity: 1,
      };
    }

    if (relative === 1) {
      return {
        filter: "blur(0.15px)",
        opacity: 0.98,
      };
    }

    if (relative === 2) {
      return {
        filter: "blur(0.35px)",
        opacity: 0.94,
      };
    }

    return {
      filter: "blur(0.7px)",
      opacity: 0.87,
    };
  }

  return (
    <section className="min-w-0 w-full bg-white">
      <div className="relative w-full overflow-hidden rounded-[7px] bg-slate-950 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
        <div className="relative h-[175px] w-full sm:h-[205px] md:h-[235px] lg:h-[260px] xl:h-[280px]">
          {slides.map((slide, slideIndex) => (
            <NavLink
              key={slide.id}
              to={slide.to}
              className={`absolute inset-0 block outline-none transition-all duration-700 ease-out focus:outline-none focus:ring-0 ${
                slideIndex === index
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-4 opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.subtitle}
                draggable="false"
                className="h-full w-full object-cover object-center transition-transform duration-[1000ms] ease-out hover:scale-[1.005]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/[0.08] to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="px-5 pb-4 sm:px-7 lg:px-8">
                  <p className="max-w-[90%] text-xs font-semibold leading-5 text-white sm:max-w-[70%] sm:text-sm lg:max-w-[55%]">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={previousHero}
            className="absolute left-3 top-1/2 z-20 flex h-9 w-7 -translate-y-1/2 items-center justify-center rounded-[5px] bg-black/20 text-3xl font-light text-white backdrop-blur-[2px] transition-all duration-200 hover:bg-black/35"
            aria-label="Slajdi paraprak"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={nextHero}
            className="absolute right-3 top-1/2 z-20 flex h-9 w-7 -translate-y-1/2 items-center justify-center rounded-[5px] bg-black/20 text-3xl font-light text-white backdrop-blur-[2px] transition-all duration-200 hover:bg-black/35"
            aria-label="Slajdi tjetër"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-hidden bg-white">
        <div
          ref={promoRef}
          onScroll={handlePromoScroll}
          className="promo-carousel flex w-full snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth"
        >
          {promos.map((promo, promoItemIndex) => (
            <NavLink
              key={promo.id}
              to={promo.to}
              className="group relative block w-[86%] shrink-0 snap-start overflow-hidden rounded-[7px] bg-slate-100 outline-none focus:outline-none focus:ring-0 sm:w-[47%] md:w-[37%] lg:w-[30.5%] xl:w-[28.7%]"
            >
              <div className="aspect-[3.2/1] w-full overflow-hidden rounded-[7px]">
                <img
                  src={promo.image}
                  alt={promo.alt}
                  draggable="false"
                  loading="lazy"
                  style={getPromoStyle(promoItemIndex)}
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.012]"
                />
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      <style>
        {`
          .promo-carousel {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .promo-carousel::-webkit-scrollbar {
            display: none;
          }

          .promo-carousel a,
          .promo-carousel a:focus,
          .promo-carousel a:active,
          .promo-carousel a:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </section>
  );
}