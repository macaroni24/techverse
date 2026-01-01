import { NavLink } from "react-router-dom";

function SectionTitle({ children }) {
  return (
    <p className="text-sm font-semibold text-slate-900">{children}</p>
  );
}

function FooterLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="text-sm text-slate-600 hover:text-emerald-900 transition"
    >
      {children}
    </NavLink>
  );
}

function ChipLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900 transition"
    >
      {children}
    </NavLink>
  );
}

function Badge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
      <span className="h-2 w-2 rounded-full bg-emerald-900" />
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      {/* Newsletter / CTA */}
      <div className="bg-emerald-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/15">
                TechVerse Deals & Drops
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Get weekly deals, new arrivals, and gaming drops.
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/80 max-w-xl">
                Subscribe to the TechVerse newsletter and get updates on the best
                prices for gaming PCs, phones, accessories, and components.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-white/70">
                By subscribing you agree to receive emails. You can unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand + Contact */}
          <div>
            <NavLink to="/" className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-900 text-white">
                <span className="text-lg font-bold">T</span>
              </span>
              <div className="leading-tight">
                <p className="text-lg font-semibold text-slate-900">TechVerse</p>
                <p className="text-xs text-slate-600">
                  Gaming • PCs • Phones • Accessories
                </p>
              </div>
            </NavLink>

            <p className="mt-4 text-sm leading-6 text-slate-600 max-w-md">
              TechVerse is a modern e-commerce frontend built with React and Tailwind.
              Browse products, save to wishlist, and manage your cart with a clean UI.
            </p>

            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Support:</span>{" "}
                support@techverse.com
              </p>
              <p>
                <span className="font-semibold text-slate-900">Phone:</span>{" "}
                +383 44 000 000
              </p>
              <p>
                <span className="font-semibold text-slate-900">Hours:</span>{" "}
                Mon–Sat 09:00–21:00
              </p>
              <p>
                <span className="font-semibold text-slate-900">Location:</span>{" "}
                Prishtina, Kosovo
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>Secure Checkout</Badge>
              <Badge>Fast Delivery</Badge>
              <Badge>Easy Returns</Badge>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <SectionTitle>Shop</SectionTitle>
              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/shop?category=Gaming">Gaming</FooterLink>
                <FooterLink to="/shop?category=Gaming%20PCs">Gaming PCs</FooterLink>
                <FooterLink to="/shop?category=Phones">Phones</FooterLink>
                <FooterLink to="/shop?category=Laptops">Laptops</FooterLink>
                <FooterLink to="/shop?category=Monitors">Monitors</FooterLink>
                <FooterLink to="/shop?category=PC%20Components">PC Components</FooterLink>
                <FooterLink to="/shop?sort=discount">Discounts</FooterLink>
              </div>
            </div>

            <div>
              <SectionTitle>Customer Service</SectionTitle>
              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/help/shipping">Shipping Info</FooterLink>
                <FooterLink to="/help/returns">Returns & Refunds</FooterLink>
                <FooterLink to="/help/warranty">Warranty</FooterLink>
                <FooterLink to="/help/faq">FAQ</FooterLink>
                <FooterLink to="/help/contact">Contact Support</FooterLink>
                <FooterLink to="/help/orders">Track Order</FooterLink>
              </div>
            </div>

            <div>
              <SectionTitle>Company</SectionTitle>
              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/about">About TechVerse</FooterLink>
                <FooterLink to="/careers">Careers</FooterLink>
                <FooterLink to="/blog">Tech Blog</FooterLink>
                <FooterLink to="/stores">Stores</FooterLink>
                <FooterLink to="/partners">Partners</FooterLink>
              </div>
            </div>

            <div>
              <SectionTitle>Account</SectionTitle>
              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/login">Sign In</FooterLink>
                <FooterLink to="/register">Create Account</FooterLink>
                <FooterLink to="/orders">Orders</FooterLink>
                <FooterLink to="/wishlist">Wishlist</FooterLink>
                <FooterLink to="/cart">Cart</FooterLink>
              </div>
            </div>

            <div>
              <SectionTitle>Legal</SectionTitle>
              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/legal/terms">Terms of Service</FooterLink>
                <FooterLink to="/legal/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/legal/cookies">Cookies Policy</FooterLink>
                <FooterLink to="/legal/refunds">Refund Policy</FooterLink>
                <FooterLink to="/legal/accessibility">Accessibility</FooterLink>
              </div>
            </div>
          </div>
        </div>



        {/* Payments / Shipping / Security */}
        <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Payment Methods</p>
              <p className="mt-2 text-sm text-slate-600">
                Visa, Mastercard, PayPal (UI only).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Visa</Badge>
                <Badge>Mastercard</Badge>
                <Badge>PayPal</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Shipping</p>
              <p className="mt-2 text-sm text-slate-600">
                Standard 1–3 days • Express available.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Standard</Badge>
                <Badge>Express</Badge>
                <Badge>Pickup</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Security</p>
              <p className="mt-2 text-sm text-slate-600">
                Secure checkout and protected data (frontend demo).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>SSL</Badge>
                <Badge>Encrypted</Badge>
                <Badge>Protected</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TechVerse. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 text-xs">
            <NavLink to="/legal/privacy" className="text-slate-500 hover:text-emerald-900 transition">
              Privacy
            </NavLink>
            <NavLink to="/legal/terms" className="text-slate-500 hover:text-emerald-900 transition">
              Terms
            </NavLink>
            <NavLink to="/legal/cookies" className="text-slate-500 hover:text-emerald-900 transition">
              Cookies
            </NavLink>
            <NavLink to="/help/contact" className="text-slate-500 hover:text-emerald-900 transition">
              Support
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
