import { NavLink } from "react-router-dom";

function MainLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="block text-[13px] leading-[1.35] text-white transition hover:underline"
    >
      {children}
    </NavLink>
  );
}

function SmallLink({ to, title, children }) {
  return (
    <NavLink
      to={to}
      className="group block leading-tight"
    >
      <span className="block text-[11px] font-medium text-white group-hover:underline">
        {title}
      </span>

      <span className="mt-[1px] block text-[10px] leading-[1.15] text-slate-400">
        {children}
      </span>
    </NavLink>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-white">
        {title}
      </h3>

      <div className="space-y-2">
        {children}
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
        <div className="mx-auto max-w-[1000px] px-6 py-10 sm:py-12">
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4 md:gap-x-16">
            <FooterColumn title="Njihuni me Ne">
              <MainLink to="/about">
                Rreth TechVerse
              </MainLink>

              <MainLink to="/careers">
                Karriera
              </MainLink>

              <MainLink to="/blog">
                Blogu TechVerse
              </MainLink>

              <MainLink to="/stores">
                Dyqanet tona
              </MainLink>

              <MainLink to="/partners">
                Partnerët
              </MainLink>

              <MainLink to="/about">
                Kush jemi
              </MainLink>
            </FooterColumn>

            <FooterColumn title="Bli me TechVerse">
              <MainLink to="/shop">
                Të gjitha produktet
              </MainLink>

              <MainLink to="/shop?category=Gaming">
                Gaming
              </MainLink>

              <MainLink to="/shop?category=Laptops">
                Laptopë
              </MainLink>

              <MainLink to="/shop?category=Phones">
                Telefona
              </MainLink>

              <MainLink to="/shop?category=PC%20Components">
                Komponentë PC
              </MainLink>

              <MainLink to="/shop?category=Accessories">
                Aksesorë
              </MainLink>

              <MainLink to="/shop?sort=discount">
                Oferta & Zbritje
              </MainLink>
            </FooterColumn>

            <FooterColumn title="Pagesa & Porositë">
              <MainLink to="/help/payment">
                Mënyrat e pagesës
              </MainLink>

              <MainLink to="/orders">
                Porositë e mia
              </MainLink>

              <MainLink to="/help/orders">
                Gjurmo porosinë
              </MainLink>

              <MainLink to="/cart">
                Shporta
              </MainLink>

              <MainLink to="/wishlist">
                Lista e dëshirave
              </MainLink>

              <MainLink to="/help/warranty">
                Garancia
              </MainLink>
            </FooterColumn>

            <FooterColumn title="Na Lejoni t'ju Ndihmojmë">
              <MainLink to="/login">
                Llogaria juaj
              </MainLink>

              <MainLink to="/help/shipping">
                Dërgesa
              </MainLink>

              <MainLink to="/help/returns">
                Kthime & Rimbursime
              </MainLink>

              <MainLink to="/help/faq">
                Pyetje të shpeshta
              </MainLink>

              <MainLink to="/help/contact">
                Kontakto TechVerse
              </MainLink>

              <MainLink to="/help/contact">
                Mbështetja
              </MainLink>
            </FooterColumn>
          </div>
        </div>

        <div className="border-t border-[#3a4553]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center justify-center gap-5 px-6 py-6 sm:flex-row">
            <NavLink
              to="/"
              className="flex items-center"
            >
              <span className="text-[22px] font-extrabold tracking-tight text-white">
                VERSE
                <span className="text-blue-400">
                  TECH
                </span>
              </span>
            </NavLink>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                className="flex h-9 min-w-[125px] items-center justify-between gap-3 rounded-[3px] border border-slate-400 px-3 text-[12px] text-slate-200 transition hover:border-white"
              >
                <span className="flex items-center gap-2">
                  <span>◎</span>
                  Shqip
                </span>

                <span className="text-[9px] text-slate-400">
                  ▲▼
                </span>
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
          </div>
        </div>
      </div>

      <div className="bg-[#131a22] text-white">
        <div className="mx-auto max-w-[1000px] px-6 pb-8 pt-8">
          <div className="grid grid-cols-2 gap-x-7 gap-y-7 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
            <SmallLink
              to="/shop?category=Gaming"
              title="TechVerse Gaming"
            >
              Gaming PC, konzola dhe pajisje
            </SmallLink>

            <SmallLink
              to="/shop?category=Laptops"
              title="Laptopë"
            >
              Laptopë për punë, gaming dhe shkollë
            </SmallLink>

            <SmallLink
              to="/shop?category=Phones"
              title="Smartphone"
            >
              Telefonat më të rinj
            </SmallLink>

            <SmallLink
              to="/shop?category=PC%20Components"
              title="Komponentë PC"
            >
              Ndërto kompjuterin tënd
            </SmallLink>

            <SmallLink
              to="/shop?category=Monitors"
              title="Monitorë"
            >
              Gaming dhe produktivitet
            </SmallLink>

            <SmallLink
              to="/shop?category=Accessories"
              title="Aksesorë"
            >
              Pajisje për çdo setup
            </SmallLink>

            <SmallLink
              to="/shop?sort=discount"
              title="Oferta TechVerse"
            >
              Produktet me zbritje
            </SmallLink>

            <SmallLink
              to="/shop?category=Gaming%20PCs"
              title="Gaming PC"
            >
              Sisteme të gatshme gaming
            </SmallLink>

            <SmallLink
              to="/shop?category=Keyboards"
              title="Tastiera"
            >
              Mechanical dhe wireless
            </SmallLink>

            <SmallLink
              to="/shop?category=Mice"
              title="Mouse"
            >
              Gaming dhe produktivitet
            </SmallLink>

            <SmallLink
              to="/shop?category=Headsets"
              title="Headset"
            >
              Audio për gaming
            </SmallLink>

            <SmallLink
              to="/shop?category=Storage"
              title="SSD & Storage"
            >
              Hapësirë dhe shpejtësi
            </SmallLink>

            <SmallLink
              to="/shop?category=GPUs"
              title="Kartela Grafike"
            >
              NVIDIA dhe AMD
            </SmallLink>

            <SmallLink
              to="/shop?category=Processors"
              title="Procesorë"
            >
              Intel dhe AMD
            </SmallLink>

            <SmallLink
              to="/help/shipping"
              title="Dërgesa TechVerse"
            >
              Dërgesa të shpejta
            </SmallLink>

            <SmallLink
              to="/help/warranty"
              title="Garancia"
            >
              Mbrojtje për produktet tuaja
            </SmallLink>

            <SmallLink
              to="/help/returns"
              title="Kthimet"
            >
              Proces i thjeshtë kthimi
            </SmallLink>

            <SmallLink
              to="/wishlist"
              title="Lista e Dëshirave"
            >
              Ruaj produktet e preferuara
            </SmallLink>

            <SmallLink
              to="/orders"
              title="Porositë"
            >
              Menaxho blerjet e tua
            </SmallLink>

            <SmallLink
              to="/help/contact"
              title="TechVerse Support"
            >
              Ndihmë kur të nevojitet
            </SmallLink>

            <SmallLink
              to="/stores"
              title="TechVerse Store"
            >
              Na vizitoni në dyqan
            </SmallLink>

            <SmallLink
              to="/blog"
              title="TechVerse Blog"
            >
              Lajme, guida dhe teknologji
            </SmallLink>

            <SmallLink
              to="/partners"
              title="Partnerët"
            >
              Marka dhe partnerë zyrtarë
            </SmallLink>

            <SmallLink
              to="/about"
              title="Rreth Nesh"
            >
              Mëso më shumë për TechVerse
            </SmallLink>

            <SmallLink
              to="/register"
              title="Krijo Llogari"
            >
              Bli më shpejt dhe më lehtë
            </SmallLink>

            <SmallLink
              to="/help/faq"
              title="FAQ"
            >
              Përgjigje për pyetjet tuaja
            </SmallLink>

            <SmallLink
              to="/legal/privacy"
              title="Privatësia"
            >
              Si i mbrojmë të dhënat
            </SmallLink>

            <SmallLink
              to="/legal/terms"
              title="Kushtet"
            >
              Kushtet e përdorimit
            </SmallLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-white">
            <NavLink
              to="/legal/terms"
              className="hover:underline"
            >
              Kushtet e Përdorimit
            </NavLink>

            <NavLink
              to="/legal/privacy"
              className="hover:underline"
            >
              Politika e Privatësisë
            </NavLink>

            <NavLink
              to="/legal/cookies"
              className="hover:underline"
            >
              Politika e Cookies
            </NavLink>

            <NavLink
              to="/legal/refunds"
              className="hover:underline"
            >
              Politika e Rimbursimit
            </NavLink>

            <NavLink
              to="/legal/accessibility"
              className="hover:underline"
            >
              Qasshmëria
            </NavLink>
          </div>

          <p className="mt-2 text-center text-[10px] text-white">
            © {new Date().getFullYear()} TechVerse. Të gjitha të drejtat e
            rezervuara.
          </p>
        </div>
      </div>
    </footer>
  );
}