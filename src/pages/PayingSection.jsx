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

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
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

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">
              Asnjë produkt i zgjedhur
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Ju lutem kthehuni te dyqani dhe zgjidhni fillimisht një produkt.
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

  const subtotal = useMemo(() => product.price * qty, [product.price, qty]);

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function setCardField(name, value) {
    setCard((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    const e = {};

    if (!form.fullName.trim()) e.fullName = "Shkruani emrin e plotë.";
    if (!form.phone.trim()) e.phone = "Shkruani numrin e telefonit.";
    if (!form.address.trim()) e.address = "Shkruani adresën.";
    if (!form.city.trim()) e.city = "Shkruani qytetin.";

    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      e.email = "Email jo valid.";
    }

    if (paymentMethod === "card") {
      if (!card.holderName.trim()) e.holderName = "Shkruani emrin në kartelë.";
      if (onlyDigits(card.number).length !== 16) e.number = "Kartela duhet të ketë 16 shifra.";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry.trim())) e.expiry = "Përdorni formatin MM/YY.";
      if (onlyDigits(card.cvv).length < 3 || onlyDigits(card.cvv).length > 4) {
        e.cvv = "CVV duhet të ketë 3 ose 4 shifra.";
      }
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

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            <span aria-hidden>←</span>
            Kthehu
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-xl font-bold text-slate-900">Përfundo porosinë</h1>
            <p className="mt-1 text-sm text-slate-600">
              Vendos të dhënat bazë dhe zgjidh mënyrën e pagesës.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Emri i plotë *
                </label>
                <input
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                    errors.fullName
                      ? "border-red-300"
                      : "border-slate-200 focus:border-orange-400"
                  }`}
                  placeholder="Emri dhe mbiemri"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Telefoni *
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                    errors.phone
                      ? "border-red-300"
                      : "border-slate-200 focus:border-orange-400"
                  }`}
                  placeholder="+383 44 123 456"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">
                  Adresa *
                </label>
                <input
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                    errors.address
                      ? "border-red-300"
                      : "border-slate-200 focus:border-orange-400"
                  }`}
                  placeholder="Rruga, hyrja, banesa"
                />
                {errors.address && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Qyteti *
                </label>
                <input
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                    errors.city
                      ? "border-red-300"
                      : "border-slate-200 focus:border-orange-400"
                  }`}
                  placeholder="Prishtinë"
                />
                {errors.city && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Email
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                    errors.email
                      ? "border-red-300"
                      : "border-slate-200 focus:border-orange-400"
                  }`}
                  placeholder="email@shembull.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="mb-3 text-sm font-semibold text-slate-900">
                Mënyra e pagesës
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-xl border p-4 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-orange-400 bg-orange-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-sm font-semibold text-slate-900">
                    Pagesë në dorëzim
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Paguani kur ta pranoni porosinë.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-xl border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-orange-400 bg-orange-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-sm font-semibold text-slate-900">
                    Kartelë bankare
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Visa ose Mastercard.
                  </div>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600">
                      Emri në kartelë *
                    </label>
                    <input
                      value={card.holderName}
                      onChange={(e) => setCardField("holderName", e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                        errors.holderName
                          ? "border-red-300"
                          : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="Emri juaj"
                    />
                    {errors.holderName && (
                      <p className="mt-1 text-xs font-semibold text-red-600">
                        {errors.holderName}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600">
                      Numri i kartelës *
                    </label>
                    <input
                      value={card.number}
                      onChange={(e) =>
                        setCardField("number", formatCardNumber(e.target.value))
                      }
                      className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                        errors.number
                          ? "border-red-300"
                          : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                    />
                    {errors.number && (
                      <p className="mt-1 text-xs font-semibold text-red-600">
                        {errors.number}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Skadimi *
                    </label>
                    <input
                      value={card.expiry}
                      onChange={(e) =>
                        setCardField("expiry", formatExpiry(e.target.value))
                      }
                      className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                        errors.expiry
                          ? "border-red-300"
                          : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="08/28"
                      inputMode="numeric"
                    />
                    {errors.expiry && (
                      <p className="mt-1 text-xs font-semibold text-red-600">
                        {errors.expiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      CVV *
                    </label>
                    <input
                      value={card.cvv}
                      onChange={(e) =>
                        setCardField("cvv", onlyDigits(e.target.value).slice(0, 4))
                      }
                      className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                        errors.cvv
                          ? "border-red-300"
                          : "border-slate-200 focus:border-orange-400"
                      }`}
                      placeholder="123"
                      inputMode="numeric"
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-xs font-semibold text-red-600">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="text-sm font-semibold text-slate-900">
              Përmbledhja
            </div>

            <div className="mt-4 flex gap-4 rounded-2xl bg-slate-50 p-4">
              <div className="h-20 w-20 overflow-hidden rounded-xl bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="line-clamp-2 text-sm font-semibold text-slate-900">
                  {product.title}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {product.brand}
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  Sasia: <span className="font-semibold">{qty}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-200 pt-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Nëntotali</span>
                <span className="font-semibold text-slate-900">
                  {formatPriceEUR(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Transporti</span>
                <span className="font-semibold text-slate-900">Falas</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
                <span className="font-semibold text-slate-900">Totali</span>
                <span className="font-bold text-slate-900">
                  {formatPriceEUR(subtotal)}
                </span>
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
              {isSubmitting ? "Duke u përpunuar..." : "Përfundo porosinë"}
            </button>

            <p className="mt-3 text-xs text-slate-500">
              Pagesë e sigurt dhe porosi e shpejtë.
            </p>
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
            successOpen ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-xl text-emerald-700">
            ✓
          </div>

          <h2 className="mt-4 text-center text-lg font-semibold text-slate-900">
            Porosia u krye me sukses
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Faleminderit për blerjen.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Totali</span>
              <span className="font-semibold text-slate-900">
                {formatPriceEUR(subtotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}