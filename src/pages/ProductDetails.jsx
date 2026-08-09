import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import { useStore } from "../store/StoreProvider";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

const VAT_RATE = 0.18;

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

  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStore();

  const product = useMemo(
    () =>
      products.find(
        (p) => String(p.id) === String(id)
      ),
    [id]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const hasDiscount =
    product &&
    typeof product.oldPrice === "number" &&
    product.oldPrice > product.price;

  const discountPct = useMemo(() => {
    if (!product || !hasDiscount) return null;

    return Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );
  }, [product, hasDiscount]);

  const gallery = useMemo(() => {
    if (!product) return [];

    const imgs =
      Array.isArray(product.images) &&
      product.images.length
        ? product.images
        : [product.image];

    return imgs.filter(Boolean);
  }, [product]);

  const similarProducts = useMemo(() => {
    if (!product) return [];

    const currentSection = (
      product.section || ""
    ).toLowerCase();

    const currentCategory = (
      product.category || ""
    ).toLowerCase();

    const sameCategory = products
      .filter(
        (p) =>
          String(p.id) !== String(product.id)
      )
      .filter((p) => {
        const section = (
          p.section || ""
        ).toLowerCase();

        const category = (
          p.category || ""
        ).toLowerCase();

        return (
          (currentSection &&
            section === currentSection) ||
          (currentCategory &&
            category === currentCategory)
        );
      })
      .slice(0, 4);

    const usedIds = new Set([
      String(product.id),
      ...sameCategory.map((p) =>
        String(p.id)
      ),
    ]);

    const randomOther = shuffleArray(
      products.filter((p) => {
        const section = (
          p.section || ""
        ).toLowerCase();

        const category = (
          p.category || ""
        ).toLowerCase();

        return (
          !usedIds.has(String(p.id)) &&
          section !== currentSection &&
          category !== currentCategory
        );
      })
    ).slice(0, 4);

    return [
      ...sameCategory,
      ...randomOther,
    ];
  }, [product]);

  const activeImage =
    gallery[activeIndex] ||
    product?.image;

  function decQty() {
    setQty((q) => Math.max(1, q - 1));
  }

  function incQty() {
    const cap =
      product?.stock ?? 99;

    setQty((q) =>
      Math.min(cap || 99, q + 1)
    );
  }

  function handleAddToCart() {
    if (!product || product.stock === 0) {
      return;
    }

    for (let i = 0; i < qty; i += 1) {
      addToCart(product);
    }

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  function handleBuyNow() {
    if (!product || product.stock === 0) {
      return;
    }

    navigate("/paying", {
      state: {
        product,
        qty,
      },
    });
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h1 className="text-lg font-semibold text-slate-900">
              Produkti nuk u gjet
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Produkti që po kërkoni nuk ekziston ose është larguar.
            </p>

            <NavLink
              to="/shop"
              className="mt-6 inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Kthehu te Dyqani
            </NavLink>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const wish = isWishlisted(product.id);
  const rating = product.rating ?? 4.6;
  const reviews = product.reviewsCount ?? 128;

  /*
    Price without VAT when displayed product.price
    already contains 18% VAT.
  */
  const priceWithoutVAT =
    Number(product.price || 0) /
    (1 + VAT_RATE);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        {/* =====================================================
            ONE SINGLE PRODUCT SECTION
        ====================================================== */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">

            {/* =================================================
                LEFT SIDE - PRODUCT IMAGE
            ================================================== */}
            <div className="relative min-h-[420px] p-5 sm:p-6 lg:min-h-[560px]">

              {/* IMAGE COUNT */}
              {gallery.length > 0 && (
                <div className="absolute right-5 top-5 z-10 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {activeIndex + 1} / {gallery.length}
                </div>
              )}

              <div className="flex h-full">

                {/* THUMBNAILS */}
                <div className="mr-4 flex w-16 shrink-0 flex-col justify-center gap-3">
                  {gallery.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() =>
                        setActiveIndex(idx)
                      }
                      className={`h-14 w-14 overflow-hidden rounded-lg border bg-white p-1.5 transition ${
                        idx === activeIndex
                          ? "border-orange-500"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                      aria-label={`Zgjidh imazhin ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${product.title} ${idx + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="flex min-w-0 flex-1 items-center justify-center">
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="max-h-[420px] w-full object-contain p-4 lg:max-h-[490px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE - PRODUCT INFORMATION
            ================================================== */}
            <div className="flex flex-col justify-center p-5 sm:p-6 lg:pr-8">

              {/* BRAND - KEEP TECHVERSE */}
              <div className="text-xs font-semibold text-orange-600">
                {product.brand}
              </div>

              {/* PRODUCT TITLE - SLIGHTLY SMALLER */}
              <h1 className="mt-1 max-w-xl text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
                {product.title}
              </h1>

              {/* RATING / VLERSO */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  className="font-medium text-slate-500 transition hover:text-orange-600"
                >
                  Vlerëso
                </button>

                <span className="text-slate-300">
                  •
                </span>

                <span className="inline-flex items-center gap-1">
                  <span className="text-orange-500">
                    ★
                  </span>

                  <span className="font-semibold text-slate-900">
                    {rating.toFixed(1)}
                  </span>

                  <span className="text-slate-400">
                    ({reviews})
                  </span>
                </span>
              </div>

              {/* =================================================
                  PRICE
              ================================================== */}
              <div className="mt-4">

                {hasDiscount && (
                  <div className="text-xs text-slate-400 line-through">
                    {formatPriceEUR(
                      product.oldPrice
                    )}
                  </div>
                )}

                <div className="mt-0.5 text-2xl font-bold text-slate-900 sm:text-[28px]">
                  {formatPriceEUR(
                    product.price
                  )}
                </div>

                {/* VAT INFO */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                  <span className="font-medium text-slate-500">
                    Përfshirë TVSH-në
                  </span>

                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="text-slate-500">
                    Pa TVSH{" "}
                    <span className="font-semibold text-slate-700">
                      {formatPriceEUR(
                        priceWithoutVAT
                      )}
                    </span>
                  </span>
                </div>

                {/* SAVING */}
                {hasDiscount && (
                  <div className="mt-1.5 text-xs font-medium text-orange-600">
                    Ju kurseni{" "}
                    {formatPriceEUR(
                      product.oldPrice -
                        product.price
                    )}
                  </div>
                )}
              </div>

              {/* =================================================
                  QUANTITY SECTION TITLE
              ================================================== */}
              <div className="mt-5 flex items-center gap-3">
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  Sasia
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* QUANTITY + STOCK */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">

                {/* COMPACT QUANTITY */}
                <div className="inline-flex h-9 items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={decQty}
                    className="flex h-full w-9 items-center justify-center text-base text-slate-600 transition hover:bg-slate-50"
                    aria-label="Zvogëlo sasinë"
                  >
                    −
                  </button>

                  <div className="flex h-full min-w-[42px] items-center justify-center border-x border-slate-200 text-xs font-semibold text-slate-900">
                    {qty}
                  </div>

                  <button
                    type="button"
                    onClick={incQty}
                    disabled={
                      product.stock !== 0 &&
                      qty >= product.stock
                    }
                    className="flex h-full w-9 items-center justify-center text-base text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Rrit sasinë"
                  >
                    +
                  </button>
                </div>

                {/* STOCK */}
                {product.stock === 0 ? (
                  <span className="text-xs font-semibold text-red-500">
                    Pa stok
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                    Në stok ({product.stock})
                  </span>
                )}
              </div>

              {/* =================================================
                  PAYMENT DIVIDER LIKE REFERENCE
              ================================================== */}
              <div className="mt-5 flex items-center gap-3">
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  Pagesa
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* PAYMENT OPTIONS */}
              <div className="mt-3 grid gap-2 sm:grid-cols-3">

                {/* CASH */}
                <div className="flex items-center gap-2 rounded-lg px-1 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-orange-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7h14v10H5V7Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M8 10h8M8 13h5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span className="text-[11px] font-medium text-slate-700">
                    Para në dorë
                  </span>
                </div>

                {/* ONLINE */}
                <div className="flex items-center gap-2 rounded-lg px-1 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-orange-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <rect
                        x="4"
                        y="6"
                        width="16"
                        height="12"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M7 14h4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span className="text-[11px] font-medium text-slate-700">
                    Paguaj online
                  </span>
                </div>

                {/* BANK */}
                <div className="flex items-center gap-2 rounded-lg px-1 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-orange-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 8h16M6 8V6h12v2M6 8v9M18 8v9M4 17h16"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span className="text-[11px] font-medium text-slate-700">
                    Transfer bankar
                  </span>
                </div>
              </div>

              {/* =================================================
                  TRANSPORT DIVIDER LIKE REFERENCE
              ================================================== */}
              <div className="mt-4 flex items-center gap-3">
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  Transporti
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* TRANSPORT INFO */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4.5 w-4.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 6h11v10H3V6Zm11 4h3l3 3v3h-6v-6Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="7"
                      cy="18"
                      r="1.6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="17"
                      cy="18"
                      r="1.6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Dërgesa 2–4 ditë pune
                  </div>

                  <div className="mt-0.5 text-[11px] text-slate-500">
                    Dërgesë e sigurt në adresën tuaj
                  </div>
                </div>
              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================== */}
              <div className="mt-6 flex items-center gap-2.5">

                {/* BUY NOW */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`h-11 flex-1 rounded-full px-4 text-xs font-bold transition ${
                    product.stock === 0
                      ? "cursor-not-allowed bg-slate-200 text-slate-400"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  BLEJ TANI
                </button>

                {/* ADD TO CART */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`h-11 flex-1 rounded-full border px-4 text-xs font-semibold transition ${
                    product.stock === 0
                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                      : added
                      ? "border-emerald-800 bg-emerald-800 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {product.stock === 0
                    ? "PA STOK"
                    : added
                    ? "U SHTUA ✓"
                    : "SHTO NË SHPORTË"}
                </button>

                {/* =================================================
                    HEART
                    LIKED:
                    SOLID GREEN

                    NOT LIKED:
                    SAME EXACT HEART SHAPE
                    WHITE FILL + DARK GREEN OUTLINE
                ================================================== */}
                <button
                  type="button"
                  onClick={() =>
                    toggleWishlist(product)
                  }
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:bg-emerald-50"
                  aria-label={
                    wish
                      ? "Largo nga lista e dëshirave"
                      : "Shto në listën e dëshirave"
                  }
                  title={
                    wish
                      ? "Largo nga lista e dëshirave"
                      : "Shto në listën e dëshirave"
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 20.5s-7-4.5-9.2-8.8C1.3 8.8 3.2 6 6.4 6c1.8 0 3.3.9 4.2 2 0 0 .9-2 4.2-2C18 6 20 8.8 21.2 11.7 19 16 12 20.5 12 20.5Z"
                      fill={
                        wish
                          ? "#047857"
                          : "#ffffff"
                      }
                      stroke="#065f46"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SIMILAR PRODUCTS
        ====================================================== */}
        {similarProducts.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
              Produkte të ngjashme
            </h2>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {similarProducts.map(
                (item, index) => {
                  const itemHasDiscount =
                    typeof item.oldPrice ===
                      "number" &&
                    item.oldPrice >
                      item.price;

                  const itemDiscountPct =
                    itemHasDiscount
                      ? Math.round(
                          ((item.oldPrice -
                            item.price) /
                            item.oldPrice) *
                            100
                        )
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
                            {formatPriceEUR(
                              item.price
                            )}
                          </div>

                          {itemHasDiscount && (
                            <div className="mt-1 text-[11px] text-slate-400 line-through sm:text-xs">
                              {formatPriceEUR(
                                item.oldPrice
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  );
                }
              )}
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
      </main>

      <Footer />
    </>
  );
}