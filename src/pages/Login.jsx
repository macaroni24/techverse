// src/pages/Login.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function EyeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function EyeOffIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.1 7.1C4.5 8.9 2.5 12 2.5 12s3.5 7 9.5 7c1.7 0 3.2-.3 4.5-.9"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9.3 5.4A9.7 9.7 0 0 1 12 5c6 0 9.5 7 9.5 7a16 16 0 0 1-4 5.1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    remember: true,
  });

  const [err, setErr] = useState("");

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
    if (mode === "signup" && form.name.trim().length < 2) return "Please enter your name.";
    if (!emailOk) return "Please enter a valid email address.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  function fakeAuthSave(payload) {
    // Frontend-only demo auth (no backend)
    localStorage.setItem("techverse_auth", JSON.stringify(payload));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const msg = validate();
    if (msg) {
      setErr(msg);
      return;
    }

    setLoading(true);

    // Simulate request
    await new Promise((r) => setTimeout(r, 650));

    const authPayload = {
      mode,
      name: mode === "signup" ? form.name.trim() : "TechVerse User",
      email: form.email.trim().toLowerCase(),
      remember: form.remember,
      ts: Date.now(),
    };

    fakeAuthSave(authPayload);

    setLoading(false);
    navigate("/"); // redirect home
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left marketing card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900">
                <span className="text-xl font-bold text-white">T</span>
              </span>
              <div className="leading-tight">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Welcome to TechVerse</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Sign in to manage your wishlist, cart, and orders.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Fast checkout</p>
                <p className="mt-1 text-sm text-slate-600">
                  Save your cart and come back anytime.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Wishlist sync</p>
                <p className="mt-1 text-sm text-slate-600">
                  Keep your favorite tech in one place.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Exclusive offers</p>
                <p className="mt-1 text-sm text-slate-600">
                  Get discounts on top gaming gear.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Secure feel</p>
                <p className="mt-1 text-sm text-slate-600">
                  Demo UI only — backend can be added later.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <NavLink
                to="/shop"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Continue shopping
              </NavLink>
              <span className="text-slate-500">or</span>
              <button
                type="button"
                onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
                className="rounded-full bg-emerald-900 px-4 py-2 font-semibold text-white hover:bg-emerald-950 transition"
              >
                {mode === "login" ? "Create an account" : "I already have an account"}
              </button>
            </div>
          </div>

          {/* Right auth form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {mode === "login" ? "Sign in" : "Create account"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {mode === "login"
                    ? "Use your email to access your TechVerse profile."
                    : "Create an account to save your cart and wishlist."}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={cx(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    mode === "login" ? "bg-emerald-900 text-white" : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={cx(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    mode === "signup" ? "bg-emerald-900 text-white" : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  Sign up
                </button>
              </div>
            </div>

            {err && (
              <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
                <p className="font-semibold">Fix this:</p>
                <p className="mt-1">{err}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-sm font-semibold text-slate-900">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-slate-900">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-900">Password</label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-orange-200">
                  <input
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    type={showPw ? "text" : "password"}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-50 transition"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? (
                      <EyeOffIcon className="h-5 w-5 text-slate-700" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-slate-700" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Demo only — stored locally for now.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={onChange}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => alert("Demo UI only. You can add a real reset flow later.")}
                  className="text-sm font-semibold text-emerald-900 hover:text-emerald-950"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cx(
                  "w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition",
                  loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                )}
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Sign in"
                  : "Create account"}
              </button>

              <p className="text-center text-sm text-slate-600">
                {mode === "login" ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="font-semibold text-emerald-900 hover:text-emerald-950"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-semibold text-emerald-900 hover:text-emerald-950"
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
