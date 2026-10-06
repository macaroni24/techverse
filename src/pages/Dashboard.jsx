import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreProvider";

function getToken() {
  const directToken =
    localStorage.getItem("techverse_token") ||
    sessionStorage.getItem("techverse_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (directToken) {
    return directToken;
  }

  const auth =
    localStorage.getItem("techverse_auth") ||
    sessionStorage.getItem("techverse_auth");

  if (!auth) {
    return "";
  }

  try {
    return JSON.parse(auth)?.token || "";
  } catch {
    return "";
  }
}

function getUser() {
  const directUser =
    localStorage.getItem("techverse_user") ||
    sessionStorage.getItem("techverse_user");

  if (directUser) {
    try {
      return JSON.parse(directUser);
    } catch {
      return null;
    }
  }

  const auth =
    localStorage.getItem("techverse_auth") ||
    sessionStorage.getItem("techverse_auth");

  if (!auth) {
    return null;
  }

  try {
    return JSON.parse(auth)?.user || null;
  } catch {
    return null;
  }
}

function getInitials(user) {
  const name = String(
    user?.name ||
      user?.fullName ||
      `${user?.firstName || ""} ${user?.lastName || ""}`
  ).trim();

  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }

    return parts[0].slice(0, 2).toUpperCase();
  }

  const email = String(user?.email || "").trim();

  if (email) {
    return email.slice(0, 2).toUpperCase();
  }

  return "TV";
}

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    cartCount,
    wishlistCount,
    logout,
  } = useStore();

  const token = getToken();

  const user = useMemo(() => getUser(), []);

  const initials = getInitials(user);

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.email ||
    "Përdorues";

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Kthehu në dyqan
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            Log out
          </button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-700">
            TechVerse Account
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Menaxho llogarinë dhe aktivitetin tënd në TechVerse.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {initials}
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-950">
                {displayName}
              </h2>

              {user?.email && (
                <p className="mt-1 break-all text-sm text-slate-500">
                  {user.email}
                </p>
              )}

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Llogaria aktive
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
              >
                Ballina
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
              >
                Lista e dëshirave
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
              >
                Shporta
                <span>→</span>
              </button>
            </div>
          </aside>

          <div>
            <section className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="text-sm text-slate-400 transition group-hover:text-blue-700">
                    →
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium text-slate-500">
                  Lista e dëshirave
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-950">
                  {wishlistCount}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Produkte të ruajtura
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        d="M6.5 6h15l-1.5 9h-12L6.5 6Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M6.5 6 5.7 3.8A2 2 0 0 0 3.8 2.5H2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span className="text-sm text-slate-400 transition group-hover:text-blue-700">
                    →
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium text-slate-500">
                  Shporta
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-950">
                  {cartCount}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Produkte në shportë
                </p>
              </button>
            </section>

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">
                Informacionet e llogarisë
              </h2>

              <div className="mt-6 divide-y divide-slate-100">
                <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                  <p className="text-sm font-medium text-slate-500">
                    Emri
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    {user?.name || user?.fullName || "—"}
                  </p>
                </div>

                <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                  <p className="text-sm font-medium text-slate-500">
                    Email
                  </p>

                  <p className="break-all text-sm font-semibold text-slate-900">
                    {user?.email || "—"}
                  </p>
                </div>

                <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                  <p className="text-sm font-medium text-slate-500">
                    Statusi
                  </p>

                  <p className="text-sm font-semibold text-green-700">
                    Aktiv
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-2xl bg-[#0b1015] p-6 text-white shadow-sm">
              <p className="text-sm text-slate-400">
                TechVerse
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Mirë se erdhe, {user?.name || "në llogarinë tënde"}.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Nga këtu mund të menaxhosh listën e dëshirave, shportën dhe të kthehesh në dyqan për të vazhduar blerjet.
              </p>

              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Shko në dyqan
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}