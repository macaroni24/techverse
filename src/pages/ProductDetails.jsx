import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import { useStore } from "../store/StoreProvider";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

function formatPriceEUR(value) {
  const num = Number(value || 0);
  return `€${num.toFixed(2)}`;
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const hasDiscount =
    product && typeof product.oldPrice === "number" && product.oldPrice > product.price;

  const discountPct = useMemo(() => {
    if (!product || !hasDiscount) return null;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [product, hasDiscount]);

  const gallery = useMemo(() => {
    if (!product) return [];
    const imgs =
      Array.isArray(product.images) && product.images.length
        ? product.images
        : [product.image];
    return imgs.filter(Boolean);
  }, [product]);

  const similarProducts = useMemo(() => {
    if (!product) return [];

    const currentSection = (product.section || "").toLowerCase();
    const currentCategory = (product.category || "").toLowerCase();

    const sameCategory = products
      .filter((p) => String(p.id) !== String(product.id))
      .filter((p) => {
        const section = (p.section || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        return (
          (currentSection && section === currentSection) ||
          (currentCategory && category === currentCategory)
        );
      })
      .slice(0, 4);

    const usedIds = new Set([String(product.id), ...sameCategory.map((p) => String(p.id))]);

    const randomOther = shuffleArray(
      products.filter((p) => {
        const section = (p.section || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        return (
          !usedIds.has(String(p.id)) &&
          section !== currentSection &&
          category !== currentCategory
        );
      })
    ).slice(0, 4);

    return [...sameCategory, ...randomOther];
  }, [product]);

  const activeImage = gallery[activeIndex] || product?.image;

  function decQty() {
    setQty((q) => Math.max(1, q - 1));
  }

  function incQty() {
    const cap = product?.stock ? product.stock : 99;
    setQty((q) => Math.min(cap, q + 1));
  }

  function handleAddToCart() {
    if (!product || product.stock === 0) return;
    for (let i = 0; i < qty; i += 1) addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  function handleBuyNow() {
    if (!product || product.stock === 0) return;
    navigate("/paying", { state: { product, qty } });
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">Produkti nuk u gjet</h1>
            <p className="mt-2 text-sm text-slate-600">
              Produkti që po kërkoni nuk ekziston ose është larguar.
            </p>
            <NavLink
              to="/shop"
              className="mt-6 inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Kthehu te Dyqani
            </NavLink>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const wish = isWishlisted(product.id);
  const rating = product.rating ?? 4.6;
  const reviews = product.reviewsCount ?? 128;
  const sku = product.sku ?? product.id;

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            <span aria-hidden>←</span> Kthehu
          </button>

          {product.badge && (
            <span className="rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold text-white">
              {product.badge}
            </span>
          )}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[72px_1fr]">
                <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
                  {gallery.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-slate-50 p-1 transition sm:h-16 sm:w-16 ${
                        idx === activeIndex
                          ? "border-orange-500"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      aria-label={`Zgjidh imazhin ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-50">
                    <img
                      src={activeImage}
                      alt={product.title}
                      className="h-[260px] w-full object-contain p-4 sm:h-[340px] sm:p-6 lg:h-[420px]"
                      loading="lazy"
                    />

                    {hasDiscount && (
                      <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold text-white sm:left-4 sm:top-4">
                        -{discountPct}%
                      </span>
                    )}

                    {gallery.length > 1 && (
                      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 sm:right-4 sm:top-4">
                        {activeIndex + 1} / {gallery.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="text-sm font-semibold text-orange-600">{product.brand}</div>

              <h1 className="mt-1 text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
                {product.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <span className="text-orange-600">★</span>
                  <span className="font-semibold text-slate-900">{rating.toFixed(1)}</span>
                  <span className="text-slate-500">({reviews})</span>
                </span>
                <span className="text-slate-300">•</span>
                <span>
                  SKU: <span className="font-semibold text-slate-900">{sku}</span>
                </span>
              </div>

              <div className="mt-5">
                <div className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {formatPriceEUR(product.price)}
                </div>

                {hasDiscount && (
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span className="line-through">{formatPriceEUR(product.oldPrice)}</span>
                    <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                      Kurseni {formatPriceEUR(product.oldPrice - product.price)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Sasia</div>
                  {product.stock === 0 ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      Pa stok
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
                      Në stok ({product.stock})
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="inline-flex items-center rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={decQty}
                      className="h-11 w-11 rounded-l-xl text-lg font-semibold text-slate-700 hover:bg-slate-50"
                      aria-label="Zvogëlo sasinë"
                    >
                      −
                    </button>
                    <div className="min-w-[52px] text-center text-sm font-semibold text-slate-900">
                      {qty}
                    </div>
                    <button
                      type="button"
                      onClick={incQty}
                      className="h-11 w-11 rounded-r-xl text-lg font-semibold text-slate-700 hover:bg-slate-50"
                      aria-label="Rrit sasinë"
                      disabled={product.stock !== 0 && qty >= product.stock}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-1 gap-3">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        product.stock === 0
                          ? "cursor-not-allowed bg-slate-200 text-slate-400"
                          : added
                          ? "bg-emerald-900 text-white"
                          : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {product.stock === 0
                        ? "Pa stok"
                        : added
                        ? "U shtua"
                        : "Shto"}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-semibold transition ${
                        wish
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                          : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                      }`}
                      aria-label={wish ? "Largo nga lista e dëshirave" : "Shto në listën e dëshirave"}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                        <path
                          d="M12 20.5s-7-4.5-9.2-8.8C1.3 8.8 3.2 6 6.4 6c1.8 0 3.3.9 4.2 2 0 0 .9-2 4.2-2C18 6 20 8.8 21.2 11.7 19 16 12 20.5 12 20.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`mt-3 w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    product.stock === 0
                      ? "cursor-not-allowed bg-slate-200 text-slate-400"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  Bli tani
                </button>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="grid gap-2 text-sm text-slate-600">
                  <div className="flex items-start justify-between gap-3">
                    <span>Dërgesa</span>
                    <span className="font-semibold text-slate-900">2–4 ditë pune</span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span>Pagesa</span>
                    <span className="font-semibold text-slate-900">E sigurt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Produkte të ngjashme</h2>
                <p className="mt-1 text-sm text-slate-600">
                  4 të së njëjtës kategori dhe 4 të tjera të përzgjedhura.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {similarProducts.map((item, index) => {
                const itemHasDiscount =
                  typeof item.oldPrice === "number" && item.oldPrice > item.price;

                const itemDiscountPct = itemHasDiscount
                  ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
                  : null;

                return (
                  <NavLink
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-slate-50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-32 w-full object-contain p-3 transition duration-300 group-hover:scale-[1.02] sm:h-40 sm:p-4"
                        loading="lazy"
                      />

                      {itemHasDiscount && (
                        <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                          -{itemDiscountPct}%
                        </span>
                      )}

                      {index < 4 && (
                        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700">
                          E ngjashme
                        </span>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600 sm:text-xs">
                        {item.brand}
                      </p>

                      <h3 className="mt-1 line-clamp-2 min-h-[2.6rem] text-xs font-semibold text-slate-900 sm:min-h-[2.8rem] sm:text-sm">
                        {item.title}
                      </h3>

                      <div className="mt-2">
                        <div className="text-sm font-bold text-slate-900 sm:text-base">
                          {formatPriceEUR(item.price)}
                        </div>

                        {itemHasDiscount && (
                          <div className="mt-1 text-[11px] text-slate-400 line-through sm:text-xs">
                            {formatPriceEUR(item.oldPrice)}
                          </div>
                        )}
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center">
              <NavLink
                to="/shop"
                className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Shiko më shumë
              </NavLink>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}