import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { useStore } from "../store/StoreProvider";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import ProductCard from "../components/shop/ProductCard";

const API_BASE = "http://localhost:5000";
const VAT_RATE = 0.18;
const INITIAL_SIMILAR_PRODUCTS = 10;
const SIMILAR_PRODUCTS_STEP = 10;

function formatPriceEUR(value) {
  return `€${Number(value || 0).toFixed(2)}`;
}

function shuffleArray(array) {
  const copy = [...array];

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

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productError, setProductError] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [visibleSimilarCount, setVisibleSimilarCount] = useState(
    INITIAL_SIMILAR_PRODUCTS
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadProductData() {
      setLoadingProduct(true);
      setProductError("");
      setProduct(null);
      setProducts([]);
      setActiveIndex(0);
      setQty(1);
      setAdded(false);
      setVisibleSimilarCount(INITIAL_SIMILAR_PRODUCTS);

      try {
        const [productResponse, productsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/Products/${encodeURIComponent(id)}`, {
            signal: controller.signal,
          }),
          fetch(`${API_BASE}/api/Products`, {
            signal: controller.signal,
          }),
        ]);

        if (productResponse.status === 404) {
          setProduct(null);
          return;
        }

        if (!productResponse.ok) {
          throw new Error("Produkti nuk mund të ngarkohet.");
        }

        const productData = await productResponse.json();

        setProduct(productData);

        if (productsResponse.ok) {
          const productsData = await productsResponse.json();

          setProducts(
            Array.isArray(productsData)
              ? productsData
              : []
          );
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setProductError("Nuk u arrit lidhja me serverin.");
          setProduct(null);
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingProduct(false);
        }
      }
    }

    loadProductData();

    return () => {
      controller.abort();
    };
  }, [id]);

  const hasDiscount =
    product &&
    Number(product.oldPrice) > Number(product.price);

  const discountPct = useMemo(() => {
    if (!product || !hasDiscount) {
      return null;
    }

    return Math.round(
      ((Number(product.oldPrice) - Number(product.price)) /
        Number(product.oldPrice)) *
        100
    );
  }, [product, hasDiscount]);

  const gallery = useMemo(() => {
    if (!product) {
      return [];
    }

    const images =
      Array.isArray(product.images) &&
      product.images.length > 0
        ? product.images
        : [product.image];

    return images.filter(Boolean);
  }, [product]);

  const similarProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    const currentSection = (
      product.section || ""
    ).toLowerCase();

    const currentCategory = (
      product.category || ""
    ).toLowerCase();

    const otherProducts = products.filter(
      (item) =>
        String(item.id) !== String(product.id)
    );

    const sameCategory = otherProducts.filter((item) => {
      const section = (
        item.section || ""
      ).toLowerCase();

      const category = (
        item.category || ""
      ).toLowerCase();

      return (
        (currentSection &&
          section === currentSection) ||
        (currentCategory &&
          category === currentCategory)
      );
    });

    const sameCategoryIds = new Set(
      sameCategory.map((item) =>
        String(item.id)
      )
    );

    const otherCategories = shuffleArray(
      otherProducts.filter(
        (item) =>
          !sameCategoryIds.has(String(item.id))
      )
    );

    return [
      ...sameCategory,
      ...otherCategories,
    ];
  }, [product, products]);

  const visibleSimilarProducts =
    similarProducts.slice(
      0,
      visibleSimilarCount
    );

  const hasMoreSimilarProducts =
    visibleSimilarCount < similarProducts.length;

  const activeImage =
    gallery[activeIndex] ||
    product?.image;

  function decQty() {
    setQty((current) =>
      Math.max(1, current - 1)
    );
  }

  function incQty() {
    const stockLimit =
      product?.stock ?? 99;

    setQty((current) =>
      Math.min(
        stockLimit || 99,
        current + 1
      )
    );
  }

  async function handleAddToCart() {
    if (!product || product.stock === 0) {
      return;
    }

    try {
      for (let i = 0; i < qty; i += 1) {
        await addToCart(product);
      }

      setAdded(true);

      window.setTimeout(() => {
        setAdded(false);
      }, 1200);
    } catch {
      navigate("/login");
    }
  }

  async function handleWishlist() {
    if (!product) {
      return;
    }

    try {
      await toggleWishlist(product);
    } catch {
      navigate("/login");
    }
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

  function handleShowMore() {
    setVisibleSimilarCount(
      (current) =>
        current + SIMILAR_PRODUCTS_STEP
    );
  }

  if (loadingProduct) {
    return (
      <>
        <Navbar />

        <main className="mx-auto flex min-h-[500px] w-full max-w-[1460px] items-center justify-center px-4 py-10 sm:px-6">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-800" />
        </main>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="mx-auto w-full max-w-[1460px] px-4 py-10 sm:px-6">
          <div className="border border-slate-200 bg-white p-8">
            <h1 className="text-lg font-semibold text-slate-900">
              Produkti nuk u gjet
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              {productError ||
                "Produkti që po kërkoni nuk ekziston ose është larguar."}
            </p>

            <NavLink
              to="/shop"
              className="mt-6 inline-flex rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
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

  const priceWithoutVAT =
    Number(product.price || 0) /
    (1 + VAT_RATE);

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-[1460px] px-4 py-7 sm:px-6">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[420px] p-5 sm:p-6 lg:min-h-[560px]">
              {gallery.length > 0 && (
                <div className="absolute right-5 top-5 z-10 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {activeIndex + 1} /{" "}
                  {gallery.length}
                </div>
              )}

              <div className="flex h-full">
                <div className="mr-4 flex w-16 shrink-0 flex-col justify-center gap-3">
                  {gallery.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      className={`h-14 w-14 overflow-hidden rounded-lg border bg-white p-1.5 transition ${
                        index === activeIndex
                          ? "border-slate-400"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                      aria-label={`Zgjidh imazhin ${index + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>

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

            <div className="flex flex-col justify-center p-5 sm:p-6 lg:pr-8">
              <div className="text-xs font-semibold text-blue-800">
                {product.brand}
              </div>

              <h1 className="mt-1 max-w-xl text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
                {product.title}
              </h1>

              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  className="font-medium text-slate-500 transition hover:text-blue-800"
                >
                  Vlerëso
                </button>

                <span className="text-slate-300">
                  •
                </span>

                <span className="inline-flex items-center gap-1">
                  <span className="text-blue-800">
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

              <div className="mt-4">
                <div className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px]">
                  {formatPriceEUR(product.price)}
                </div>

                <div className="mt-1.5 flex min-h-[20px] items-center gap-2">
                  {hasDiscount && (
                    <>
                      <span className="text-xs text-slate-400 line-through">
                        {formatPriceEUR(
                          product.oldPrice
                        )}
                      </span>

                      <span className="rounded-full bg-blue-50 px-2 py-[3px] text-[10px] font-bold text-blue-700">
                        -{discountPct}%
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
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

                {hasDiscount && (
                  <div className="mt-1.5 text-xs font-medium text-blue-700">
                    Ju kurseni{" "}
                    <span className="font-bold">
                      {formatPriceEUR(
                        Number(product.oldPrice) -
                          Number(product.price)
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  Sasia
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
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

                {product.stock === 0 ? (
                  <span className="text-xs font-semibold text-red-500">
                    Pa stok
                  </span>
                ) : (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-800">
                    Në stok ({product.stock})
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  Pagesa
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
                <div className="flex min-w-0 items-center gap-1.5 py-1.5 sm:gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-800 sm:h-8 sm:w-8">
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

                  <span className="min-w-0 text-[9px] font-medium leading-tight text-slate-700 sm:text-[11px]">
                    Para në dorë
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 py-1.5 sm:gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-800 sm:h-8 sm:w-8">
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

                  <span className="min-w-0 text-[9px] font-medium leading-tight text-slate-700 sm:text-[11px]">
                    Paguaj online
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 py-1.5 sm:gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-800 sm:h-8 sm:w-8">
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

                  <span className="min-w-0 text-[9px] font-medium leading-tight text-slate-700 sm:text-[11px]">
                    Transfer bankar
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  Transporti
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-800">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[18px] w-[18px]"
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

              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`h-11 flex-1 rounded-full px-4 text-xs font-bold transition ${
                    product.stock === 0
                      ? "cursor-not-allowed bg-slate-200 text-slate-400"
                      : "bg-blue-800 text-white hover:bg-blue-900"
                  }`}
                >
                  BLEJ TANI
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`h-11 flex-1 rounded-full border px-4 text-xs font-semibold transition ${
                    product.stock === 0
                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                      : added
                        ? "border-blue-800 bg-blue-800 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {product.stock === 0
                    ? "PA STOK"
                    : added
                      ? "U SHTUA ✓"
                      : "SHTO NË SHPORTË"}
                </button>

                <button
                  type="button"
                  onClick={handleWishlist}
                  className="flex h-11 w-11 shrink-0 items-center justify-center transition hover:scale-110 active:scale-95"
                  aria-label={
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
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L4.22 13.45 12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                      fill={
                        wish
                          ? "#1e3a8a"
                          : "none"
                      }
                      stroke="#1e3a8a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {similarProducts.length > 0 && (
          <section className="mt-10">
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">
                Produkte të ngjashme
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Produkte të tjera që mund t&apos;ju interesojnë.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
              {visibleSimilarProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>

            {hasMoreSimilarProducts && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-800 transition hover:border-blue-800 hover:text-blue-800 active:scale-[0.98]"
                >
                  Shiko më shumë
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}