import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  { label: "Home", to: "/" },
  { label: "Gaming", to: "/gaming" },
  { label: "Laptopë & Telefona", to: "/laptops-phones" },
  { label: "Aksesorë", to: "/Accessories" },
  { label: "Monitorë", to: "/Monitors" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DropdownLinks() {
  return (
    <>
      {categories.map((category) => (
        <NavLink
          key={category.to}
          to={category.to}
          className={({ isActive }) =>
            cx(
              "flex items-center justify-between px-5 py-4 text-sm transition",
              isActive
                ? "bg-emerald-50 font-semibold text-emerald-900"
                : "font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            )
          }
        >
          <span>{category.label}</span>
          <span className="text-slate-400">→</span>
        </NavLink>
      ))}
    </>
  );
}

export default function CategoriesMenu({
  variant = "topbar",
  disableDropdown = false,
}) {
  const [open, setOpen] = useState(false);

  if (variant === "sidebar") {
    return (
      <div className="hidden h-full rounded-md border border-slate-200 bg-white lg:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Kategoritë
          </h2>
        </div>

        <nav className="flex flex-col py-2">
          <DropdownLinks />
        </nav>

        <div className="border-t border-slate-200 px-5 py-4">
          <div className="space-y-2 text-sm text-slate-600">
            <p>✓ Dërgesë falas mbi €100</p>
            <p>✓ Mbështetje 24/7</p>
            <p>✓ Garanci e përfshirë</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-40 hidden w-full border-b border-slate-200 bg-slate-100 lg:block">
      <div className="mx-auto max-w-7xl overflow-visible px-4 sm:px-6">
        <div className="relative flex items-center justify-between py-5">
          <div className="flex items-center gap-8">
            <div
              className="relative z-50"
              onMouseEnter={() => {
                if (!disableDropdown) setOpen(true);
              }}
              onMouseLeave={() => {
                if (!disableDropdown) setOpen(false);
              }}
            >
              <button
                type="button"
                className={cx(
                  "flex items-center gap-3 text-sm font-semibold text-slate-900 transition",
                  disableDropdown ? "cursor-default" : "hover:text-emerald-600"
                )}
              >
                <span className="text-lg leading-none">☰</span>
                <span>Kategoritë</span>
              </button>

              {!disableDropdown && (
                <div
                  className={cx(
                    "absolute left-0 top-full z-[999] mt-3 w-[270px] rounded-xl border border-slate-200 bg-white shadow-2xl transition-all duration-200",
                    open
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  )}
                >
                  <nav className="flex flex-col py-2">
                    <DropdownLinks />
                  </nav>

                  <div className="border-t border-slate-200 px-5 py-3">
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>✓ Dërgesë falas mbi €100</p>
                      <p>✓ Mbështetje 24/7</p>
                      <p>✓ Garanci e përfshirë</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/outlet"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
            >
              Outlet
            </Link>

            <Link
              to="/new"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
            >
              Çfarë ka të re?
            </Link>

            <Link
              to="/giftcard"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
            >
              Gift card
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <Link
              to="/support"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
            >
              Support
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
            >
              Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}