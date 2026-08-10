import {
  useEffect,
  useRef,
  useState,
} from "react";

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

/* =========================================================
   HERO SLIDES
========================================================= */

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

/* =========================================================
   PROMOS
========================================================= */

const promos = [
  {
    id: 1,
    image: promo1,
    to: "/laptops-phones",
    alt:
      "Oferta për laptopë dhe telefona",
  },
  {
    id: 2,
    image: promo2,
    to: "/gaming",
    alt:
      "Oferta gaming",
  },
  {
    id: 3,
    image: promo3,
    to: "/Accessories",
    alt:
      "Oferta për aksesorë",
  },
  {
    id: 4,
    image: promo4,
    to: "/Monitors",
    alt:
      "Oferta për monitorë",
  },
  {
    id: 5,
    image: promo5,
    to: "/shop",
    alt:
      "Oferta speciale",
  },
  {
    id: 6,
    image: promo6,
    to: "/shop",
    alt:
      "Zbritjet më të reja",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function HeroSlider() {
  const [index, setIndex] =
    useState(0);

  const [promoIndex, setPromoIndex] =
    useState(0);

  /* =======================================================
     REFS
  ======================================================= */

  const mobileHeroRef =
    useRef(null);

  const promoRef =
    useRef(null);

  const heroIndexRef =
    useRef(0);

  const isHeroTouchingRef =
    useRef(false);

  const heroScrollEndTimerRef =
    useRef(null);

  const heroTouchStartXRef =
    useRef(0);

  const heroWasDraggedRef =
    useRef(false);

  /* =======================================================
     HERO MOBILE STEP
  ======================================================= */

  function getMobileHeroStep() {
    const slider =
      mobileHeroRef.current;

    if (!slider) return 0;

    const firstCard =
      slider.children[0];

    if (!firstCard) return 0;

    const styles =
      window.getComputedStyle(
        slider
      );

    const gap =
      parseFloat(
        styles.columnGap
      ) ||
      parseFloat(styles.gap) ||
      12;

    return (
      firstCard
        .getBoundingClientRect()
        .width + gap
    );
  }

  /* =======================================================
     GO TO HERO
  ======================================================= */

  function goToHero(
    targetIndex,
    behavior = "smooth"
  ) {
    const total = slides.length;

    const safeIndex =
      ((targetIndex % total) + total) %
      total;

    heroIndexRef.current =
      safeIndex;

    setIndex(safeIndex);

    /*
     * Desktop uses opacity animation.
     * Native horizontal scrolling is only
     * used below md / 768px.
     */
    if (
      window.innerWidth >= 768
    ) {
      return;
    }

    const slider =
      mobileHeroRef.current;

    if (!slider) return;

    const step =
      getMobileHeroStep();

    if (!step) return;

    slider.scrollTo({
      left: safeIndex * step,
      behavior,
    });
  }

  /* =======================================================
     HERO AUTOPLAY
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      /*
       * Do not move while user is
       * touching/swiping the carousel.
       */
      if (
        window.innerWidth < 768 &&
        isHeroTouchingRef.current
      ) {
        return;
      }

      goToHero(
        heroIndexRef.current + 1
      );
    }, 4500);

    return () =>
      clearInterval(timer);
  }, []);

  /* =======================================================
     MOBILE HERO SCROLL
  ======================================================= */

  function handleMobileHeroScroll() {
    if (
      heroScrollEndTimerRef.current
    ) {
      clearTimeout(
        heroScrollEndTimerRef.current
      );
    }

    /*
     * Do not call scrollTo from onScroll.
     *
     * That was what made the slider
     * feel locked.
     *
     * We only update the active index
     * after scrolling has settled.
     */
    heroScrollEndTimerRef.current =
      setTimeout(() => {
        const slider =
          mobileHeroRef.current;

        if (!slider) return;

        const step =
          getMobileHeroStep();

        if (!step) return;

        const calculatedIndex =
          Math.round(
            slider.scrollLeft / step
          );

        const safeIndex =
          Math.max(
            0,
            Math.min(
              calculatedIndex,
              slides.length - 1
            )
          );

        heroIndexRef.current =
          safeIndex;

        setIndex(safeIndex);
      }, 120);
  }

  /* =======================================================
     TOUCH START
  ======================================================= */

  function handleHeroTouchStart(
    event
  ) {
    isHeroTouchingRef.current =
      true;

    heroWasDraggedRef.current =
      false;

    heroTouchStartXRef.current =
      event.touches[0].clientX;
  }

  /* =======================================================
     TOUCH MOVE
  ======================================================= */

  function handleHeroTouchMove(
    event
  ) {
    const currentX =
      event.touches[0].clientX;

    const difference =
      Math.abs(
        currentX -
          heroTouchStartXRef.current
      );

    /*
     * If finger moved horizontally
     * more than 6px, treat it as swipe,
     * not as link click.
     */
    if (difference > 6) {
      heroWasDraggedRef.current =
        true;
    }
  }

  /* =======================================================
     TOUCH END
  ======================================================= */

  function handleHeroTouchEnd() {
    setTimeout(() => {
      isHeroTouchingRef.current =
        false;
    }, 350);

    /*
     * Keep drag status for a moment
     * because the browser fires click
     * immediately after touchend.
     */
    setTimeout(() => {
      heroWasDraggedRef.current =
        false;
    }, 400);
  }

  /* =======================================================
     STOP LINK NAVIGATION AFTER SWIPE
  ======================================================= */

  function handleHeroClickCapture(
    event
  ) {
    if (
      heroWasDraggedRef.current
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /* =======================================================
     DESKTOP HERO ARROWS
  ======================================================= */

  function previousHero(event) {
    event.preventDefault();
    event.stopPropagation();

    goToHero(
      heroIndexRef.current - 1
    );
  }

  function nextHero(event) {
    event.preventDefault();
    event.stopPropagation();

    goToHero(
      heroIndexRef.current + 1
    );
  }

  /* =======================================================
     KEEP MOBILE POSITION AFTER RESIZE
  ======================================================= */

  useEffect(() => {
    function handleResize() {
      if (
        window.innerWidth >= 768
      ) {
        return;
      }

      requestAnimationFrame(() => {
        const slider =
          mobileHeroRef.current;

        if (!slider) return;

        const step =
          getMobileHeroStep();

        if (!step) return;

        slider.scrollTo({
          left:
            heroIndexRef.current *
            step,
          behavior: "auto",
        });
      });
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =======================================================
     PROMO AUTOPLAY - DESKTOP
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        window.innerWidth < 1024
      ) {
        return;
      }

      const slider =
        promoRef.current;

      if (!slider) return;

      const firstCard =
        slider.children[0];

      if (!firstCard) return;

      const styles =
        window.getComputedStyle(
          slider
        );

      const gap =
        parseFloat(
          styles.columnGap
        ) ||
        parseFloat(styles.gap) ||
        10;

      const step =
        firstCard
          .getBoundingClientRect()
          .width + gap;

      const maxScroll =
        slider.scrollWidth -
        slider.clientWidth;

      if (
        slider.scrollLeft +
          step >=
        maxScroll - 8
      ) {
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
      }
    }, 3000);

    return () =>
      clearInterval(timer);
  }, []);

  /* =======================================================
     PROMO SCROLL
  ======================================================= */

  function handlePromoScroll() {
    const slider =
      promoRef.current;

    if (!slider) return;

    const firstCard =
      slider.children[0];

    if (!firstCard) return;

    const styles =
      window.getComputedStyle(
        slider
      );

    const gap =
      parseFloat(
        styles.columnGap
      ) ||
      parseFloat(styles.gap) ||
      10;

    const step =
      firstCard
        .getBoundingClientRect()
        .width + gap;

    setPromoIndex(
      Math.round(
        slider.scrollLeft /
          step
      )
    );
  }

  /* =======================================================
     PROMO VISUAL EFFECT
  ======================================================= */

  function getPromoStyle() {
    return {
      filter: "none",
      opacity: 1,
    };
  }

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        heroScrollEndTimerRef.current
      ) {
        clearTimeout(
          heroScrollEndTimerRef.current
        );
      }
    };
  }, []);

  return (
    <section
      className="
        w-full
        min-w-0
        bg-white
      "
    >

      {/* =================================================
          MOBILE HERO
          CURRENT CARD + NEXT CARD VISIBLE
      ================================================= */}

      <div className="w-full md:hidden">

        <div className="w-full overflow-hidden">

          <div
            ref={mobileHeroRef}

            onScroll={
              handleMobileHeroScroll
            }

            onTouchStart={
              handleHeroTouchStart
            }

            onTouchMove={
              handleHeroTouchMove
            }

            onTouchEnd={
              handleHeroTouchEnd
            }

            onTouchCancel={
              handleHeroTouchEnd
            }

            onClickCapture={
              handleHeroClickCapture
            }

            className="
              mobile-hero-carousel

              flex

              w-full

              snap-x
              snap-mandatory

              gap-3

              overflow-x-auto

              scroll-smooth

              pb-1
            "
          >
            {slides.map(
              (slide) => (
                <NavLink
                  key={slide.id}

                  to={slide.to}

                  draggable="false"

                  className="
                    group
                    relative

                    block

                    h-[205px]

                    w-[88%]

                    shrink-0

                    snap-start

                    select-none

                    overflow-hidden

                    rounded-[8px]

                    bg-slate-950

                    outline-none

                    min-[390px]:h-[220px]
                  "

                  style={{
                    scrollSnapStop:
                      "always",
                  }}
                >

                  {/* IMAGE */}

                  <img
                    src={slide.image}

                    alt=""

                    draggable="false"

                    className="
                      pointer-events-none

                      absolute
                      inset-0

                      block

                      h-full
                      w-full

                      select-none

                      object-cover
                      object-center
                    "
                  />

                  {/* GRADIENT */}

                  <div
                    className="
                      pointer-events-none

                      absolute
                      inset-0

                      bg-gradient-to-t

                      from-black/70
                      via-black/[0.07]
                      to-transparent
                    "
                  />

                  {/* TEXT */}

                  <div
                    className="
                      pointer-events-none

                      absolute

                      bottom-0
                      left-0
                      right-0

                      z-10

                      px-4
                      pb-4
                    "
                  >
                    <p
                      className="
                        max-w-[82%]

                        text-[10.5px]

                        font-semibold

                        leading-[1.45]

                        text-white
                      "
                    >
                      {slide.subtitle}
                    </p>
                  </div>

                </NavLink>
              )
            )}
          </div>

        </div>

        {/* MOBILE DOTS */}

        <div
          className="
            mt-1.5

            flex
            items-center
            justify-center

            gap-1
          "
        >
          {slides.map(
            (
              slide,
              slideIndex
            ) => (
              <button
                key={slide.id}

                type="button"

                onClick={() =>
                  goToHero(
                    slideIndex
                  )
                }

                aria-label={`Slajdi ${
                  slideIndex + 1
                }`}

                className={`
                  h-[4px]

                  rounded-full

                  transition-all
                  duration-300

                  ${
                    slideIndex ===
                    index
                      ? "w-4 bg-slate-600"
                      : "w-[4px] bg-slate-200"
                  }
                `}
              />
            )
          )}
        </div>

      </div>

      {/* =================================================
          TABLET / DESKTOP HERO
      ================================================= */}

      <div
        className="
          relative

          hidden

          w-full
          min-w-0

          overflow-hidden

          rounded-[2px]

          bg-slate-950

          md:block
          md:h-[300px]

          lg:h-[332px]

          xl:h-[356px]
        "
      >
        {slides.map(
          (
            slide,
            slideIndex
          ) => (
            <NavLink
              key={slide.id}

              to={slide.to}

              className={`
                absolute
                inset-0

                block

                h-full
                w-full

                outline-none

                transition-all

                duration-700

                ease-out

                focus:outline-none
                focus:ring-0

                ${
                  slideIndex ===
                  index
                    ? "pointer-events-auto translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-3 opacity-0"
                }
              `}
            >

              {/* IMAGE */}

              <img
                src={slide.image}

                alt=""

                draggable="false"

                className="
                  absolute
                  inset-0

                  block

                  h-full
                  w-full

                  object-cover
                  object-center
                "
              />

              {/* GRADIENT */}

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t

                  from-black/70
                  via-black/[0.07]
                  to-transparent
                "
              />

              {/* TEXT */}

              <div
                className="
                  absolute

                  bottom-0
                  left-0
                  right-0

                  z-10
                "
              >
                <div
                  className="
                    px-6
                    pb-6

                    lg:px-8
                    lg:pb-7
                  "
                >
                  <p
                    className="
                      max-w-[55%]

                      text-sm
                      font-semibold
                      leading-[1.45]

                      text-white

                      lg:max-w-[50%]
                    "
                  >
                    {slide.subtitle}
                  </p>
                </div>
              </div>

            </NavLink>
          )
        )}

        {/* LEFT */}

        <button
          type="button"

          onClick={
            previousHero
          }

          aria-label="Slajdi paraprak"

          className="
            absolute

            left-3
            top-1/2

            z-20

            flex

            h-10
            w-8

            -translate-y-1/2

            items-center
            justify-center

            rounded-[2px]

            bg-black/20

            text-3xl
            font-light
            text-white

            backdrop-blur-[2px]

            transition-all

            duration-200

            hover:bg-black/40
          "
        >
          ‹
        </button>

        {/* RIGHT */}

        <button
          type="button"

          onClick={
            nextHero
          }

          aria-label="Slajdi tjetër"

          className="
            absolute

            right-3
            top-1/2

            z-20

            flex

            h-10
            w-8

            -translate-y-1/2

            items-center
            justify-center

            rounded-[2px]

            bg-black/20

            text-3xl
            font-light
            text-white

            backdrop-blur-[2px]

            transition-all

            duration-200

            hover:bg-black/40
          "
        >
          ›
        </button>

        {/* DOTS */}

        <div
          className="
            absolute

            bottom-3
            left-1/2

            z-20

            flex

            -translate-x-1/2

            items-center

            gap-1.5
          "
        >
          {slides.map(
            (
              slide,
              slideIndex
            ) => (
              <button
                key={slide.id}

                type="button"

                onClick={(
                  event
                ) => {
                  event.preventDefault();
                  event.stopPropagation();

                  goToHero(
                    slideIndex
                  );
                }}

                aria-label={`Slajdi ${
                  slideIndex + 1
                }`}

                className={`
                  h-[5px]

                  rounded-full

                  transition-all

                  duration-300

                  ${
                    slideIndex ===
                    index
                      ? "w-4 bg-white"
                      : "w-[5px] bg-white/50"
                  }
                `}
              />
            )
          )}
        </div>

      </div>

      {/* =================================================
          PROMOS
          LAPTOP / DESKTOP ONLY
      ================================================= */}

      <div
        className="
          mt-3

          hidden

          w-full

          overflow-hidden

          bg-white

          lg:block
        "
      >
        <div
          ref={promoRef}

          onScroll={
            handlePromoScroll
          }

          className="
            promo-carousel

            flex

            w-full

            snap-x
            snap-mandatory

            gap-2.5

            overflow-x-auto

            scroll-smooth
          "
        >
          {promos.map(
            (
              promo,
              promoItemIndex
            ) => (
              <NavLink
                key={promo.id}

                to={promo.to}

                className="
                  group
                  relative

                  block

                  w-[30.5%]

                  shrink-0

                  snap-start

                  overflow-hidden

                  rounded-[2px]

                  bg-slate-100

                  outline-none

                  focus:outline-none
                  focus:ring-0

                  xl:w-[28.7%]
                "
              >
                <div
                  className="
                    aspect-[3.2/1]

                    w-full

                    overflow-hidden

                    rounded-[2px]
                  "
                >
                  <img
                    src={
                      promo.image
                    }

                    alt={
                      promo.alt
                    }

                    draggable="false"

                    loading="lazy"

                    style={getPromoStyle(
                      promoItemIndex
                    )}

                    className="
                      h-full
                      w-full

                      object-cover

                      transition-all

                      duration-700

                      ease-out

                      group-hover:scale-[1.012]
                    "
                  />
                </div>
              </NavLink>
            )
          )}
        </div>
      </div>

      {/* =================================================
          CSS
      ================================================= */}

      <style>
        {`
          /*
           * MOBILE HERO
           */

          .mobile-hero-carousel {
            scrollbar-width: none;
            -ms-overflow-style: none;

            -webkit-overflow-scrolling: touch;

            overscroll-behavior-x: contain;

            touch-action: auto;

            scroll-behavior: smooth;
          }

          .mobile-hero-carousel::-webkit-scrollbar {
            display: none;
          }

          /*
           * Prevent browser image/link dragging from
           * competing with carousel swiping.
           */

          .mobile-hero-carousel img,
          .mobile-hero-carousel a {
            -webkit-user-drag: none;
            user-select: none;
          }

          /*
           * DESKTOP PROMOS
           */

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