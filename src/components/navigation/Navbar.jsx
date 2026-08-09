import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useStore } from "../../store/StoreProvider";
import { products } from "../../data/products";

import {
  categoryGroups,
  CategoryMegaPanel,
  shopSearchPath,
} from "../shop/CategoriesMenu";

import logo from "../../assets/logo.png";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatPriceEUR(value) {
  return `€${Number(value || 0).toFixed(2)}`;
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
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
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
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

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const [homeScrolled, setHomeScrolled] =
    useState(false);

  const [query, setQuery] = useState("");

  const [suggestOpen, setSuggestOpen] =
    useState(false);

  const [mobileCatsOpen, setMobileCatsOpen] =
    useState(false);

  const [desktopCatsOpen, setDesktopCatsOpen] =
    useState(false);

  const [
    desktopCategoryIndex,
    setDesktopCategoryIndex,
  ] = useState(0);

  const desktopCloseTimer = useRef(null);

  const activeDesktopCategory =
    categoryGroups[desktopCategoryIndex] ||
    categoryGroups[0];

  const showDesktopCategories =
    !isHome || homeScrolled;

  useEffect(() => {
    if (!isHome) {
      setHomeScrolled(true);
      return;
    }

    function handleScroll() {
      const y = window.scrollY;

      setHomeScrolled((current) => {
        if (y >= 90) {
          return true;
        }

        if (y <= 25) {
          return false;
        }

        return current;
      });
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [isHome]);

  useEffect(() => {
    if (!showDesktopCategories) {
      setDesktopCatsOpen(false);
    }
  }, [showDesktopCategories]);

  const canSearch = useMemo(
    () => query.trim().length > 0,
    [query]
  );

  const suggestions = useMemo(() => {
    const search =
      query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return products
      .filter((product) => {
        const searchable = [
          product.title,
          product.brand,
          product.category,
          product.section,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(search);
      })
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    function handleMouseDown(event) {
      const inside =
        event.target.closest?.(
          '[data-searchbox="true"]'
        );

      if (!inside) {
        setSuggestOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleMouseDown
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleMouseDown
      );
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSuggestOpen(false);
        setMobileCatsOpen(false);
        setDesktopCatsOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  function goToShopSearch(value) {
    const search =
      String(value || "").trim();

    if (!search) {
      return;
    }

    navigate(shopSearchPath(search));

    setQuery(search);
    setSuggestOpen(false);
    setMobileCatsOpen(false);
    setDesktopCatsOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    goToShopSearch(query);
  }

  function cancelDesktopClose() {
    if (desktopCloseTimer.current) {
      clearTimeout(
        desktopCloseTimer.current
      );

      desktopCloseTimer.current = null;
    }
  }

  function openDesktopCategories() {
    cancelDesktopClose();
    setDesktopCatsOpen(true);
  }

  function closeDesktopCategoriesLater() {
    cancelDesktopClose();

    desktopCloseTimer.current =
      setTimeout(() => {
        setDesktopCatsOpen(false);
      }, 180);
  }

  function closeDesktopCategories() {
    cancelDesktopClose();
    setDesktopCatsOpen(false);
  }

  function SuggestionsDropdown() {
    if (!suggestOpen) {
      return null;
    }

    if (
      query.trim() &&
      suggestions.length === 0
    ) {
      return (
        <div className="absolute left-0 right-0 z-[190] mt-2 rounded-[4px] border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-xl">
          Nuk u gjet asgjë.
        </div>
      );
    }

    if (!suggestions.length) {
      return null;
    }

    return (
      <div className="absolute left-0 right-0 z-[190] mt-2 overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-xl">
        <div className="max-h-80 overflow-auto">
          {suggestions.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() =>
                goToShopSearch(product.title)
              }
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
            >
              <div className="h-11 w-11 shrink-0 bg-slate-50 p-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {product.title}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {product.brand} •{" "}
                  {product.category}
                </p>
              </div>

              <span className="text-sm font-bold text-emerald-900">
                {formatPriceEUR(product.price)}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <span className="text-xs text-slate-500">
            {suggestions.length} rezultate
          </span>

          <button
            type="button"
            onClick={() =>
              goToShopSearch(query)
            }
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Shiko të gjitha
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-[120] w-full">
      <div className="bg-emerald-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6">
          <p className="text-[11px] text-white/80 sm:text-xs">
            Dërgesë falas mbi{" "}
            <span className="font-semibold text-white">
              €100
            </span>
          </p>

          <p className="text-[11px] text-white/80 sm:text-xs">
            Mbështetje:{" "}
            <span className="font-semibold text-white">
              24/7
            </span>
          </p>
        </div>
      </div>

      <div className="bg-emerald-900 text-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-3">
              <NavLink
                to="/"
                className="flex shrink-0 items-center"
              >
                <img
                  src={logo}
                  alt="Verse Tech"
                  className="h-10 w-auto object-contain"
                />
              </NavLink>

              <div className="flex items-center gap-1">
                <NavLink
                  to="/wishlist"
                  className="relative flex h-10 w-10 items-center justify-center rounded-[3px] hover:bg-white/10"
                >
                  <HeartIcon className="h-5 w-5" />

                  {wishlistCount > 0 && (
                    <span className="absolute right-0 top-0 flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold">
                      {wishlistCount > 99
                        ? "99+"
                        : wishlistCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-[3px] hover:bg-white/10"
                >
                  <CartIcon className="h-5 w-5" />

                  {cartCount > 0 && (
                    <span className="absolute right-0 top-0 flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold">
                      {cartCount > 99
                        ? "99+"
                        : cartCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/login"
                  className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-white/10"
                >
                  <UserIcon className="h-5 w-5" />
                </NavLink>
              </div>
            </div>

            <div className="mt-2.5">
              <div
                data-searchbox="true"
                className="relative"
              >
                <form onSubmit={handleSubmit}>
                  <div className="flex h-10 items-center rounded-full bg-white px-4">
                    <input
                      value={query}
                      onChange={(event) => {
                        const value =
                          event.target.value;

                        setQuery(value);

                        setSuggestOpen(
                          value.trim().length > 0
                        );
                      }}
                      onFocus={() => {
                        if (query.trim()) {
                          setSuggestOpen(true);
                        }
                      }}
                      placeholder="Kërko produkte..."
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
                    />

                    <button
                      type="submit"
                      disabled={!canSearch}
                      className="ml-2 text-slate-500 disabled:text-slate-300"
                    >
                      <SearchIcon className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                <SuggestionsDropdown />
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-between gap-6 md:flex">
            <NavLink
              to="/"
              className="flex shrink-0 items-center"
            >
              <img
                src={logo}
                alt="Verse Tech"
                className="h-10 w-auto object-contain"
              />
            </NavLink>

            <div className="w-full max-w-[680px]">
              <div
                data-searchbox="true"
                className="relative"
              >
                <form onSubmit={handleSubmit}>
                  <div className="flex h-10 items-center rounded-full bg-white px-4">
                    <input
                      value={query}
                      onChange={(event) => {
                        const value =
                          event.target.value;

                        setQuery(value);

                        setSuggestOpen(
                          value.trim().length > 0
                        );
                      }}
                      onFocus={() => {
                        if (query.trim()) {
                          setSuggestOpen(true);
                        }
                      }}
                      placeholder="Kërko produkte..."
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
                    />

                    <button
                      type="submit"
                      disabled={!canSearch}
                      className="ml-2 text-slate-500 disabled:text-slate-300"
                    >
                      <SearchIcon className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                <SuggestionsDropdown />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <NavLink
                to="/wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-[3px] hover:bg-white/10"
              >
                <HeartIcon className="h-5 w-5" />

                {wishlistCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 min-w-5 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold">
                    {wishlistCount > 99
                      ? "99+"
                      : wishlistCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-[3px] hover:bg-white/10"
              >
                <CartIcon className="h-5 w-5" />

                {cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 min-w-5 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold">
                    {cartCount > 99
                      ? "99+"
                      : cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/login"
                className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-white/10"
              >
                <UserIcon className="h-5 w-5" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden border-b border-slate-200 bg-white md:block">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex h-full items-center gap-7 lg:gap-9">
            <div
              className={cx(
                "relative flex h-full items-center",
                !showDesktopCategories &&
                  "lg:hidden",
                showDesktopCategories &&
                  "animate-[categoryButtonIn_.45s_cubic-bezier(0.22,1,0.36,1)]"
              )}
              onMouseEnter={openDesktopCategories}
              onMouseLeave={closeDesktopCategoriesLater}
            >
              <button
                type="button"
                onClick={() => {
                  cancelDesktopClose();

                  setDesktopCatsOpen(
                    (current) => !current
                  );
                }}
                className={cx(
                  "flex h-full items-center gap-2 border-b-2 text-sm font-semibold transition-colors duration-200",
                  desktopCatsOpen
                    ? "border-emerald-700 text-emerald-800"
                    : "border-transparent text-slate-800 hover:border-emerald-700 hover:text-emerald-700"
                )}
              >
                <MenuIcon className="h-4 w-4" />

                <span>Kategoritë</span>
              </button>

              <div
                className={cx(
                  "absolute left-0 top-full z-[170] flex w-[min(1050px,calc(100vw-2rem))] origin-top-left overflow-hidden rounded-b-[7px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition-all duration-250 ease-out",
                  desktopCatsOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible pointer-events-none -translate-y-1 scale-[0.995] opacity-0"
                )}
                onMouseEnter={cancelDesktopClose}
                onMouseLeave={closeDesktopCategoriesLater}
              >
                <div className="w-[230px] shrink-0 border-r border-slate-200">
                  <div className="flex h-12 items-center border-b border-slate-200 px-4">
                    <MenuIcon className="mr-2.5 h-4 w-4 text-emerald-900" />

                    <span className="text-[14px] font-bold text-slate-900">
                      Kategoritë
                    </span>
                  </div>

                  <div className="h-[302px]">
                    {categoryGroups.map(
                      (category, index) => {
                        const selected =
                          desktopCategoryIndex ===
                          index;

                        return (
                          <NavLink
                            key={category.label}
                            to={category.to}
                            onMouseEnter={() =>
                              setDesktopCategoryIndex(
                                index
                              )
                            }
                            onClick={
                              closeDesktopCategories
                            }
                            className={`group flex h-[50.33px] items-center justify-between border-b border-slate-100 px-4 text-[13px] font-medium transition-all duration-200 last:border-b-0 ${
                              selected
                                ? "bg-emerald-50 font-semibold text-emerald-900"
                                : "text-slate-700 hover:bg-slate-50 hover:text-emerald-900"
                            }`}
                          >
                            <span>
                              {category.label}
                            </span>

                            <ArrowIcon
                              className={`h-4 w-4 ${
                                selected
                                  ? "text-emerald-700"
                                  : "text-slate-300"
                              }`}
                            />
                          </NavLink>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <CategoryMegaPanel
                    category={
                      activeDesktopCategory
                    }
                    className="h-[350px]"
                    onNavigate={
                      closeDesktopCategories
                    }
                  />
                </div>
              </div>
            </div>

            <NavLink
              to="/outlet"
              className="flex h-full items-center text-sm font-medium text-slate-700 transition hover:text-emerald-700"
            >
              Outlet
            </NavLink>

            <NavLink
              to="/new"
              className="flex h-full items-center text-sm font-medium text-slate-700 transition hover:text-emerald-700"
            >
              Çfarë ka të re?
            </NavLink>

            <NavLink
              to="/giftcard"
              className="flex h-full items-center text-sm font-medium text-slate-700 transition hover:text-emerald-700"
            >
              Gift card
            </NavLink>
          </div>

          <div className="flex h-full items-center gap-7">
            <NavLink
              to="/support"
              className="flex h-full items-center text-sm font-medium text-slate-700 hover:text-emerald-700"
            >
              Support
            </NavLink>

            <NavLink
              to="/contact"
              className="flex h-full items-center text-sm font-medium text-slate-700 hover:text-emerald-700"
            >
              Chat
            </NavLink>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <nav className="fixed bottom-0 left-0 right-0 z-[170] border-t border-slate-200 bg-white">
          <div className="grid grid-cols-5 px-2 py-2">
            <NavLink
              to="/"
              className="flex flex-col items-center gap-1 text-[11px] text-slate-500"
            >
              <HomeIcon className="h-6 w-6" />
              Ballina
            </NavLink>

            <button
              type="button"
              onClick={() =>
                setMobileCatsOpen(true)
              }
              className="flex flex-col items-center gap-1 text-[11px] text-slate-500"
            >
              <MenuIcon className="h-6 w-6" />
              Kategoritë
            </button>

            <NavLink
              to="/cart"
              className="flex flex-col items-center gap-1 text-[11px] text-slate-500"
            >
              <CartIcon className="h-6 w-6" />
              Shporta
            </NavLink>

            <NavLink
              to="/wishlist"
              className="flex flex-col items-center gap-1 text-[11px] text-slate-500"
            >
              <HeartIcon className="h-6 w-6" />
              Dëshirat
            </NavLink>

            <NavLink
              to="/login"
              className="flex flex-col items-center gap-1 text-[11px] text-slate-500"
            >
              <UserIcon className="h-6 w-6" />
              Kyçu
            </NavLink>
          </div>
        </nav>

        {mobileCatsOpen && (
          <div className="fixed inset-0 z-[180]">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={() =>
                setMobileCatsOpen(false)
              }
            />

            <div className="absolute bottom-0 left-0 right-0 max-h-[82vh] overflow-auto rounded-t-[8px] bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold">
                  Kategoritë
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setMobileCatsOpen(false)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded bg-slate-100"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {categoryGroups.map(
                  (category) => (
                    <NavLink
                      key={category.label}
                      to={category.to}
                      onClick={() =>
                        setMobileCatsOpen(false)
                      }
                      className="flex items-center justify-between rounded border border-slate-200 px-4 py-3 text-sm"
                    >
                      {category.label}

                      <ArrowIcon className="h-4 w-4 text-slate-300" />
                    </NavLink>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes categoryButtonIn {
            from {
              opacity: 0;
              transform: translateX(-12px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </header>
  );
}