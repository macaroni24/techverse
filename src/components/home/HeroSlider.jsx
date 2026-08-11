import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import h1 from "../../assets/h1.png";
import h2 from "../../assets/h2.png";
import h3 from "../../assets/h3.png";
import h4 from "../../assets/h4.png";

import h1Phone from "../../assets/h1Phone.PNG";
import h2Phone from "../../assets/h2Phone.png";
import h3Phone from "../../assets/h3Phone.png";
import h4Phone from "../../assets/h4Phone.png";

import promo1 from "../../assets/h1.png";
import promo2 from "../../assets/h2.png";
import promo3 from "../../assets/h3.png";
import promo4 from "../../assets/h4.png";
import promo5 from "../../assets/h1.png";
import promo6 from "../../assets/h2.png";

const slides = [
  {
    id: 1,
    image: h1,
    phoneImage: h1Phone,
    to: "/gaming",
  },
  {
    id: 2,
    image: h2,
    phoneImage: h2Phone,
    to: "/laptops-phones",
  },
  {
    id: 3,
    image: h3,
    phoneImage: h3Phone,
    to: "/Accessories",
  },
  {
    id: 4,
    image: h4,
    phoneImage: h4Phone,
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

  const mobileHeroRef = useRef(null);
  const promoRef = useRef(null);

  const heroIndexRef = useRef(0);
  const isHeroTouchingRef = useRef(false);
  const heroScrollEndTimerRef = useRef(null);
  const heroTouchStartXRef = useRef(0);
  const heroWasDraggedRef = useRef(false);

  const getMobileHeroStep = () => {
    const slider = mobileHeroRef.current;

    if (!slider) return 0;

    const firstCard = slider.children[0];

    if (!firstCard) return 0;

    const styles = window.getComputedStyle(slider);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      12;

    return firstCard.getBoundingClientRect().width + gap;
  };

  const goToHero = (targetIndex, behavior = "smooth") => {
    const total = slides.length;

    const safeIndex =
      ((targetIndex % total) + total) % total;

    heroIndexRef.current = safeIndex;
    setIndex(safeIndex);

    if (window.innerWidth >= 768) return;

    const slider = mobileHeroRef.current;

    if (!slider) return;

    const step = getMobileHeroStep();

    if (!step) return;

    slider.scrollTo({
      left: safeIndex * step,
      behavior,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        window.innerWidth < 768 &&
        isHeroTouchingRef.current
      ) {
        return;
      }

      goToHero(heroIndexRef.current + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleMobileHeroScroll = () => {
    if (heroScrollEndTimerRef.current) {
      clearTimeout(heroScrollEndTimerRef.current);
    }

    heroScrollEndTimerRef.current = setTimeout(() => {
      const slider = mobileHeroRef.current;

      if (!slider) return;

      const step = getMobileHeroStep();

      if (!step) return;

      const calculatedIndex = Math.round(
        slider.scrollLeft / step
      );

      const safeIndex = Math.max(
        0,
        Math.min(calculatedIndex, slides.length - 1)
      );

      heroIndexRef.current = safeIndex;
      setIndex(safeIndex);
    }, 120);
  };

  const handleHeroTouchStart = (event) => {
    isHeroTouchingRef.current = true;
    heroWasDraggedRef.current = false;

    heroTouchStartXRef.current =
      event.touches[0].clientX;
  };

  const handleHeroTouchMove = (event) => {
    const currentX = event.touches[0].clientX;

    const difference = Math.abs(
      currentX - heroTouchStartXRef.current
    );

    if (difference > 6) {
      heroWasDraggedRef.current = true;
    }
  };

  const handleHeroTouchEnd = () => {
    setTimeout(() => {
      isHeroTouchingRef.current = false;
    }, 350);

    setTimeout(() => {
      heroWasDraggedRef.current = false;
    }, 400);
  };

  const handleHeroClickCapture = (event) => {
    if (!heroWasDraggedRef.current) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const previousHero = (event) => {
    event.preventDefault();
    event.stopPropagation();

    goToHero(heroIndexRef.current - 1);
  };

  const nextHero = (event) => {
    event.preventDefault();
    event.stopPropagation();

    goToHero(heroIndexRef.current + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) return;

      requestAnimationFrame(() => {
        const slider = mobileHeroRef.current;

        if (!slider) return;

        const step = getMobileHeroStep();

        if (!step) return;

        slider.scrollTo({
          left: heroIndexRef.current * step,
          behavior: "auto",
        });
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth < 1024) return;

      const slider = promoRef.current;

      if (!slider) return;

      const firstCard = slider.children[0];

      if (!firstCard) return;

      const styles =
        window.getComputedStyle(slider);

      const gap =
        parseFloat(styles.columnGap) ||
        parseFloat(styles.gap) ||
        10;

      const step =
        firstCard.getBoundingClientRect().width +
        gap;

      const maxScroll =
        slider.scrollWidth - slider.clientWidth;

      if (
        slider.scrollLeft + step >=
        maxScroll - 8
      ) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        setPromoIndex(0);
        return;
      }

      slider.scrollBy({
        left: step,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handlePromoScroll = () => {
    const slider = promoRef.current;

    if (!slider) return;

    const firstCard = slider.children[0];

    if (!firstCard) return;

    const styles =
      window.getComputedStyle(slider);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      10;

    const step =
      firstCard.getBoundingClientRect().width +
      gap;

    setPromoIndex(
      Math.round(slider.scrollLeft / step)
    );
  };

  const getPromoStyle = (itemIndex) => {
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
  };

  useEffect(() => {
    return () => {
      if (heroScrollEndTimerRef.current) {
        clearTimeout(
          heroScrollEndTimerRef.current
        );
      }
    };
  }, []);

  return (
    <section className="relative w-full min-w-0 bg-[#f5f6f8] md:left-1/2 md:w-[min(1460px,calc(100vw-40px))] md:-translate-x-1/2">
      {/* ========================= */}
      {/* MOBILE HERO */}
      {/* ========================= */}

      <div className="w-full md:hidden">
        <div className="w-full overflow-hidden">
          <div
            ref={mobileHeroRef}
            onScroll={handleMobileHeroScroll}
            onTouchStart={handleHeroTouchStart}
            onTouchMove={handleHeroTouchMove}
            onTouchEnd={handleHeroTouchEnd}
            onTouchCancel={handleHeroTouchEnd}
            onClickCapture={
              handleHeroClickCapture
            }
            className="mobile-hero-carousel flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1"
          >
            {slides.map((slide) => (
              <NavLink
                key={slide.id}
                to={slide.to}
                draggable="false"
                className="group relative block h-[clamp(191px,52.5vw,205px)] w-[88%] shrink-0 snap-start select-none overflow-hidden rounded-[8px] bg-slate-950 outline-none"
                style={{
                  scrollSnapStop: "always",
                }}
              >
                <img
                  src={slide.phoneImage}
                  alt=""
                  draggable="false"
                  className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover object-center"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/[0.07] to-transparent" />
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-1">
          {slides.map(
            (slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                onClick={() =>
                  goToHero(slideIndex)
                }
                aria-label={`Slajdi ${
                  slideIndex + 1
                }`}
                className={`h-[4px] rounded-full transition-all duration-300 ${
                  slideIndex === index
                    ? "w-4 bg-slate-600"
                    : "w-[4px] bg-slate-200"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* TABLET / DESKTOP HERO */}
      {/* ========================= */}

      <div className="relative hidden w-full min-w-0 overflow-hidden rounded-[7px] bg-slate-950 md:block md:h-[245px] lg:h-[275px] xl:h-[340px]">
        {slides.map(
          (slide, slideIndex) => (
            <NavLink
              key={slide.id}
              to={slide.to}
              className={`absolute inset-0 block h-full w-full outline-none transition-all duration-700 ease-out focus:outline-none focus:ring-0 ${
                slideIndex === index
                  ? "pointer-events-auto translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-3 opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt=""
                draggable="false"
                className="absolute inset-0 block h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/[0.07] to-transparent" />
            </NavLink>
          )
        )}

        <button
          type="button"
          onClick={previousHero}
          aria-label="Slajdi paraprak"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-8 -translate-y-1/2 items-center justify-center rounded-[5px] bg-black/20 text-3xl font-light text-white backdrop-blur-[2px] transition-all duration-200 hover:bg-black/40"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={nextHero}
          aria-label="Slajdi tjetër"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-8 -translate-y-1/2 items-center justify-center rounded-[5px] bg-black/20 text-3xl font-light text-white backdrop-blur-[2px] transition-all duration-200 hover:bg-black/40"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {slides.map(
            (slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  goToHero(slideIndex);
                }}
                aria-label={`Slajdi ${
                  slideIndex + 1
                }`}
                className={`h-[5px] rounded-full transition-all duration-300 ${
                  slideIndex === index
                    ? "w-4 bg-white"
                    : "w-[5px] bg-white/50"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* DESKTOP PROMOS */}
      {/* ========================= */}

      <div className="mt-3 hidden w-full overflow-hidden bg-[#f5f6f8] lg:block">
        <div
          ref={promoRef}
          onScroll={handlePromoScroll}
          className="promo-carousel flex w-full snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth"
        >
          {promos.map(
            (promo, promoItemIndex) => (
              <NavLink
                key={promo.id}
                to={promo.to}
                className="group relative block w-[30.5%] shrink-0 snap-start overflow-hidden rounded-[0px] bg-slate-100 outline-none focus:outline-none focus:ring-0 xl:w-[28.7%]"
              >
                <div className="aspect-[3.2/1] w-full overflow-hidden rounded-[16px]">
                  <img
                    src={promo.image}
                    alt={promo.alt}
                    draggable="false"
                    loading="lazy"
                    style={getPromoStyle(
                      promoItemIndex
                    )}
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.012]"
                  />
                </div>
              </NavLink>
            )
          )}
        </div>
      </div>

      <style>
        {`
          .mobile-hero-carousel {
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            touch-action: pan-x pan-y;
            scroll-behavior: smooth;
          }

          .mobile-hero-carousel::-webkit-scrollbar {
            display: none;
          }

          .mobile-hero-carousel img,
          .mobile-hero-carousel a {
            -webkit-user-drag: none;
            user-select: none;
          }

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
          .promo-carousel a:focus-visible,
          .mobile-hero-carousel a,
          .mobile-hero-carousel a:focus,
          .mobile-hero-carousel a:active,
          .mobile-hero-carousel a:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </section>
  );
}