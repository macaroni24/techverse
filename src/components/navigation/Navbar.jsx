import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../../store/StoreProvider";
import { products } from "../../data/products";
import logo from "../../assets/WhiteLogo.PNG";
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
      { label: "Kartela Grafike RTX", query: "NVIDIA GeForce" },
      { label: "SSD & Storage", query: "NVMe SSD" },
    ],
  },
  {
    title: "Laptopë & Telefona",
    to: "/laptops-phones",
    items: [
      { label: "iPhone", query: "iPhone" },
      { label: "Samsung Galaxy", query: "Samsung Galaxy S24" },
      { label: "Xiaomi", query: "Xiaomi" },
      { label: "Google Pixel", query: "Google Pixel" },
      { label: "OnePlus", query: "OnePlus" },
      { label: "Gaming Laptopë", query: "Gaming Laptop" },
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
      { label: "Smartwatch", query: "Galaxy Watch" },
      { label: "Karikues", query: "Charger" },
      { label: "Power Bank", query: "Power Bank" },
      { label: "Wireless Accessories", query: "Wireless" },
    ],
  },
  {
    title: "Monitorë",
    to: "/Monitors",
    items: [
      { label: "Gaming 165Hz", query: "165Hz" },
      { label: "Gaming 144Hz", query: "144Hz" },
      { label: "Monitorë 4K", query: "4K Monitor" },
      { label: "UltraWide", query: "UltraWide Monitor" },
      { label: "eSports 240Hz", query: "240Hz" },
      { label: "27-inch Gaming", query: '27" Gaming Monitor' },
      { label: "32-inch 4K", query: '32" 4K Monitor' },
      { label: "49-inch UltraWide", query: '49" Super UltraWide' },
    ],
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatPriceEUR(value) {
  return `€${Number(value || 0).toFixed(2)}`;
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
  const { cartCount, wishlistCount } = useStore();

  const [query, setQuery] = useState("");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [desktopCatsOpen, setDesktopCatsOpen] = useState(false);
  const [mobileSearchSticky, setMobileSearchSticky] = useState(false);
  const [mobileHeaderExpanded, setMobileHeaderExpanded] = useState(false);

  const lastScrollYRef = useRef(0);

  const navigate = useNavigate();

  const canSearch = useMemo(() => {
    return query.trim().length > 0;
  }, [query]);

  const suggestions = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return products
      .filter((product) =>
        `${product.title} ${product.brand} ${product.category} ${product.section}`
          .toLowerCase()
          .includes(search)
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      const insideSearch = event.target.closest?.('[data-searchbox="true"]');

      if (!insideSearch) {
        setSuggestOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setSuggestOpen(false);
      setMobileCatsOpen(false);
      setDesktopCatsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleMobileScroll = () => {
      if (window.innerWidth >= 768) {
        setMobileSearchSticky(false);
        setMobileHeaderExpanded(false);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      const difference = currentScrollY - previousScrollY;

      if (currentScrollY <= 4) {
        setMobileSearchSticky(false);
        setMobileHeaderExpanded(false);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      setMobileSearchSticky(true);

      if (difference > 4) {
        setMobileHeaderExpanded(false);
      } else if (difference < -4) {
        setMobileHeaderExpanded(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSearchSticky(false);
        setMobileHeaderExpanded(false);
        setMobileCatsOpen(false);
      } else {
        setDesktopCatsOpen(false);
      }

      lastScrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleMobileScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleMobileScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const goToShopSearch = (value) => {
    const search = String(value || "").trim();

    if (!search) return;

    navigate(shopSearchPath(search));

    setQuery(search);
    setSuggestOpen(false);
    setMobileCatsOpen(false);
    setDesktopCatsOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    goToShopSearch(query);
  };

  function SuggestionsDropdown({ className = "" }) {
    if (!suggestOpen) return null;

    if (query.trim() && suggestions.length === 0) {
      return (
        <div
          className={cx(
            "absolute left-0 right-0 z-[200] mt-2 border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-xl",
            className
          )}
          style={{ borderRadius: "2px" }}
        >
          Nuk u gjet asgjë. Shtypni{" "}
          <span className="font-semibold">Kërko</span>{" "}
          për ta parë në Dyqan.
        </div>
      );
    }

    if (suggestions.length === 0) return null;

    return (
      <div
        className={cx(
          "absolute left-0 right-0 z-[200] mt-2 overflow-hidden border border-slate-200 bg-white shadow-xl",
          className
        )}
        style={{ borderRadius: "2px" }}
      >
        <div className="max-h-80 overflow-auto">
          {suggestions.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => goToShopSearch(product.title)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-slate-50"
            >
              <div className="h-11 w-11 shrink-0 bg-slate-50 p-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {product.title}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {product.brand} • {product.category}
                </p>
              </div>

              <div className="shrink-0 text-sm font-bold text-emerald-900">
                {formatPriceEUR(product.price)}
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3">
          <p className="text-xs text-slate-500">
            Po shfaqen {suggestions.length} rezultatet kryesore
          </p>

          <button
            type="button"
            onClick={() => goToShopSearch(query)}
            className="text-sm font-semibold text-blue-800 hover:text-blue-900"
          >
            Shiko të gjitha
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="verse-navbar relative z-50 w-full md:sticky md:top-0">
      {/* TOP BAR */}

      <div className="navbar-topbar text-white">
        <div className="flex w-full items-center justify-between px-4 py-1 sm:px-6 md:py-[2px] xl:py-1.5">
          <p className="text-[11px] text-white/80 md:text-[9px] lg:text-[10px] xl:text-xs">
            Dërgesë falas mbi{" "}
            <span className="font-semibold text-[#4aa3ff]">€100</span>
          </p>

          <p className="text-[11px] text-white/80 md:text-[9px] lg:text-[10px] xl:text-xs">
            Mbështetje:{" "}
            <span className="font-semibold text-[#4aa3ff]">24/7</span>
          </p>
        </div>
      </div>

      {/* MAIN NAVBAR */}

      <div className="navbar-main relative z-[80] text-white">
        <div className="relative w-full px-4 py-2 sm:px-6 md:py-1.5 xl:py-4">
          {/* MOBILE */}

          <div className="md:hidden">
            <div className="flex items-center justify-between gap-3">
              <NavLink
                to="/"
                className="flex min-w-0 shrink-0 items-center"
              >
                <img
                  src={logo}
                  alt="TechVerse"
                  className="h-10 w-auto object-contain"
                />
              </NavLink>

              <div className="flex items-center gap-1">
                <NavLink
                  to="/wishlist"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Lista e dëshirave"
                >
                  <HeartIcon className="h-5 w-5" />

                  {wishlistCount > 0 && (
                    <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-[#348ef4] px-1 text-[9px] font-bold text-white">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Shporta"
                >
                  <CartIcon className="h-5 w-5" />

                  {cartCount > 0 && (
                    <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-[#348ef4] px-1 text-[9px] font-bold text-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/login"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Kyçu"
                >
                  <UserIcon className="h-5 w-5" />
                </NavLink>
              </div>
            </div>

            <div className="mt-2.5">
              <div data-searchbox="true" className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="navbar-search flex h-9 items-center rounded-full px-4">
                    <input
                      value={query}
                      onChange={(event) => {
                        const value = event.target.value;

                        setQuery(value);
                        setSuggestOpen(value.trim().length > 0);
                      }}
                      onFocus={() => {
                        if (query.trim()) {
                          setSuggestOpen(true);
                        }
                      }}
                      placeholder="Kërko produkte..."
                      className="w-full bg-transparent text-[14px] text-slate-900 placeholder:text-slate-500 focus:outline-none"
                    />

                    <button
                      type="submit"
                      disabled={!canSearch}
                      className={cx(
                        "navbar-search-button ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full transition",
                        canSearch
                          ? "text-slate-600"
                          : "cursor-not-allowed text-slate-300"
                      )}
                      aria-label="Kërko"
                    >
                      <SearchIcon className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                <SuggestionsDropdown />
              </div>
            </div>
          </div>

          {/* LAPTOP / DESKTOP */}

          <div className="relative hidden h-8 md:block xl:h-10">
            <NavLink
              to="/"
              className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center"
            >
              <img
                src={logo}
                alt="TechVerse"
                className="h-7 w-auto max-w-[115px] object-contain object-left lg:h-8 lg:max-w-[130px] xl:h-[50px] xl:max-w-[195px]"
              />
            </NavLink>

            {/* SEARCH */}

            <div className="absolute left-[170px] right-[150px] top-1/2 z-[120] -translate-y-1/2 lg:left-[190px] lg:right-[160px] xl:left-1/2 xl:right-auto xl:w-[min(54vw,850px)] xl:-translate-x-1/2"> <div data-searchbox="true" className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="navbar-search flex h-8 items-center rounded-full px-3 xl:h-10 xl:px-4">
                    <input
                      value={query}
                      onChange={(event) => {
                        const value = event.target.value;

                        setQuery(value);
                        setSuggestOpen(value.trim().length > 0);
                      }}
                      onFocus={() => {
                        if (query.trim()) {
                          setSuggestOpen(true);
                        }
                      }}
                      placeholder="Kërko produkte..."
                      className="w-full bg-transparent text-[11px] text-slate-900 placeholder:text-slate-500 focus:outline-none lg:text-[12px] xl:text-sm"
                    />

                    <button
                      type="submit"
                      disabled={!canSearch}
                      className={cx(
                        "navbar-search-button ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full transition xl:h-8 xl:w-8",
                        canSearch
                          ? "text-slate-600"
                          : "cursor-not-allowed text-slate-300"
                      )}
                      aria-label="Kërko"
                    >
                      <SearchIcon className="h-4 w-4 xl:h-5 xl:w-5" />
                    </button>
                  </div>
                </form>

                <SuggestionsDropdown />
              </div>
            </div>

            {/* ACTIONS */}

            <div className="absolute right-0 top-1/2 z-[130] flex -translate-y-1/2 items-center gap-1">
              <NavLink
                to="/wishlist"
                className="navbar-action relative inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition xl:h-10 xl:w-10"
                aria-label="Lista e dëshirave"
              >
                <HeartIcon className="h-4 w-4 xl:h-5 xl:w-5" />

                {wishlistCount > 0 && (
                  <span className="navbar-count absolute right-0 top-0 inline-flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full px-1 text-[8px] font-bold text-white xl:h-5 xl:min-w-5 xl:text-[10px]">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className="navbar-action relative inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition xl:h-10 xl:w-10"
                aria-label="Shporta"
              >
                <CartIcon className="h-4 w-4 xl:h-5 xl:w-5" />

                {cartCount > 0 && (
                  <span className="navbar-count absolute right-0 top-0 inline-flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full px-1 text-[8px] font-bold text-white xl:h-5 xl:min-w-5 xl:text-[10px]">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/login"
                className="navbar-action inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition xl:h-10 xl:w-10"
                aria-label="Kyçu"
              >
                <UserIcon className="h-4 w-4 xl:h-5 xl:w-5" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY NAV */}

      {mobileSearchSticky && (
        <div className="fixed left-0 right-0 top-0 z-[150] bg-[#0b1015] shadow-sm md:hidden">
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              mobileHeaderExpanded
                ? "max-h-[88px] translate-y-0 opacity-100"
                : "max-h-0 -translate-y-3 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#171c21] bg-[#05080b] px-4 py-1.5">
              <p className="text-[11px] text-white/80">
                Dërgesë falas mbi{" "}
                <span className="font-semibold text-[#4aa3ff]">€100</span>
              </p>

              <p className="text-[11px] text-white/80">
                Mbështetje:{" "}
                <span className="font-semibold text-[#4aa3ff]">24/7</span>
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-2">
              <NavLink
                to="/"
                className="flex min-w-0 shrink-0 items-center"
              >
                <img
                  src={logo}
                  alt="TechVerse"
                  className="h-10 w-auto object-contain"
                />
              </NavLink>

              <div className="flex items-center gap-1">
                <NavLink
                  to="/wishlist"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#252c33] bg-[#1a2026] text-white transition hover:bg-[#242b32]"
                  aria-label="Lista e dëshirave"
                >
                  <HeartIcon className="h-5 w-5" />

                  {wishlistCount > 0 && (
                    <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-[#348ef4] px-1 text-[9px] font-bold text-white">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#252c33] bg-[#1a2026] text-white transition hover:bg-[#242b32]"
                  aria-label="Shporta"
                >
                  <CartIcon className="h-5 w-5" />

                  {cartCount > 0 && (
                    <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-[#348ef4] px-1 text-[9px] font-bold text-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/login"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#252c33] bg-[#1a2026] text-white transition hover:bg-[#242b32]"
                  aria-label="Kyçu"
                >
                  <UserIcon className="h-5 w-5" />
                </NavLink>
              </div>
            </div>
          </div>

          <div className="px-4 py-2">
            <div data-searchbox="true" className="relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="navbar-search flex h-9 items-center rounded-full px-4">
                  <input
                    value={query}
                    onChange={(event) => {
                      const value = event.target.value;

                      setQuery(value);
                      setSuggestOpen(value.trim().length > 0);
                    }}
                    onFocus={() => {
                      if (query.trim()) {
                        setSuggestOpen(true);
                      }
                    }}
                    placeholder="Kërko produkte..."
                    className="w-full bg-transparent text-[14px] text-slate-900 placeholder:text-slate-500 focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={!canSearch}
                    className={cx(
                      "navbar-search-button ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full transition",
                      canSearch
                        ? "text-slate-600"
                        : "cursor-not-allowed text-slate-300"
                    )}
                    aria-label="Kërko"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>

              <SuggestionsDropdown />
            </div>
          </div>
        </div>
      )}

      {/* SECONDARY NAV */}

      <div className="navbar-secondary relative z-[40] hidden md:block">
       <div className="absolute left-[170px] right-[150px] top-1/2 z-[120] -translate-y-1/2 lg:left-[190px] lg:right-[160px] xl:left-1/2 xl:right-auto xl:w-[min(54vw,850px)] xl:-translate-x-1/2"> {/* MEGA MENU */}

          <div
            className="relative flex h-full items-center"
            onMouseEnter={() => setDesktopCatsOpen(true)}
            onMouseLeave={() => setDesktopCatsOpen(false)}
          >
            <div
              className={cx(
                "absolute left-0 top-full z-[100] w-[min(920px,calc(100vw-32px))] origin-top border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition-all duration-200",
                desktopCatsOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-1 scale-[0.995] opacity-0"
              )}
              style={{ borderRadius: "2px" }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Kategoritë
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Eksploroni produktet sipas kategorisë
                  </p>
                </div>

                <NavLink
                  to="/shop"
                  onClick={() => setDesktopCatsOpen(false)}
                  className="group flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  Shiko të gjitha
                  <span>→</span>
                </NavLink>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4">
                {megaMenuCategories.map((section, sectionIndex) => (
                  <div
                    key={section.title}
                    className={cx(
                      "px-5 py-5 hover:bg-slate-50/70",
                      sectionIndex % 2 !== 0
                        ? "border-l border-slate-100"
                        : "",
                      sectionIndex >= 2
                        ? "border-t border-slate-100 xl:border-t-0"
                        : "",
                      sectionIndex > 0
                        ? "xl:border-l xl:border-slate-100"
                        : ""
                    )}
                  >
                    <NavLink
                      to={section.to}
                      onClick={() => setDesktopCatsOpen(false)}
                      className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3"
                    >
                      <span className="text-sm font-bold text-slate-900">
                        {section.title}
                      </span>

                      <span className="text-sm text-slate-300">→</span>
                    </NavLink>

                    <div className="space-y-0.5">
                      {section.items.map((item) => (
                        <NavLink
                          key={`${section.title}-${item.label}`}
                          to={shopSearchPath(item.query)}
                          onClick={() => setDesktopCatsOpen(false)}
                          className="flex min-h-9 items-center px-2 text-[13px] font-medium text-slate-600 transition hover:translate-x-1 hover:bg-emerald-50/70 hover:text-emerald-900"
                          style={{ borderRadius: "2px" }}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 border-t border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-center gap-2 border-r border-slate-200 px-4 py-3 text-xs text-slate-600">
                  <span className="font-bold text-emerald-800">✓</span>
                  Dërgesë falas mbi €100
                </div>

                <div className="flex items-center justify-center gap-2 border-r border-slate-200 px-4 py-3 text-xs text-slate-600">
                  <span className="font-bold text-emerald-800">✓</span>
                  Mbështetje 24/7
                </div>

                <div className="flex items-center justify-center gap-2 px-4 py-3 text-xs text-slate-600">
                  <span className="font-bold text-emerald-800">✓</span>
                  Garanci e përfshirë
                </div>
              </div>
            </div>
          </div>

          {/* CENTER LINKS */}

          <div className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center gap-3 lg:gap-4 xl:gap-9">
            <NavLink
              to="/outlet"
              className={({ isActive }) =>
                cx(
                  "flex h-full items-center whitespace-nowrap border-b text-[10px] font-medium transition lg:text-[11px] xl:border-b-2 xl:text-sm",
                  isActive
                    ? "border-[#348ef4] font-semibold text-[#1d4ed8]"
                    : "border-transparent text-[#0f172a] hover:border-[#348ef4] hover:text-[#1d4ed8]"
                )
              }
            >
              Outlet
            </NavLink>

            <NavLink
              to="/new"
              className={({ isActive }) =>
                cx(
                  "flex h-full items-center whitespace-nowrap border-b text-[10px] font-medium transition lg:text-[11px] xl:border-b-2 xl:text-sm",
                  isActive
                    ? "border-[#348ef4] font-semibold text-[#1d4ed8]"
                    : "border-transparent text-[#0f172a] hover:border-[#348ef4] hover:text-[#1d4ed8]"
                )
              }
            >
              Çfarë ka të re?
            </NavLink>

            <NavLink
              to="/giftcard"
              className={({ isActive }) =>
                cx(
                  "flex h-full items-center whitespace-nowrap border-b text-[10px] font-medium transition lg:text-[11px] xl:border-b-2 xl:text-sm",
                  isActive
                    ? "border-[#348ef4] font-semibold text-[#1d4ed8]"
                    : "border-transparent text-[#0f172a] hover:border-[#348ef4] hover:text-[#1d4ed8]"
                )
              }
            >
              Gift card
            </NavLink>
          </div>

          {/* RIGHT LINKS */}

          <div className="absolute right-4 top-0 flex h-full items-center gap-3 sm:right-6 lg:gap-4 xl:gap-9">
            <NavLink
              to="/support"
              className={({ isActive }) =>
                cx(
                  "flex h-full items-center whitespace-nowrap border-b text-[10px] font-medium transition lg:text-[11px] xl:border-b-2 xl:text-sm",
                  isActive
                    ? "border-[#348ef4] font-semibold text-[#1d4ed8]"
                    : "border-transparent text-[#0f172a] hover:border-[#348ef4] hover:text-[#1d4ed8]"
                )
              }
            >
              Support
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cx(
                  "flex h-full items-center whitespace-nowrap border-b text-[10px] font-medium transition lg:text-[11px] xl:border-b-2 xl:text-sm",
                  isActive
                    ? "border-[#348ef4] font-semibold text-[#1d4ed8]"
                    : "border-transparent text-[#0f172a] hover:border-[#348ef4] hover:text-[#1d4ed8]"
                )
              }
            >
              Chat
            </NavLink>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}

      <div className="mobile-bottom-navigation md:hidden">
        <nav className="fixed bottom-0 left-0 right-0 z-[90] border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-5 px-2 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cx(
                  "flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium",
                  isActive ? "text-emerald-900" : "text-slate-500"
                )
              }
            >
              <HomeIcon className="h-6 w-6" />
              <span>Ballina</span>
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setMobileCatsOpen(true);
                setSuggestOpen(false);
              }}
              className={cx(
                "flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium",
                mobileCatsOpen ? "text-emerald-900" : "text-slate-500"
              )}
              aria-expanded={mobileCatsOpen}
            >
              <MenuIcon className="h-6 w-6" />
              <span>Kategoritë</span>
            </button>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cx(
                  "relative flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium",
                  isActive ? "text-emerald-900" : "text-slate-500"
                )
              }
            >
              <CartIcon className="h-6 w-6" />
              <span>Shporta</span>

              {cartCount > 0 && (
                <span className="absolute right-3 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2d8fd5] px-1 text-[11px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                cx(
                  "flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium",
                  isActive ? "text-emerald-900" : "text-slate-500"
                )
              }
            >
              <HeartIcon className="h-6 w-6" />
              <span>Dëshirat</span>
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                cx(
                  "flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium",
                  isActive ? "text-emerald-900" : "text-slate-500"
                )
              }
            >
              <UserIcon className="h-6 w-6" />
              <span>Kyçu</span>
            </NavLink>
          </div>
        </nav>

        {mobileCatsOpen && (
          <div className="fixed inset-0 z-[95]">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileCatsOpen(false)}
              aria-label="Mbyll kategoritë"
            />

            <div className="absolute bottom-0 left-0 right-0 max-h-[85dvh] overflow-y-auto bg-white shadow-2xl">
              <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-slate-900">
                    Kategoritë
                  </p>

                  <button
                    type="button"
                    onClick={() => setMobileCatsOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center bg-slate-100 text-slate-900"
                    aria-label="Mbyll"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 pb-6">
                  <NavLink
                    to="/shop"
                    onClick={() => setMobileCatsOpen(false)}
                    className="border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-900"
                  >
                    Dyqani
                  </NavLink>

                  {categories.map((category) => (
                    <NavLink
                      key={category.to}
                      to={category.to}
                      onClick={() => setMobileCatsOpen(false)}
                      className="border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900"
                    >
                      {category.label}
                    </NavLink>
                  ))}

                  <NavLink
                    to="/outlet"
                    onClick={() => setMobileCatsOpen(false)}
                    className="border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900"
                  >
                    Outlet
                  </NavLink>

                  <NavLink
                    to="/new"
                    onClick={() => setMobileCatsOpen(false)}
                    className="border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900"
                  >
                    Çfarë ka të re?
                  </NavLink>

                  <NavLink
                    to="/giftcard"
                    onClick={() => setMobileCatsOpen(false)}
                    className="border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900"
                  >
                    Gift card
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          .navbar-topbar {
            background: #05080b;
            border-bottom: 1px solid #171c21;
          }

          .navbar-main {
            background: linear-gradient(
              90deg,
              #0b1015 0%,
              #10151a 52%,
              #0b1015 100%
            );
            border-bottom: 1px solid #252b31;
          }

          .navbar-secondary {
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
          }

          .navbar-search {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
          }

          .navbar-search input {
            color: #0f0f0f;
          }

          .navbar-search input::placeholder {
            color: #b5b8bc;
            opacity: 1;
          }

          .navbar-search-button:not(:disabled) {
            color: #64748b;
          }

          .navbar-search-button:hover:not(:disabled) {
            background: #f1f5f9;
            color: #0f172a;
          }

          .navbar-action {
            background: #1a2026;
            border: 1px solid #252c33;
            color: #f7f8f9;
          }

          .navbar-action:hover {
            background: #242b32;
            border-color: #303840;
          }

          .navbar-count {
            background: #348ef4;
          }

          @supports (padding-bottom: env(safe-area-inset-bottom)) {
            .mobile-bottom-navigation nav {
              padding-bottom: env(safe-area-inset-bottom);
            }
          }
        `}
      </style>

      <CategoriesMenu />
    </header>
  );
}