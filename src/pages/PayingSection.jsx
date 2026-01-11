import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useStore } from "../store/StoreProvider";

function formatPriceEUR(value) {
  const num = Number(value || 0);
  return `€${num.toFixed(2)}`;
}

function onlyDigits(s) {
  return String(s || "").replace(/\D/g, "");
}

function formatCardNumber(value) {
  const d = onlyDigits(value).slice(0, 16);
  return d.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const d = onlyDigits(value).slice(0, 4);
  const mm = d.slice(0, 2);
  const yy = d.slice(2, 4);
  if (d.length <= 2) return mm;
  return `${mm}/${yy}`;
}

export default function PayingSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useStore();

  const product = location.state?.product;
  const qty = Number(location.state?.qty || 1);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">No product selected</h1>
            <p className="mt-2 text-sm text-slate-600">
              Please go back to the shop and choose a product first.
            </p>
            <NavLink
              to="/shop"
              className="mt-6 inline-flex rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Back to Shop
            </NavLink>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = useMemo(() => product.price * qty, [product.price, qty]);

  const [paymentMethod, setPaymentMethod] = useState("cod"); 
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "Kosovo",
    notes: "",
  });

  const [card, setCard] = useState({
    holderName: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function setCardField(name, value) {
    setCard((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    const e = {};

    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.country.trim()) e.country = "Country is required.";

    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      e.email = "Please enter a valid email address.";
    }

    if (paymentMethod === "card") {
      if (!card.holderName.trim()) e.holderName = "Cardholder name is required.";
      const digits = onlyDigits(card.number);
      if (digits.length !== 16) e.number = "Card number must be 16 digits.";
      const exp = card.expiry.trim();
      if (!/^\d{2}\/\d{2}$/.test(exp)) e.expiry = "Expiry must be MM/YY.";
      const cvvDigits = onlyDigits(card.cvv);
      if (cvvDigits.length < 3 || cvvDigits.length > 4) e.cvv = "CVV must be 3–4 digits.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function placeOrder() {
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);

    for (let i = 0; i < qty; i++) addToCart(product);

    setSuccessOpen(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/cart");
    }, 1600);
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            <span aria-hidden>←</span> Back
          </button>

          <NavLink
            to="/shop"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Continue shopping
          </NavLink>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* LEFT: Customer + Payment form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="text-lg font-semibold text-slate-900">Checkout</h1>
              <p className="mt-1 text-sm text-slate-600">
                Enter your delivery information and choose a payment method.
              </p>

              {/* Customer info */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-slate-900">Customer details</div>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Full name *</label>
                    <input
                      value={form.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.fullName ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">Phone *</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.phone ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="+383 44 123 456"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600">Email (optional)</label>
                    <input
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.email ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="name@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600">Address *</label>
                    <input
                      value={form.address}
                      onChange={(e) => setField("address", e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.address ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="Street, building, apartment"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">City *</label>
                    <input
                      value={form.city}
                      onChange={(e) => setField("city", e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.city ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="Prishtina"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">Country *</label>
                    <input
                      value={form.country}
                      onChange={(e) => setField("country", e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.country ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="Kosovo"
                    />
                    {errors.country && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.country}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600">Order notes (optional)</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400"
                      placeholder="Any notes for delivery..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <div className="text-sm font-semibold text-slate-900">Payment method</div>

                <div className="mt-3 grid gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                      paymentMethod === "cod"
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Cash on delivery</div>
                      <div className="mt-1 text-xs text-slate-600">Pay when you receive the item.</div>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {paymentMethod === "cod" ? "Selected" : ""}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                      paymentMethod === "card"
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Bank card</div>
                      <div className="mt-1 text-xs text-slate-600">Pay with Visa/Mastercard.</div>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {paymentMethod === "card" ? "Selected" : ""}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("transfer")}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                      paymentMethod === "transfer"
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Bank transfer</div>
                      <div className="mt-1 text-xs text-slate-600">Pay via bank transfer.</div>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {paymentMethod === "transfer" ? "Selected" : ""}
                    </div>
                  </button>
                </div>

                {/* Conditional: Card details */}
                {paymentMethod === "card" && (
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-sm font-semibold text-slate-900">Card information</div>
                    <p className="mt-1 text-xs text-slate-600">
                      This is a demo form. Do not use real card details in production without a payment provider.
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-600">Cardholder name *</label>
                        <input
                          value={card.holderName}
                          onChange={(e) => setCardField("holderName", e.target.value)}
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                            errors.holderName ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                          }`}
                          placeholder="Your name"
                        />
                        {errors.holderName && (
                          <p className="mt-1 text-xs font-semibold text-red-600">{errors.holderName}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-600">Card number *</label>
                        <input
                          value={card.number}
                          onChange={(e) => setCardField("number", formatCardNumber(e.target.value))}
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                            errors.number ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                          }`}
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                        />
                        {errors.number && (
                          <p className="mt-1 text-xs font-semibold text-red-600">{errors.number}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600">Expiry (MM/YY) *</label>
                        <input
                          value={card.expiry}
                          onChange={(e) => setCardField("expiry", formatExpiry(e.target.value))}
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                            errors.expiry ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                          }`}
                          placeholder="08/28"
                          inputMode="numeric"
                        />
                        {errors.expiry && (
                          <p className="mt-1 text-xs font-semibold text-red-600">{errors.expiry}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600">CVV *</label>
                        <input
                          value={card.cvv}
                          onChange={(e) => setCardField("cvv", onlyDigits(e.target.value).slice(0, 4))}
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                            errors.cvv ? "border-red-300" : "border-slate-200 focus:border-orange-400"
                          }`}
                          placeholder="123"
                          inputMode="numeric"
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-xs font-semibold text-red-600">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">Bank transfer instructions</div>
                    <p className="mt-2 text-sm text-slate-600">
                      Use your order ID as the reference. Once payment is received, we will process your order.
                    </p>
                    <div className="mt-3 text-sm text-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">IBAN</span>
                        <span className="font-semibold text-slate-900">XX00 0000 0000 0000 0000</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-slate-600">Beneficiary</span>
                        <span className="font-semibold text-slate-900">TechVerse</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Order summary</div>

              <div className="mt-4 flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-20 w-20 overflow-hidden rounded-xl bg-white">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="line-clamp-2 text-sm font-semibold text-slate-900">{product.title}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {product.brand} • {product.category}
                  </div>
                  <div className="mt-2 text-sm text-slate-700">
                    Quantity: <span className="font-semibold">{qty}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-500">Subtotal</div>
                  <div className="mt-1 text-lg font-bold text-slate-900">
                    {formatPriceEUR(subtotal)}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">Calculated at checkout</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Taxes</span>
                  <span className="font-semibold text-slate-900">Included (where applicable)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={placeOrder}
                disabled={isSubmitting}
                className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                  isSubmitting ? "bg-orange-400" : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {isSubmitting ? "Processing..." : "Place order"}
              </button>

              <p className="mt-3 text-xs text-slate-500">
                After you place the order, we’ll show a confirmation animation and send you to the cart.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 transition ${
          successOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!successOpen}
      >
        <div
          className={`w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl transition ${
            successOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-2"
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <div className={`text-emerald-700 ${successOpen ? "animate-bounce" : ""}`}>
              ✓
            </div>
          </div>

          <h2 className="mt-4 text-center text-lg font-semibold text-slate-900">
            Thanks for buying!
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Your order has been placed successfully.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total</span>
              <span className="font-semibold text-slate-900">{formatPriceEUR(subtotal)}</span>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Redirecting to cart...
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
