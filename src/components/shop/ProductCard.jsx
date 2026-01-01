import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../store/StoreProvider";

function formatPriceEUR(value) {
  const num = Number(value || 0);
  return `€${num.toFixed(2)}`;
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [added, setAdded] = useState(false);

  const wish = isWishlisted(product.id);

  const hasDiscount = useMemo(() => {
    return typeof product.oldPrice === "number" && product.oldPrice > product.price;
  }, [product.oldPrice, product.price]);

  const discountPct = useMemo(() => {
    if (!hasDiscount) return null;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [hasDiscount, product.oldPrice, product.price]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);

  function handleAddToCart() {
    if (product.stock === 0) return;
    addToCart(product);
    setAdded(true);
  }

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Make the card content a column so we can push actions to bottom */}
      <div className="flex h-full flex-col">
        {/* Clickable top area */}
        <NavLink to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden rounded-xl bg-slate-50">
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />

            {hasDiscount && (
              <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                -{discountPct}%
              </span>
            )}

            {product.badge && (
              <span className="absolute right-3 top-3 rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold text-white">
                {product.badge}
              </span>
            )}
          </div>

          {/* Title: fixed visual height */}
          <h3 className="mt-4 line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-slate-900">
            {product.title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {product.brand} • {product.category}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-emerald-900">
                {formatPriceEUR(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPriceEUR(product.oldPrice)}
                </span>
              )}
            </div>

            {product.stock === 0 ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                Out of stock
              </span>
            ) : (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
                In stock
              </span>
            )}
          </div>
        </NavLink>

        {/* Actions pinned to bottom */}
        <div className="mt-auto pt-4 flex items-center gap-2">
          {/* Wishlist */}
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-md border text-sm font-semibold transition ${
              wish
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
            }`}
            aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
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

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 rounded-md px-4 py-3 text-sm font-semibold transition ${
              product.stock === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : added
                ? "bg-emerald-900 text-white"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {product.stock === 0 ? "Out of stock" : added ? "Added to cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
