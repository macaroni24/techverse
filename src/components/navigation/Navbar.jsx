import { NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useStore } from "../../store/StoreProvider";
import { products } from "../../data/products";

const categories = [
  { label: "Gaming", to: "/gaming" },
  { label: "Laptops & Phones", to: "/shop?category=laptops-phones" },
  { label: "Accessories", to: "/shop?category=Smart%20Accessories" },
  { label: "Monitors", to: "/shop?category=Monitors" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatPriceEUR(v) {
  const n = Number(v || 0);
  return `€${n.toFixed(2)}`;
}

function SearchIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.5s-7-4.5-9.2-8.8C1.3 8.8 3.2 6 6.4 6c1.8 0 3.3.9 4.2 2 0 0 .9-2 4.2-2C18 6 20 8.8 21.2 11.7 19 16 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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

function ChatIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5A3.5 3.5 0 0 1 7.5 2h9A3.5 3.5 0 0 1 20 5.5v7A3.5 3.5 0 0 1 16.5 16H9l-4.5 4V5.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
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

  const navigate = useNavigate();
  const canSearch = useMemo(() => query.trim().length > 0, [query]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    function onDown(e) {
      const inside = e.target.closest?.('[data-searchbox="true"]');
      if (!inside) setSuggestOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setSuggestOpen(false);
        setMobileCatsOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function goToShopSearch(val) {
    const q = String(val || "").trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setSuggestOpen(false);
    setMobileCatsOpen(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    goToShopSearch(query);
  }

  function SuggestionsDropdown({ className = "" }) {
    if (!suggestOpen) return null;

    if (query.trim() && suggestions.length === 0) {
      return (
        <div
          className={cx(
            "absolute left-0 right-0 mt-2 z-[80] rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-lg",
            className
          )}
        >
          No results. Press <span className="font-semibold">Search</span> to view in Shop.
        </div>
      );
    }

    if (suggestions.length === 0) return null;

    return (
      <div
        className={cx(
          "absolute left-0 right-0 mt-2 z-[80] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg",
          className
        )}
      >
        <div className="max-h-80 overflow-auto">
          {suggestions.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goToShopSearch(p.title)}
              className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition"
            >
              <div className="h-11 w-11 shrink-0 rounded-md bg-slate-50 p-1">
                <img src={p.image} alt={p.title} className="h-full w-full object-contain" loading="lazy" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{p.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {p.brand} • {p.category}
                </p>
              </div>

              <div className="shrink-0 text-sm font-bold text-emerald-900">
                {formatPriceEUR(p.price)}
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-slate-100 bg-white px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing top {suggestions.length} results</p>
          <button
            type="button"
            onClick={() => goToShopSearch(query)}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            View all
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-emerald-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <p className="text-xs text-white/80">
            Free delivery over <span className="font-semibold text-white">€100</span>
          </p>
          <p className="text-xs text-white/80">
            Support: <span className="font-semibold text-white">24/7</span>
          </p>
        </div>
      </div>

      <div className="bg-emerald-900 text-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-3">
              <NavLink to="/" className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white">
                  <span className="text-lg font-bold text-emerald-900">T</span>
                </span>
                <div className="leading-tight">
                  <p className="text-lg font-semibold tracking-wide">TechVerse</p>
                  <p className="text-xs text-white/75">Gaming • PCs • Phones</p>
                </div>
              </NavLink>

              <div className="flex items-center gap-2">
                <NavLink
                  to="/wishlist"
                  className="relative inline-flex h-10 items-center justify-center rounded-md bg-white px-3 text-slate-900 hover:bg-slate-50 transition"
                  aria-label="Wishlist"
                >
                  <HeartIcon className="h-5 w-5 text-slate-900" />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-bold text-white">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  className="relative inline-flex h-10 items-center justify-center rounded-md bg-orange-500 px-3 text-white hover:bg-orange-600 transition"
                  aria-label="Cart"
                >
                  <CartIcon className="h-5 w-5 text-white" />
                  <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-xs font-bold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                </NavLink>
              </div>
            </div>

            <div className="mt-3">
              <div data-searchbox="true" className="relative">
                <form onSubmit={onSubmit}>
                  <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2">
                    <SearchIcon className="h-5 w-5 text-slate-900" />
                    <input
                      value={query}
                      onChange={(e) => {
                        const v = e.target.value;
                        setQuery(v);
                        setSuggestOpen(v.trim().length > 0);
                      }}
                      onFocus={() => {
                        if (query.trim()) setSuggestOpen(true);
                      }}
                      placeholder="Search gaming PCs, phones, accessories..."
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!canSearch}
                      className={cx(
                        "rounded-md px-4 py-2 text-sm font-semibold transition",
                        canSearch
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      )}
                    >
                      Search
                    </button>
                  </div>
                </form>

                <SuggestionsDropdown />
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <NavLink to="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white">
                <span className="text-lg font-bold text-emerald-900">T</span>
              </span>
              <div className="leading-tight">
                <p className="text-lg font-semibold tracking-wide">TechVerse</p>
                <p className="text-xs text-white/75">Gaming • PCs • Phones</p>
              </div>
            </NavLink>

            <form onSubmit={onSubmit} className="flex-1">
              <div data-searchbox="true" className="relative">
                <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2">
                  <SearchIcon className="h-5 w-5 text-slate-900" />
                  <input
                    value={query}
                    onChange={(e) => {
                      const v = e.target.value;
                      setQuery(v);
                      setSuggestOpen(v.trim().length > 0);
                    }}
                    onFocus={() => {
                      if (query.trim()) setSuggestOpen(true);
                    }}
                    placeholder="Search gaming PCs, phones, accessories..."
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!canSearch}
                    className={cx(
                      "rounded-md px-4 py-2 text-sm font-semibold transition",
                      canSearch
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    Search
                  </button>
                </div>

                <SuggestionsDropdown />
              </div>
            </form>

            <NavLink
              to="/wishlist"
              className="relative inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
            >
              <HeartIcon className="h-5 w-5 text-slate-900" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-bold text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              <CartIcon className="h-5 w-5 text-white" />
              Cart
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-xs font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            </NavLink>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto hidden max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3 sm:px-6 md:flex">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                cx(
                  "whitespace-nowrap text-sm font-medium transition",
                  isActive
                    ? "text-white underline underline-offset-8"
                    : "text-white/90 hover:text-white"
                )
              }
            >
              Shop
            </NavLink>

            {categories.map((c) => (
              <NavLink
                key={c.to}
                to={c.to}
                className="whitespace-nowrap text-sm font-medium text-white/90 hover:text-white transition"
              >
                {c.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <nav className="fixed bottom-0 left-0 right-0 z-[90] border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-5 px-2 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cx(
                  "flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-medium",
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
                "flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-medium",
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
                  "relative flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-medium",
                  isActive ? "text-emerald-900" : "text-slate-500"
                )
              }
            >
              <CartIcon className="h-6 w-6" />
              <span>Shporta</span>
              {cartCount > 0 && (
                <span className="absolute right-3 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                cx(
                  "flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-medium",
                  isActive ? "text-emerald-900" : "text-slate-500"
                )
              }
            >
              <ChatIcon className="h-6 w-6" />
              <span>Wishlist</span>
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                cx(
                  "flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-medium",
                  isActive ? "text-emerald-900" : "text-slate-500"
                )
              }
            >
              <UserIcon className="h-6 w-6" />
              <span>Kyçu</span>
            </NavLink>
          </div>
        </nav>

        <div className="h-16" aria-hidden="true" />
        {mobileCatsOpen && (
          <div className="fixed inset-0 z-[95]">
            {/* overlay */}
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileCatsOpen(false)}
              aria-label="Close categories"
            />

            <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl">
              <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-slate-900">Kategoritë</p>
                  <button
                    type="button"
                    onClick={() => setMobileCatsOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition"
                    aria-label="Close"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 pb-6">
                  <NavLink
                    to="/shop"
                    onClick={() => setMobileCatsOpen(false)}
                    className="rounded-md border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Shop
                  </NavLink>

                  {categories.map((c) => (
                    <NavLink
                      key={c.to}
                      to={c.to}
                      onClick={() => setMobileCatsOpen(false)}
                      className="rounded-md border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
                    >
                      {c.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
