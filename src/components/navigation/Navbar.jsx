import { NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useStore } from "../../store/StoreProvider";
import { products } from "../../data/products";
import logo from "../../assets/logo.png";
import CategoriesMenu from "../shop/CategoriesMenu";

const categories = [
  { label: "Gaming", to: "/gaming" },
  { label: "Laptopë & Telefona", to: "/laptops-phones" },
  { label: "Aksesorë", to: "/Accessories" },
  { label: "Monitorë", to: "/Monitors" },
];

const megaMenuCategories = [
  {
    title: "Gaming",
    to: "/gaming",
    items: [
      { label: "PlayStation", query: "PlayStation" },
      { label: "Gaming PC", query: "Gaming PC" },
      { label: "Gaming Mouse", query: "Gaming Mouse" },
      { label: "Gaming Tastiera", query: "Keyboard" },
      { label: "Gaming Kufje", query: "Headset" },
      { label: "Controllers", query: "Controller" },
      {
        label: "Kartela Grafike RTX",
        query: "NVIDIA GeForce",
      },
      {
        label: "SSD & Storage",
        query: "NVMe SSD",
      },
    ],
  },

  {
    title: "Laptopë & Telefona",
    to: "/laptops-phones",
    items: [
      { label: "iPhone", query: "iPhone" },
      {
        label: "Samsung Galaxy",
        query: "Samsung Galaxy S24",
      },
      { label: "Xiaomi", query: "Xiaomi" },
      {
        label: "Google Pixel",
        query: "Google Pixel",
      },
      { label: "OnePlus", query: "OnePlus" },
      {
        label: "Gaming Laptopë",
        query: "Gaming Laptop",
      },
      { label: "MacBook", query: "MacBook" },
      { label: "Laptopë", query: "Laptop" },
    ],
  },

  {
    title: "Aksesorë",
    to: "/Accessories",
    items: [
      { label: "Mouse", query: "Mouse" },
      { label: "Tastiera", query: "Keyboard" },
      { label: "Kufje", query: "Headset" },
      { label: "AirPods", query: "AirPods" },
      {
        label: "Smartwatch",
        query: "Galaxy Watch",
      },
      { label: "Karikues", query: "Charger" },
      {
        label: "Power Bank",
        query: "Power Bank",
      },
      {
        label: "Wireless Accessories",
        query: "Wireless",
      },
    ],
  },

  {
    title: "Monitorë",
    to: "/Monitors",
    items: [
      {
        label: "Gaming 165Hz",
        query: "165Hz",
      },
      {
        label: "Gaming 144Hz",
        query: "144Hz",
      },
      {
        label: "Monitorë 4K",
        query: "4K Monitor",
      },
      {
        label: "UltraWide",
        query: "UltraWide Monitor",
      },
      {
        label: "eSports 240Hz",
        query: "240Hz",
      },
      {
        label: "27-inch Gaming",
        query: '27" Gaming Monitor',
      },
      {
        label: "32-inch 4K",
        query: '32" 4K Monitor',
      },
      {
        label: "49-inch UltraWide",
        query: '49" Super UltraWide',
      },
    ],
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatPriceEUR(v) {
  const n = Number(v || 0);
  return `€${n.toFixed(2)}`;
}

function shopSearchPath(query) {
  return `/shop?q=${encodeURIComponent(query)}`;
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/*
  Better / cleaner heart shape.
*/
function HeartIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L4.22 13.45 12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.5 6h15l-1.5 9h-12L6.5 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M6.5 6 5.7 3.8A2 2 0 0 0 3.8 2.5H2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function MenuIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20v-9.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M9.5 21V14h5v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M4.5 21a7.5 7.5 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
  } = useStore();

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    suggestOpen,
    setSuggestOpen,
  ] = useState(false);

  const [
    mobileCatsOpen,
    setMobileCatsOpen,
  ] = useState(false);

  const [
    desktopCatsOpen,
    setDesktopCatsOpen,
  ] = useState(false);

  const navigate =
    useNavigate();

  const canSearch =
    useMemo(
      () =>
        query.trim().length >
        0,
      [query]
    );

  const suggestions =
    useMemo(() => {
      const q =
        query
          .trim()
          .toLowerCase();

      if (!q) {
        return [];
      }

      return products
        .filter((p) =>
          `${p.title} ${p.brand} ${p.category} ${p.section}`
            .toLowerCase()
            .includes(q)
        )
        .slice(0, 6);
    }, [query]);

  /*
    Click outside search.
  */
  useEffect(() => {
    function onDown(e) {
      const inside =
        e.target.closest?.(
          '[data-searchbox="true"]'
        );

      if (!inside) {
        setSuggestOpen(
          false
        );
      }
    }

    document.addEventListener(
      "mousedown",
      onDown
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        onDown
      );
  }, []);

  /*
    Escape closes menus.
  */
  useEffect(() => {
    function onKey(e) {
      if (
        e.key ===
        "Escape"
      ) {
        setSuggestOpen(
          false
        );

        setMobileCatsOpen(
          false
        );

        setDesktopCatsOpen(
          false
        );
      }
    }

    document.addEventListener(
      "keydown",
      onKey
    );

    return () =>
      document.removeEventListener(
        "keydown",
        onKey
      );
  }, []);

  /*
    ============================================
    CATEGORY ORIENTATION

    WIDTH > HEIGHT
    -> CategoriesMenu top-left

    HEIGHT >= WIDTH
    -> bottom navigation
    ============================================
  */
  useEffect(() => {
    const landscapeMedia =
      window.matchMedia(
        "(orientation: landscape)"
      );

    const handleOrientationChange =
      (event) => {
        if (
          event.matches
        ) {
          setMobileCatsOpen(
            false
          );
        } else {
          setDesktopCatsOpen(
            false
          );
        }
      };

    handleOrientationChange(
      landscapeMedia
    );

    if (
      landscapeMedia
        .addEventListener
    ) {
      landscapeMedia
        .addEventListener(
          "change",
          handleOrientationChange
        );

      return () => {
        landscapeMedia
          .removeEventListener(
            "change",
            handleOrientationChange
          );
      };
    }

    landscapeMedia.addListener(
      handleOrientationChange
    );

    return () => {
      landscapeMedia.removeListener(
        handleOrientationChange
      );
    };
  }, []);

  function goToShopSearch(
    val
  ) {
    const q =
      String(
        val || ""
      ).trim();

    if (!q) {
      return;
    }

    navigate(
      shopSearchPath(q)
    );

    setQuery(q);

    setSuggestOpen(
      false
    );

    setMobileCatsOpen(
      false
    );

    setDesktopCatsOpen(
      false
    );
  }

  function onSubmit(e) {
    e.preventDefault();

    goToShopSearch(
      query
    );
  }

  function SuggestionsDropdown({
    className = "",
  }) {
    if (!suggestOpen) {
      return null;
    }

    if (
      query.trim() &&
      suggestions.length ===
        0
    ) {
      return (
        <div
          className={cx(
            `
              absolute
              left-0
              right-0
              z-[80]
              mt-2

              border
              border-slate-200

              bg-white

              p-4

              text-sm
              text-slate-600

              shadow-xl
            `,
            className
          )}
          style={{
            borderRadius:
              "2px",
          }}
        >
          Nuk u gjet
          asgjë. Shtypni{" "}

          <span
            className="
              font-semibold
            "
          >
            Kërko
          </span>{" "}

          për ta parë në
          Dyqan.
        </div>
      );
    }

    if (
      suggestions.length ===
      0
    ) {
      return null;
    }

    return (
      <div
        className={cx(
          `
            absolute
            left-0
            right-0
            z-[80]
            mt-2

            overflow-hidden

            border
            border-slate-200

            bg-white

            shadow-xl
          `,
          className
        )}
        style={{
          borderRadius:
            "2px",
        }}
      >
        <div
          className="
            max-h-80
            overflow-auto
          "
        >
          {suggestions.map(
            (p) => (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  goToShopSearch(
                    p.title
                  )
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3

                  px-4
                  py-3

                  text-left

                  transition-all
                  duration-200
                  ease-out

                  hover:bg-slate-50
                "
              >
                <div
                  className="
                    h-11
                    w-11
                    shrink-0

                    bg-slate-50

                    p-1
                  "
                >
                  <img
                    src={
                      p.image
                    }
                    alt={
                      p.title
                    }
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                    loading="lazy"
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <p
                    className="
                      truncate

                      text-sm
                      font-semibold
                      text-slate-900
                    "
                  >
                    {
                      p.title
                    }
                  </p>

                  <p
                    className="
                      mt-0.5

                      text-xs
                      text-slate-500
                    "
                  >
                    {p.brand}
                    {" • "}
                    {
                      p.category
                    }
                  </p>
                </div>

                <div
                  className="
                    shrink-0

                    text-sm
                    font-bold
                    text-emerald-900
                  "
                >
                  {
                    formatPriceEUR(
                      p.price
                    )
                  }
                </div>
              </button>
            )
          )}
        </div>

        <div
          className="
            flex
            items-center
            justify-between

            border-t
            border-slate-100

            bg-white

            px-4
            py-3
          "
        >
          <p
            className="
              text-xs
              text-slate-500
            "
          >
            Po shfaqen{" "}
            {
              suggestions.length
            }{" "}
            rezultatet
            kryesore
          </p>

          <button
            type="button"
            onClick={() =>
              goToShopSearch(
                query
              )
            }
            className="
              text-sm
              font-semibold
              text-orange-600

              transition-colors
              duration-200

              hover:text-orange-700
            "
          >
            Shiko të gjitha
          </button>
        </div>
      </div>
    );
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
      "
    >
      {/* ========================================
          TOP INFO BAR
          ======================================== */}

      <div
        className="
          bg-emerald-950
          text-white
        "
      >
        <div
          className="
            mx-auto

            flex
            max-w-7xl
            items-center
            justify-between

            px-4
            py-1.5

            sm:px-6
          "
        >
          <p
            className="
              text-[11px]
              text-white/80

              sm:text-xs
            "
          >
            Dërgesë falas mbi{" "}

            <span
              className="
                font-semibold
                text-white
              "
            >
              €100
            </span>
          </p>

          <p
            className="
              text-[11px]
              text-white/80

              sm:text-xs
            "
          >
            Mbështetje:{" "}

            <span
              className="
                font-semibold
                text-white
              "
            >
              24/7
            </span>
          </p>
        </div>
      </div>

      {/* ========================================
          MAIN GREEN NAVBAR

          ORIGINAL VERTICAL SIZE KEPT
          ======================================== */}

      <div
        className="
          bg-emerald-900
          text-white
          shadow-sm
        "
      >
        <div
          className="
            relative
            w-full

            px-4
            py-2

            sm:px-6

            md:py-4
          "
        >
          {/* ====================================
              MOBILE HEADER
              ORIGINAL HEIGHTS
              ==================================== */}

          <div
            className="
              md:hidden
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <NavLink
                to="/"
                className="
                  flex
                  min-w-0
                  shrink-0
                  items-center
                "
              >
                <img
                  src={logo}
                  alt="TechVerse"
                  className="
                    h-10
                    w-auto
                    object-contain
                  "
                />
              </NavLink>

              <div
                className="
                  flex
                  items-center
                  gap-1
                "
              >
                <NavLink
                  to="/wishlist"
                  className="
                    relative

                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10
                    text-white

                    transition-all
                    duration-200

                    hover:bg-white/20
                  "
                  aria-label="Lista e dëshirave"
                >
                  <HeartIcon
                    className="
                      h-5
                      w-5
                    "
                  />

                  {wishlistCount >
                    0 && (
                    <span
                      className="
                        absolute
                        right-0
                        top-0

                        inline-flex
                        h-4
                        min-w-4

                        -translate-y-1/4
                        translate-x-1/4

                        items-center
                        justify-center

                        rounded-full

                        bg-orange-500

                        px-1

                        text-[9px]
                        font-bold
                        text-white
                      "
                    >
                      {wishlistCount >
                      99
                        ? "99+"
                        : wishlistCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  className="
                    relative

                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10
                    text-white

                    transition-all
                    duration-200

                    hover:bg-white/20
                  "
                  aria-label="Shporta"
                >
                  <CartIcon
                    className="
                      h-5
                      w-5
                    "
                  />

                  {cartCount >
                    0 && (
                    <span
                      className="
                        absolute
                        right-0
                        top-0

                        inline-flex
                        h-4
                        min-w-4

                        -translate-y-1/4
                        translate-x-1/4

                        items-center
                        justify-center

                        rounded-full

                        bg-orange-500

                        px-1

                        text-[9px]
                        font-bold
                        text-white
                      "
                    >
                      {cartCount >
                      99
                        ? "99+"
                        : cartCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/login"
                  className="
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10
                    text-white

                    transition-all
                    duration-200

                    hover:bg-white/20
                  "
                  aria-label="Kyçu"
                >
                  <UserIcon
                    className="
                      h-5
                      w-5
                    "
                  />
                </NavLink>
              </div>
            </div>

            {/* MOBILE SEARCH */}

            <div
              className="
                mt-2.5
              "
            >
              <div
                data-searchbox="true"
                className="
                  relative
                "
              >
                <form
                  onSubmit={
                    onSubmit
                  }
                >
                  <div
                    className="
                      flex
                      h-9
                      items-center

                      rounded-full

                      bg-white

                      px-4

                      shadow-sm
                    "
                  >
                    <input
                      value={query}
                      onChange={(
                        e
                      ) => {
                        const v =
                          e.target
                            .value;

                        setQuery(
                          v
                        );

                        setSuggestOpen(
                          v
                            .trim()
                            .length >
                            0
                        );
                      }}
                      onFocus={() => {
                        if (
                          query.trim()
                        ) {
                          setSuggestOpen(
                            true
                          );
                        }
                      }}
                      placeholder="Kërko produkte..."
                      className="
                        w-full

                        bg-transparent

                        text-[14px]
                        text-slate-900

                        placeholder:text-slate-500

                        focus:outline-none
                      "
                    />

                    <button
                      type="submit"
                      disabled={
                        !canSearch
                      }
                      className={cx(
                        `
                          ml-2

                          inline-flex
                          h-8
                          w-8
                          items-center
                          justify-center

                          rounded-full

                          transition-all
                          duration-200
                        `,
                        canSearch
                          ? `
                              text-slate-600

                              hover:bg-slate-100
                              hover:text-slate-900
                            `
                          : `
                              cursor-not-allowed
                              text-slate-300
                            `
                      )}
                      aria-label="Kërko"
                    >
                      <SearchIcon
                        className="
                          h-5
                          w-5
                        "
                      />
                    </button>
                  </div>
                </form>

                <SuggestionsDropdown />
              </div>
            </div>
          </div>

          {/* ====================================
              TABLET / LAPTOP / DESKTOP

              LOGO = BIGGER + FAR LEFT

              SEARCH = WIDER ONLY
              HEIGHT REMAINS h-10

              BUTTONS = ORIGINAL h-10 w-10
              ==================================== */}

          <div
            className="
              relative
              hidden

              md:block
            "
          >
            {/* FAR-LEFT LOGO

                Absolute positioning means
                the bigger logo does NOT make
                the navbar taller.
            */}

            <NavLink
              to="/"
              className="
                absolute
                left-0
                top-1/2
                z-10

                flex

                -translate-y-1/2
                items-center
              "
            >
              <img
                src={logo}
                alt="TechVerse"
                className="
                  h-11
                  w-auto
                  max-w-[160px]

                  object-contain
                  object-left

                  lg:h-12
                  lg:max-w-[180px]

                  xl:h-[50px]
                  xl:max-w-[195px]
                "
              />
            </NavLink>

            <div
              className="
                navbar-desktop-inner

                mx-auto

                flex
                w-full
                max-w-7xl
                items-center

                gap-6
              "
            >
              {/* WIDER SEARCH
                  HEIGHT IS STILL ORIGINAL h-10
              */}

              <div
                className="
                  min-w-0
                  flex-1
                  max-w-[980px]
                "
              >
                <div
                  data-searchbox="true"
                  className="
                    relative
                  "
                >
                  <form
                    onSubmit={
                      onSubmit
                    }
                  >
                    <div
                      className="
                        flex
                        h-10
                        items-center

                        rounded-full

                        bg-white

                        px-4

                        shadow-sm
                      "
                    >
                      <input
                        value={query}
                        onChange={(
                          e
                        ) => {
                          const v =
                            e.target
                              .value;

                          setQuery(
                            v
                          );

                          setSuggestOpen(
                            v
                              .trim()
                              .length >
                              0
                          );
                        }}
                        onFocus={() => {
                          if (
                            query.trim()
                          ) {
                            setSuggestOpen(
                              true
                            );
                          }
                        }}
                        placeholder="Kërko produkte..."
                        className="
                          w-full

                          bg-transparent

                          text-sm
                          text-slate-900

                          placeholder:text-slate-500

                          focus:outline-none
                        "
                      />

                      <button
                        type="submit"
                        disabled={
                          !canSearch
                        }
                        className={cx(
                          `
                            ml-2

                            inline-flex
                            h-8
                            w-8
                            items-center
                            justify-center

                            rounded-full

                            transition-all
                            duration-200
                          `,
                          canSearch
                            ? `
                                text-slate-600

                                hover:bg-slate-100
                                hover:text-slate-900
                              `
                            : `
                                cursor-not-allowed
                                text-slate-300
                              `
                        )}
                        aria-label="Kërko"
                      >
                        <SearchIcon
                          className="
                            h-5
                            w-5
                          "
                        />
                      </button>
                    </div>
                  </form>

                  <SuggestionsDropdown />
                </div>
              </div>

              {/* ==================================
                  ORIGINAL ICON SIZE RESTORED

                  h-10 w-10
                  icons h-5 w-5

                  ONLY radius is different
                  ================================== */}

              <div
                className="
                  ml-auto

                  flex
                  shrink-0
                  items-center
                  gap-1
                "
              >
                {/* WISHLIST */}

                <NavLink
                  to="/wishlist"
                  className="
                    relative

                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10
                    text-white

                    transition-all
                    duration-200
                    ease-out

                    hover:bg-white/20
                  "
                  aria-label="Lista e dëshirave"
                >
                  <HeartIcon
                    className="
                      h-5
                      w-5
                    "
                  />

                  {wishlistCount >
                    0 && (
                    <span
                      className="
                        absolute
                        right-0
                        top-0

                        inline-flex
                        h-5
                        min-w-5

                        -translate-y-1/4
                        translate-x-1/4

                        items-center
                        justify-center

                        rounded-full

                        bg-orange-500

                        px-1

                        text-[10px]
                        font-bold
                        text-white
                      "
                    >
                      {wishlistCount >
                      99
                        ? "99+"
                        : wishlistCount}
                    </span>
                  )}
                </NavLink>

                {/* CART */}

                <NavLink
                  to="/cart"
                  className="
                    relative

                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10
                    text-white

                    transition-all
                    duration-200
                    ease-out

                    hover:bg-white/20
                  "
                  aria-label="Shporta"
                >
                  <CartIcon
                    className="
                      h-5
                      w-5
                    "
                  />

                  {cartCount >
                    0 && (
                    <span
                      className="
                        absolute
                        right-0
                        top-0

                        inline-flex
                        h-5
                        min-w-5

                        -translate-y-1/4
                        translate-x-1/4

                        items-center
                        justify-center

                        rounded-full

                        bg-orange-500

                        px-1

                        text-[10px]
                        font-bold
                        text-white
                      "
                    >
                      {cartCount >
                      99
                        ? "99+"
                        : cartCount}
                    </span>
                  )}
                </NavLink>

                {/* LOGIN */}

                <NavLink
                  to="/login"
                  className="
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10
                    text-white

                    transition-all
                    duration-200
                    ease-out

                    hover:bg-white/20
                  "
                  aria-label="Kyçu"
                >
                  <UserIcon
                    className="
                      h-5
                      w-5
                    "
                  />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          SECONDARY DESKTOP NAVIGATION
          ======================================== */}

      <div
        className="
          relative
          hidden

          border-b
          border-slate-200

          bg-white

          md:block
        "
      >
        <div
          className="
            mx-auto

            flex
            h-12
            max-w-7xl
            items-center
            justify-between

            px-4

            sm:px-6
          "
        >
          <div
            className="
              flex
              h-full
              items-center
              gap-7

              lg:gap-9
            "
          >
            <div
              className="
                relative
                flex
                h-full
                items-center
              "
              onMouseEnter={() =>
                setDesktopCatsOpen(
                  true
                )
              }
              onMouseLeave={() =>
                setDesktopCatsOpen(
                  false
                )
              }
            >
              <div
                className={cx(
                  `
                    absolute
                    left-0
                    top-full
                    z-[100]

                    w-[min(920px,calc(100vw-32px))]

                    origin-top

                    border
                    border-slate-200

                    bg-white

                    shadow-[0_18px_50px_rgba(15,23,42,0.16)]

                    transition-all
                    duration-200
                    ease-out
                  `,
                  desktopCatsOpen
                    ? `
                        visible
                        translate-y-0
                        scale-100
                        opacity-100
                      `
                    : `
                        invisible
                        -translate-y-1
                        scale-[0.995]
                        opacity-0
                      `
                )}
                style={{
                  borderRadius:
                    "2px",
                }}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    border-b
                    border-slate-200

                    px-6
                    py-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-900
                      "
                    >
                      Kategoritë
                    </p>

                    <p
                      className="
                        mt-0.5

                        text-xs
                        text-slate-500
                      "
                    >
                      Eksploroni produktet
                      sipas kategorisë
                    </p>
                  </div>

                  <NavLink
                    to="/shop"
                    onClick={() =>
                      setDesktopCatsOpen(
                        false
                      )
                    }
                    className="
                      group

                      flex
                      items-center
                      gap-2

                      text-xs
                      font-semibold
                      text-emerald-800

                      transition-colors
                      duration-200

                      hover:text-emerald-950
                    "
                  >
                    Shiko të gjitha

                    <span
                      className="
                        transition-transform
                        duration-200
                        ease-out

                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  </NavLink>
                </div>

                <div
                  className="
                    grid
                    grid-cols-2

                    xl:grid-cols-4
                  "
                >
                  {megaMenuCategories.map(
                    (
                      section,
                      sectionIndex
                    ) => (
                      <div
                        key={
                          section.title
                        }
                        className={cx(
                          `
                            group/section

                            px-5
                            py-5

                            transition-colors
                            duration-300
                            ease-out

                            hover:bg-slate-50/70
                          `,
                          sectionIndex %
                            2 !==
                            0
                            ? `
                                border-l
                                border-slate-100
                              `
                            : "",
                          sectionIndex >=
                            2
                            ? `
                                border-t
                                border-slate-100

                                xl:border-t-0
                              `
                            : "",
                          sectionIndex >
                            0
                            ? `
                                xl:border-l
                                xl:border-slate-100
                              `
                            : ""
                        )}
                      >
                        <NavLink
                          to={
                            section.to
                          }
                          onClick={() =>
                            setDesktopCatsOpen(
                              false
                            )
                          }
                          className="
                            group/title

                            mb-3

                            flex
                            items-center
                            justify-between

                            border-b
                            border-slate-100

                            pb-3
                          "
                        >
                          <span
                            className="
                              text-sm
                              font-bold
                              text-slate-900

                              transition-colors
                              duration-200

                              group-hover/title:text-emerald-800
                            "
                          >
                            {
                              section.title
                            }
                          </span>

                          <span
                            className="
                              text-sm
                              text-slate-300

                              transition-all
                              duration-200
                              ease-out

                              group-hover/title:translate-x-1
                              group-hover/title:text-emerald-700
                            "
                          >
                            →
                          </span>
                        </NavLink>

                        <div
                          className="
                            space-y-0.5
                          "
                        >
                          {section.items.map(
                            (
                              item
                            ) => (
                              <NavLink
                                key={`${section.title}-${item.label}`}
                                to={shopSearchPath(
                                  item.query
                                )}
                                onClick={() =>
                                  setDesktopCatsOpen(
                                    false
                                  )
                                }
                                className="
                                  group/item
                                  relative

                                  flex
                                  min-h-9
                                  items-center

                                  px-2

                                  text-[13px]
                                  font-medium
                                  text-slate-600

                                  transition-all
                                  duration-200
                                  ease-out

                                  hover:translate-x-1
                                  hover:bg-emerald-50/70
                                  hover:text-emerald-900
                                "
                                style={{
                                  borderRadius:
                                    "2px",
                                }}
                              >
                                <span
                                  className="
                                    mr-0

                                    h-4
                                    w-0

                                    overflow-hidden

                                    bg-emerald-700

                                    opacity-0

                                    transition-all
                                    duration-200
                                    ease-out

                                    group-hover/item:mr-2
                                    group-hover/item:w-[2px]
                                    group-hover/item:opacity-100
                                  "
                                />

                                <span>
                                  {
                                    item.label
                                  }
                                </span>
                              </NavLink>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div
                  className="
                    grid
                    grid-cols-3

                    border-t
                    border-slate-200

                    bg-slate-50/70
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2

                      border-r
                      border-slate-200

                      px-4
                      py-3

                      text-xs
                      text-slate-600
                    "
                  >
                    <span
                      className="
                        font-bold
                        text-emerald-800
                      "
                    >
                      ✓
                    </span>

                    Dërgesë falas mbi €100
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2

                      border-r
                      border-slate-200

                      px-4
                      py-3

                      text-xs
                      text-slate-600
                    "
                  >
                    <span
                      className="
                        font-bold
                        text-emerald-800
                      "
                    >
                      ✓
                    </span>

                    Mbështetje 24/7
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2

                      px-4
                      py-3

                      text-xs
                      text-slate-600
                    "
                  >
                    <span
                      className="
                        font-bold
                        text-emerald-800
                      "
                    >
                      ✓
                    </span>

                    Garanci e përfshirë
                  </div>
                </div>
              </div>
            </div>

            <NavLink
              to="/outlet"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    h-full
                    items-center

                    border-b-2

                    text-sm
                    font-medium

                    transition-all
                    duration-200
                    ease-out
                  `,
                  isActive
                    ? `
                        border-emerald-700
                        font-semibold
                        text-emerald-800
                      `
                    : `
                        border-transparent
                        text-slate-700

                        hover:border-emerald-700
                        hover:text-emerald-700
                      `
                )
              }
            >
              Outlet
            </NavLink>

            <NavLink
              to="/new"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    h-full
                    items-center

                    border-b-2

                    text-sm
                    font-medium

                    transition-all
                    duration-200
                    ease-out
                  `,
                  isActive
                    ? `
                        border-emerald-700
                        font-semibold
                        text-emerald-800
                      `
                    : `
                        border-transparent
                        text-slate-700

                        hover:border-emerald-700
                        hover:text-emerald-700
                      `
                )
              }
            >
              Çfarë ka të re?
            </NavLink>

            <NavLink
              to="/giftcard"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    h-full
                    items-center

                    border-b-2

                    text-sm
                    font-medium

                    transition-all
                    duration-200
                    ease-out
                  `,
                  isActive
                    ? `
                        border-emerald-700
                        font-semibold
                        text-emerald-800
                      `
                    : `
                        border-transparent
                        text-slate-700

                        hover:border-emerald-700
                        hover:text-emerald-700
                      `
                )
              }
            >
              Gift card
            </NavLink>
          </div>

          <div
            className="
              flex
              h-full
              items-center
              gap-7

              lg:gap-9
            "
          >
            <NavLink
              to="/support"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    h-full
                    items-center

                    border-b-2

                    text-sm
                    font-medium

                    transition-all
                    duration-200
                    ease-out
                  `,
                  isActive
                    ? `
                        border-emerald-700
                        font-semibold
                        text-emerald-800
                      `
                    : `
                        border-transparent
                        text-slate-700

                        hover:border-emerald-700
                        hover:text-emerald-700
                      `
                )
              }
            >
              Support
            </NavLink>

            <NavLink
              to="/contact"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    h-full
                    items-center

                    border-b-2

                    text-sm
                    font-medium

                    transition-all
                    duration-200
                    ease-out
                  `,
                  isActive
                    ? `
                        border-emerald-700
                        font-semibold
                        text-emerald-800
                      `
                    : `
                        border-transparent
                        text-slate-700

                        hover:border-emerald-700
                        hover:text-emerald-700
                      `
                )
              }
            >
              Chat
            </NavLink>
          </div>
        </div>
      </div>

      {/* ========================================
          PORTRAIT BOTTOM NAV
          ======================================== */}

      <div
        className="
          portrait-category-navigation
        "
      >
        <nav
          className="
            fixed
            bottom-0
            left-0
            right-0
            z-[90]

            border-t
            border-slate-200

            bg-white
          "
        >
          <div
            className="
              mx-auto

              grid
              max-w-7xl
              grid-cols-5

              px-2
              py-2
            "
          >
            <NavLink
              to="/"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1

                    py-1

                    text-[11px]
                    font-medium

                    transition-colors
                    duration-200
                  `,
                  isActive
                    ? "text-emerald-900"
                    : "text-slate-500"
                )
              }
            >
              <HomeIcon
                className="
                  h-6
                  w-6
                "
              />

              <span>
                Ballina
              </span>
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setMobileCatsOpen(
                  true
                );

                setSuggestOpen(
                  false
                );
              }}
              className={cx(
                `
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1

                  py-1

                  text-[11px]
                  font-medium

                  transition-colors
                  duration-200
                `,
                mobileCatsOpen
                  ? "text-emerald-900"
                  : "text-slate-500"
              )}
              aria-expanded={
                mobileCatsOpen
              }
            >
              <MenuIcon
                className="
                  h-6
                  w-6
                "
              />

              <span>
                Kategoritë
              </span>
            </button>

            <NavLink
              to="/cart"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    relative

                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1

                    py-1

                    text-[11px]
                    font-medium

                    transition-colors
                    duration-200
                  `,
                  isActive
                    ? "text-emerald-900"
                    : "text-slate-500"
                )
              }
            >
              <CartIcon
                className="
                  h-6
                  w-6
                "
              />

              <span>
                Shporta
              </span>

              {cartCount >
                0 && (
                <span
                  className="
                    absolute
                    right-3
                    top-1

                    inline-flex
                    h-5
                    min-w-5
                    items-center
                    justify-center

                    rounded-full

                    bg-orange-500

                    px-1

                    text-[11px]
                    font-bold
                    text-white
                  "
                >
                  {cartCount >
                  99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1

                    py-1

                    text-[11px]
                    font-medium

                    transition-colors
                    duration-200
                  `,
                  isActive
                    ? "text-emerald-900"
                    : "text-slate-500"
                )
              }
            >
              <HeartIcon
                className="
                  h-6
                  w-6
                "
              />

              <span>
                Dëshirat
              </span>
            </NavLink>

            <NavLink
              to="/login"
              className={({
                isActive,
              }) =>
                cx(
                  `
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1

                    py-1

                    text-[11px]
                    font-medium

                    transition-colors
                    duration-200
                  `,
                  isActive
                    ? "text-emerald-900"
                    : "text-slate-500"
                )
              }
            >
              <UserIcon
                className="
                  h-6
                  w-6
                "
              />

              <span>
                Kyçu
              </span>
            </NavLink>
          </div>
        </nav>

        {/* PORTRAIT CATEGORIES POPUP */}

        {mobileCatsOpen && (
          <div
            className="
              fixed
              inset-0
              z-[95]
            "
          >
            <button
              type="button"
              className="
                absolute
                inset-0

                bg-black/40
              "
              onClick={() =>
                setMobileCatsOpen(
                  false
                )
              }
              aria-label="Mbyll kategoritë"
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0

                bg-white

                shadow-2xl
              "
              style={{
                borderRadius:
                  "2px 2px 0 0",
              }}
            >
              <div
                className="
                  mx-auto
                  max-w-7xl

                  px-4
                  py-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className="
                      text-base
                      font-bold
                      text-slate-900
                    "
                  >
                    Kategoritë
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setMobileCatsOpen(
                        false
                      )
                    }
                    className="
                      inline-flex
                      h-9
                      w-9
                      items-center
                      justify-center

                      bg-slate-100
                      text-slate-900

                      transition-colors
                      duration-200

                      hover:bg-slate-200
                    "
                    style={{
                      borderRadius:
                        "2px",
                    }}
                    aria-label="Mbyll"
                  >
                    <CloseIcon
                      className="
                        h-5
                        w-5
                      "
                    />
                  </button>
                </div>

                <div
                  className="
                    mt-4

                    grid
                    grid-cols-2
                    gap-2

                    pb-6
                  "
                >
                  <NavLink
                    to="/shop"
                    onClick={() =>
                      setMobileCatsOpen(
                        false
                      )
                    }
                    className="
                      border
                      border-slate-200

                      px-3
                      py-3

                      text-sm
                      font-semibold
                      text-slate-900

                      transition-all
                      duration-200

                      hover:border-emerald-300
                      hover:bg-emerald-50
                      hover:text-emerald-900
                    "
                    style={{
                      borderRadius:
                        "2px",
                    }}
                  >
                    Dyqani
                  </NavLink>

                  {categories.map(
                    (c) => (
                      <NavLink
                        key={
                          c.to
                        }
                        to={
                          c.to
                        }
                        onClick={() =>
                          setMobileCatsOpen(
                            false
                          )
                        }
                        className="
                          border
                          border-slate-200

                          px-3
                          py-3

                          text-sm
                          font-medium
                          text-slate-900

                          transition-all
                          duration-200

                          hover:border-emerald-300
                          hover:bg-emerald-50
                          hover:text-emerald-900
                        "
                        style={{
                          borderRadius:
                            "2px",
                        }}
                      >
                        {
                          c.label
                        }
                      </NavLink>
                    )
                  )}

                  <NavLink
                    to="/outlet"
                    onClick={() =>
                      setMobileCatsOpen(
                        false
                      )
                    }
                    className="
                      border
                      border-slate-200

                      px-3
                      py-3

                      text-sm
                      font-medium
                      text-slate-900

                      transition-all
                      duration-200

                      hover:border-emerald-300
                      hover:bg-emerald-50
                      hover:text-emerald-900
                    "
                    style={{
                      borderRadius:
                        "2px",
                    }}
                  >
                    Outlet
                  </NavLink>

                  <NavLink
                    to="/new"
                    onClick={() =>
                      setMobileCatsOpen(
                        false
                      )
                    }
                    className="
                      border
                      border-slate-200

                      px-3
                      py-3

                      text-sm
                      font-medium
                      text-slate-900

                      transition-all
                      duration-200

                      hover:border-emerald-300
                      hover:bg-emerald-50
                      hover:text-emerald-900
                    "
                    style={{
                      borderRadius:
                        "2px",
                    }}
                  >
                    Çfarë ka të re?
                  </NavLink>

                  <NavLink
                    to="/giftcard"
                    onClick={() =>
                      setMobileCatsOpen(
                        false
                      )
                    }
                    className="
                      border
                      border-slate-200

                      px-3
                      py-3

                      text-sm
                      font-medium
                      text-slate-900

                      transition-all
                      duration-200

                      hover:border-emerald-300
                      hover:bg-emerald-50
                      hover:text-emerald-900
                    "
                    style={{
                      borderRadius:
                        "2px",
                    }}
                  >
                    Gift card
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================
          RESPONSIVE CSS
          ======================================== */}

      <style>
        {`
          /*
            ==========================================
            DESKTOP MAIN NAVBAR

            Keep logo far left.

            Keep space for the logo on normal
            tablets / laptops / ZenBooks.

            On very large monitors the centered
            1280px area already starts far enough
            from the left logo, so the search can
            use the logo's previous position.
            ==========================================
          */

          .navbar-desktop-inner {
            padding-left: 170px;
          }

          @media (min-width: 1024px) {
            .navbar-desktop-inner {
              padding-left: 185px;
            }
          }

          @media (min-width: 1700px) {
            .navbar-desktop-inner {
              padding-left: 0;
            }
          }


          /*
            ==========================================
            CATEGORY POSITION

            PORTRAIT
            height >= width
            -> bottom navigation

            LANDSCAPE
            width > height
            -> CategoriesMenu top-left
            ==========================================
          */

          .portrait-category-navigation {
            display: block;
          }

          @media (orientation: landscape) {
            .portrait-category-navigation {
              display: none !important;
            }
          }

          @media (orientation: portrait) {
            .portrait-category-navigation {
              display: block !important;
            }
          }
        `}
      </style>

      <CategoriesMenu />
    </header>
  );
}