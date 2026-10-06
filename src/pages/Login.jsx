import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useStore } from "../store/StoreProvider";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://techverse.runasp.net";
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
  const { refreshStore } = useStore();

  const [mode, setMode] = useState("login");
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

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());

    if (mode === "signup" && form.name.trim().length < 2) {
      return "Ju lutem shkruani emrin tuaj të plotë.";
    }

    if (!emailOk) {
      return "Ju lutem shkruani një adresë emaili të vlefshme.";
    }

    if (form.password.length < 6) {
      return "Fjalëkalimi duhet të ketë të paktën 6 karaktere.";
    }

    return "";
  }

  function clearAuthStorage() {
    localStorage.removeItem("techverse_auth");
    localStorage.removeItem("techverse_token");
    localStorage.removeItem("techverse_user");
    localStorage.removeItem("token");

    sessionStorage.removeItem("techverse_auth");
    sessionStorage.removeItem("techverse_token");
    sessionStorage.removeItem("techverse_user");
    sessionStorage.removeItem("token");
  }

  function saveAuth(data) {
    clearAuthStorage();

    const storage = form.remember ? localStorage : sessionStorage;

    const auth = {
      token: data.token,
      user: data.user,
      remember: form.remember,
      ts: Date.now(),
    };

    storage.setItem("techverse_token", data.token);
    storage.setItem("techverse_user", JSON.stringify(data.user));
    storage.setItem("techverse_auth", JSON.stringify(auth));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const validationError = validate();

    if (validationError) {
      setErr(validationError);
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        mode === "signup"
          ? `${API_BASE}/api/auth/register`
          : `${API_BASE}/api/auth/login`;

      const payload =
        mode === "signup"
          ? {
              name: form.name.trim(),
              email: form.email.trim().toLowerCase(),
              password: form.password,
            }
          : {
              email: form.email.trim().toLowerCase(),
              password: form.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      const raw = await response.text();

      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        setErr(
          data?.message || "Ndodhi një gabim. Ju lutem provoni përsëri."
        );
        return;
      }

      if (!data?.token || !data?.user) {
        setErr("Serveri nuk ktheu të dhënat e autentikimit.");
        return;
      }

      saveAuth(data);

      await refreshStore();

      navigate("/");
    } catch {
      setErr("Nuk u arrit lidhja me serverin.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setErr("");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-180px)] max-w-7xl items-center justify-center px-4 py-10 sm:px-6">
        <section className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {mode === "login" ? "Kyçu" : "Krijo llogari"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {mode === "login"
                ? "Përdorni adresën tuaj të emailit dhe fjalëkalimin për të hyrë në llogarinë tuaj."
                : "Krijoni llogarinë tuaj për të ruajtur listën e dëshirave dhe për të menaxhuar porositë."}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 border-b border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={cx(
                "relative pb-2 text-sm font-semibold transition",
                mode === "login"
                  ? "text-blue-800"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              Kyçu

              {mode === "login" && (
                <span className="absolute inset-x-0 -bottom-[13px] h-0.5 rounded-full bg-blue-800" />
              )}
            </button>

            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={cx(
                "relative pb-2 text-sm font-semibold transition",
                mode === "signup"
                  ? "text-blue-800"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              Regjistrohu

              {mode === "signup" && (
                <span className="absolute inset-x-0 -bottom-[13px] h-0.5 rounded-full bg-blue-800" />
              )}
            </button>
          </div>

          {err && (
            <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
              <p className="font-semibold">Ju lutem kontrolloni sa vijon:</p>
              <p className="mt-1">{err}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-semibold text-slate-900">
                  Emri i plotë
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Shkruani emrin tuaj të plotë"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-slate-900">
                Adresa e emailit
              </label>

              <input
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                autoComplete="email"
                placeholder="ju@shembull.com"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">
                Fjalëkalimi
              </label>

              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200">
                <input
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  type={showPw ? "text" : "password"}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPw((prev) => !prev)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-50"
                  aria-label={
                    showPw ? "Fsheh fjalëkalimin" : "Shfaq fjalëkalimin"
                  }
                >
                  {showPw ? (
                    <EyeOffIcon className="h-5 w-5 text-slate-700" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-slate-700" />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Përdorni të paktën 6 karaktere.
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
                Më mbaj mend
              </label>

              <button
                type="button"
                className="text-sm font-semibold text-blue-800 hover:text-blue-900"
              >
                Keni harruar fjalëkalimin?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cx(
                "w-full rounded-2xl px-5 py-3.5 text-sm font-semibold text-white transition",
                loading
                  ? "cursor-not-allowed bg-blue-300"
                  : "bg-blue-800 hover:bg-blue-900"
              )}
            >
              {loading
                ? "Ju lutem prisni..."
                : mode === "login"
                ? "Kyçu"
                : "Krijo llogari"}
            </button>

            <p className="text-center text-sm text-slate-600">
              {mode === "login" ? (
                <>
                  Nuk keni llogari?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className="font-semibold text-blue-800 hover:text-blue-900"
                  >
                    Regjistrohu
                  </button>
                </>
              ) : (
                <>
                  Keni tashmë llogari?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-semibold text-blue-800 hover:text-blue-900"
                  >
                    Kyçu
                  </button>
                </>
              )}
            </p>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}