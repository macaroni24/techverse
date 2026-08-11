import { NavLink } from "react-router-dom";
import whiteLogo from "../../assets/WhiteLogo.PNG";

const brands = [
  {
    name: "Apple Authorized Reseller",
    image: "/brands/apple-authorized-reseller.png",
  },
  {
    name: "Samsung",
    image: "/brands/samsung.png",
  },
  {
    name: "MSI",
    image: "/brands/msi.png",
  },
  {
    name: "SteelSeries",
    image: "/brands/steelseries.png",
  },
  {
    name: "Lenovo",
    image: "/brands/lenovo.png",
  },
  {
    name: "Zowie",
    image: "/brands/zowie.png",
  },
];

function MainLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="block text-[15px] leading-7 text-slate-200 transition hover:text-white hover:underline"
    >
      {children}
    </NavLink>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-white">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function BrandStrip() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[1460px] px-4 py-7 sm:px-6">
        <div className="brand-strip flex gap-4 overflow-x-auto lg:grid lg:grid-cols-6 lg:overflow-visible">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-[64px] min-w-[210px] items-center justify-center rounded-md border border-slate-200 bg-white px-5 transition duration-200 hover:border-slate-300 lg:min-w-0"
            >
              <img
                src={brand.image}
                alt={brand.name}
                loading="lazy"
                className="max-h-[40px] max-w-[150px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full">
      <BrandStrip />

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
                Abonohuni në newsletter-in e TechVerse dhe merrni përditësime
                për çmimet më të mira për gaming PC, telefona, aksesorë dhe
                komponentë.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Shkruani emailin tuaj"
                  className="w-full rounded-md bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Abonohu
                </button>
              </div>

              <p className="mt-2 text-xs text-white/70">
                Duke u abonuar, ju pranoni të merrni email-e. Mund të
                çabonoheni në çdo kohë.
              </p>
            </form>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        className="w-full bg-[#37475a] py-[14px] text-center text-[11px] font-medium text-white transition hover:bg-[#485769]"
      >
        Kthehu lart
      </button>

      <div className="bg-[#232f3e] text-white">
        <div className="mx-auto max-w-[1100px] px-6 py-12">
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:grid-cols-4 md:gap-x-16">
            <FooterColumn title="Njihuni me Ne">
              <MainLink to="/about">Rreth TechVerse</MainLink>
              <MainLink to="/careers">Karriera</MainLink>
              <MainLink to="/blog">Blogu TechVerse</MainLink>
              <MainLink to="/stores">Dyqanet tona</MainLink>
              <MainLink to="/partners">Partnerët</MainLink>
              <MainLink to="/about">Kush jemi</MainLink>
            </FooterColumn>

            <FooterColumn title="Bli me TechVerse">
              <MainLink to="/shop">Të gjitha produktet</MainLink>
              <MainLink to="/shop?category=Gaming">Gaming</MainLink>
              <MainLink to="/shop?category=Laptops">Laptopë</MainLink>
              <MainLink to="/shop?category=Phones">Telefona</MainLink>
              <MainLink to="/shop?category=PC%20Components">
                Komponentë PC
              </MainLink>
              <MainLink to="/shop?category=Accessories">Aksesorë</MainLink>
              <MainLink to="/shop?sort=discount">Oferta & Zbritje</MainLink>
            </FooterColumn>

            <FooterColumn title="Pagesa & Porositë">
              <MainLink to="/help/payment">Mënyrat e pagesës</MainLink>
              <MainLink to="/orders">Porositë e mia</MainLink>
              <MainLink to="/help/orders">Gjurmo porosinë</MainLink>
              <MainLink to="/cart">Shporta</MainLink>
              <MainLink to="/wishlist">Lista e dëshirave</MainLink>
              <MainLink to="/help/warranty">Garancia</MainLink>
            </FooterColumn>

            <FooterColumn title="Na Lejoni t'ju Ndihmojmë">
              <MainLink to="/login">Llogaria juaj</MainLink>
              <MainLink to="/help/shipping">Dërgesa</MainLink>
              <MainLink to="/help/returns">Kthime & Rimbursime</MainLink>
              <MainLink to="/help/faq">Pyetje të shpeshta</MainLink>
              <MainLink to="/help/contact">Kontakto TechVerse</MainLink>
              <MainLink to="/help/contact">Mbështetja</MainLink>
            </FooterColumn>
          </div>
        </div>

        <div className="border-t border-[#3a4553]">
          <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-6 py-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <NavLink to="/" className="flex items-center">
                <span className="text-[24px] font-extrabold tracking-tight text-white">
                  VERSE
                  <span className="text-blue-400">TECH</span>
                </span>
              </NavLink>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="flex h-9 min-w-[125px] items-center justify-between gap-3 rounded-[3px] border border-slate-400 px-3 text-[12px] text-slate-200 transition hover:border-white"
                >
                  <span className="flex items-center gap-2">
                    <span>◎</span>
                    Shqip
                  </span>

                  <span className="text-[9px] text-slate-400">▲▼</span>
                </button>

                <button
                  type="button"
                  className="flex h-9 min-w-[125px] items-center gap-2 rounded-[3px] border border-slate-400 px-3 text-[12px] text-slate-200 transition hover:border-white"
                >
                  <span>€</span>
                  EUR - Euro
                </button>

                <button
                  type="button"
                  className="flex h-9 min-w-[135px] items-center gap-2 rounded-[3px] border border-slate-400 px-3 text-[12px] text-slate-200 transition hover:border-white"
                >
                  <span>🇽🇰</span>
                  Kosovë
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-300">
                <NavLink to="/legal/terms" className="hover:text-white hover:underline">
                  Kushtet e Përdorimit
                </NavLink>

                <NavLink
                  to="/legal/privacy"
                  className="hover:text-white hover:underline"
                >
                  Politika e Privatësisë
                </NavLink>

                <NavLink
                  to="/legal/cookies"
                  className="hover:text-white hover:underline"
                >
                  Politika e Cookies
                </NavLink>

                <NavLink
                  to="/legal/refunds"
                  className="hover:text-white hover:underline"
                >
                  Politika e Rimbursimit
                </NavLink>

                <NavLink
                  to="/legal/accessibility"
                  className="hover:text-white hover:underline"
                >
                  Qasshmëria
                </NavLink>
              </div>

              <p className="text-[11px] text-slate-400">
                © {new Date().getFullYear()} TechVerse. Të gjitha të drejtat e
                rezervuara.
              </p>
            </div>

            <div className="flex justify-start md:justify-end">
              <img
                src={whiteLogo}
                alt="TechVerse"
                className="h-14 w-auto object-contain opacity-95 md:h-16"
              />
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .brand-strip {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .brand-strip::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </footer>
  );
}
