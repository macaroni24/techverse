import { NavLink } from "react-router-dom";

function SectionTitle({ children }) {
  return (
    <h3 className="text-sm font-semibold text-slate-900">
      {children}
    </h3>
  );
}

function FooterLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="text-sm text-slate-600 transition hover:text-blue-800"
    >
      {children}
    </NavLink>
  );
}

function ChipLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-800"
    >
      {children}
    </NavLink>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">

      {/* =====================================================
          NEWSLETTER
      ====================================================== */}

      <div className="w-full bg-[#0b1015] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                Oferta & Produkte të Reja TechVerse
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Merrni oferta javore, produkte të reja dhe gaming drops.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                Abonohuni në newsletter-in e TechVerse dhe merrni
                përditësime për çmimet më të mira për gaming PC,
                telefona, aksesorë dhe komponentë.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full"
            >
              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="email"
                  placeholder="Shkruani emailin tuaj"
                  className="w-full rounded-md bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <button
                  type="submit"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-md
                    bg-blue-800
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-blue-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-200
                  "
                >
                  Abonohu
                </button>

              </div>

              <p className="mt-2 text-xs text-white/70">
                Duke u abonuar, ju pranoni të merrni email-e.
                Mund të çabonoheni në çdo kohë.
              </p>
            </form>

          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">

        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">

          {/* COMPANY */}

          <div>

            <NavLink
              to="/"
              className="flex items-center gap-3"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#0b1015] text-white">
                <span className="text-lg font-bold">
                  T
                </span>
              </span>

              <div className="leading-tight">

                <p className="text-lg font-semibold text-slate-900">
                  TechVerse
                </p>

                <p className="text-xs text-slate-600">
                  Gaming • PC • Telefona • Aksesorë
                </p>

              </div>
            </NavLink>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              TechVerse është një dyqan modern online.
              Shfletoni produktet, ruani në listën e dëshirave
              dhe menaxhoni shportën tuaj.
            </p>

            <div className="mt-6 space-y-2 text-sm text-slate-600">

              <p>
                <span className="font-semibold text-slate-900">
                  Mbështetja:
                </span>{" "}
                support@techverse.com
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Telefoni:
                </span>{" "}
                +383 44 000 000
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Orari:
                </span>{" "}
                Hën–Sht 09:00–21:00
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Lokacioni:
                </span>{" "}
                Prishtinë, Kosovë
              </p>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>Pagesë e sigurt</Badge>
              <Badge>Dërgesë e shpejtë</Badge>
              <Badge>Kthime të lehta</Badge>
            </div>

          </div>

          {/* LINKS */}

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

            <div>
              <SectionTitle>
                Dyqani
              </SectionTitle>

              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/shop?category=Gaming">
                  Gaming
                </FooterLink>

                <FooterLink to="/shop?category=Gaming%20PCs">
                  Gaming PC
                </FooterLink>

                <FooterLink to="/shop?category=Phones">
                  Telefona
                </FooterLink>

                <FooterLink to="/shop?category=Laptops">
                  Laptopë
                </FooterLink>

                <FooterLink to="/shop?category=Monitors">
                  Monitorë
                </FooterLink>

                <FooterLink to="/shop?category=PC%20Components">
                  Komponentë PC
                </FooterLink>

                <FooterLink to="/shop?sort=discount">
                  Zbritje
                </FooterLink>
              </div>
            </div>

            <div>
              <SectionTitle>
                Shërbimi për Klientë
              </SectionTitle>

              <div className="mt-4 flex flex-col gap-2">

                <FooterLink to="/help/shipping">
                  Info për dërgesën
                </FooterLink>

                <FooterLink to="/help/returns">
                  Kthime & Rimbursime
                </FooterLink>

                <FooterLink to="/help/warranty">
                  Garancia
                </FooterLink>

                <FooterLink to="/help/faq">
                  Pyetje të shpeshta
                </FooterLink>

                <FooterLink to="/help/contact">
                  Kontakto mbështetjen
                </FooterLink>

                <FooterLink to="/help/orders">
                  Gjurmo porosinë
                </FooterLink>

              </div>
            </div>

            <div>
              <SectionTitle>
                Kompania
              </SectionTitle>

              <div className="mt-4 flex flex-col gap-2">

                <FooterLink to="/about">
                  Rreth TechVerse
                </FooterLink>

                <FooterLink to="/careers">
                  Karriera
                </FooterLink>

                <FooterLink to="/blog">
                  Blogu Tech
                </FooterLink>

                <FooterLink to="/stores">
                  Dyqanet
                </FooterLink>

                <FooterLink to="/partners">
                  Partnerët
                </FooterLink>

              </div>
            </div>

            <div>
              <SectionTitle>
                Llogaria
              </SectionTitle>

              <div className="mt-4 flex flex-col gap-2">

                <FooterLink to="/login">
                  Kyçu
                </FooterLink>

                <FooterLink to="/register">
                  Krijo llogari
                </FooterLink>

                <FooterLink to="/orders">
                  Porositë
                </FooterLink>

                <FooterLink to="/wishlist">
                  Lista e dëshirave
                </FooterLink>

                <FooterLink to="/cart">
                  Shporta
                </FooterLink>

              </div>
            </div>

            <div>
              <SectionTitle>
                Ligjore
              </SectionTitle>

              <div className="mt-4 flex flex-col gap-2">

                <FooterLink to="/legal/terms">
                  Kushtet e shërbimit
                </FooterLink>

                <FooterLink to="/legal/privacy">
                  Politika e privatësisë
                </FooterLink>

                <FooterLink to="/legal/cookies">
                  Politika e cookies
                </FooterLink>

                <FooterLink to="/legal/refunds">
                  Politika e rimbursimit
                </FooterLink>

                <FooterLink to="/legal/accessibility">
                  Qasshmëria
                </FooterLink>

              </div>
            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TechVerse.
            Të gjitha të drejtat e rezervuara.
          </p>

          <div className="flex flex-wrap gap-4 text-xs">

            <NavLink
              to="/legal/privacy"
              className="text-slate-500 transition hover:text-blue-800"
            >
              Privatësia
            </NavLink>

            <NavLink
              to="/legal/terms"
              className="text-slate-500 transition hover:text-blue-800"
            >
              Kushtet
            </NavLink>

            <NavLink
              to="/legal/cookies"
              className="text-slate-500 transition hover:text-blue-800"
            >
              Cookies
            </NavLink>

            <NavLink
              to="/help/contact"
              className="text-slate-500 transition hover:text-blue-800"
            >
              Mbështetja
            </NavLink>

          </div>

        </div>

      </div>

    </footer>
  );
}