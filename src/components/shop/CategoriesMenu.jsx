import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function shopSearchPath(query) {
  return `/shop?q=${encodeURIComponent(query)}`;
}

export const categoryGroups = [
  {
    label: "Gaming",
    to: "/gaming",
    sections: [
      {
        title: "Gaming PC",
        items: [
          { label: "Të gjithë Gaming PC", query: "Gaming PCs" },
          { label: "RTX 4060", query: "RTX 4060" },
          { label: "RTX 4070", query: "RTX 4070" },
          { label: "RTX 4080", query: "RTX 4080" },
          { label: "RTX 4090", query: "RTX 4090" },
          { label: "Ryzen Gaming PC", query: "Ryzen Gaming PC" },
          { label: "Intel Gaming PC", query: "Intel Gaming PC" },
        ],
      },
      {
        title: "Konsola",
        items: [
          { label: "PlayStation 5", query: "PlayStation 5" },
          { label: "PS5 Slim", query: "PlayStation 5 Slim" },
          { label: "DualSense", query: "DualSense" },
          { label: "Xbox Series", query: "Xbox Series" },
          { label: "Nintendo Switch", query: "Nintendo Switch" },
          { label: "Controllers", query: "Controller" },
          { label: "Console Accessories", query: "Console Accessories" },
        ],
      },
      {
        title: "Gaming Gear",
        items: [
          { label: "Gaming Mouse", query: "Gaming Mouse" },
          { label: "Mechanical Keyboard", query: "Mechanical Keyboard" },
          { label: "Gaming Kufje", query: "Gaming Headset" },
          { label: "Wireless Mouse", query: "Wireless Mouse" },
          { label: "Mouse Pad", query: "Mouse Pad" },
          { label: "Streaming Gear", query: "Streaming Gear" },
          { label: "Racing Wheel", query: "Racing Wheel" },
        ],
      },
      {
        title: "Komponentë",
        items: [
          { label: "Kartela Grafike", query: "NVIDIA GeForce" },
          { label: "AMD Ryzen", query: "AMD Ryzen" },
          { label: "Intel Core", query: "Intel Core" },
          { label: "DDR5 RAM", query: "DDR5 RAM" },
          { label: "NVMe SSD", query: "NVMe SSD" },
          { label: "Power Supply", query: "Power Supply" },
          { label: "CPU Cooling", query: "CPU Cooler" },
        ],
      },
    ],
  },

  {
    label: "Laptopë & Telefona",
    to: "/laptops-phones",
    sections: [
      {
        title: "Telefona",
        items: [
          { label: "Të gjithë telefonat", query: "Phones" },
          { label: "iPhone", query: "iPhone" },
          { label: "Samsung Galaxy", query: "Samsung Galaxy" },
          { label: "Xiaomi", query: "Xiaomi" },
          { label: "Google Pixel", query: "Google Pixel" },
          { label: "OnePlus", query: "OnePlus" },
          { label: "Telefona 5G", query: "5G Phone" },
        ],
      },
      {
        title: "Laptopë",
        items: [
          { label: "Të gjithë laptopët", query: "Laptops" },
          { label: "Gaming Laptopë", query: "Gaming Laptop" },
          { label: "MacBook", query: "MacBook" },
          { label: "ASUS TUF", query: "ASUS TUF" },
          { label: "Lenovo Legion", query: "Lenovo Legion" },
          { label: "Dell Laptop", query: "Dell Laptop" },
          { label: "HP Laptop", query: "HP Laptop" },
        ],
      },
      {
        title: "Marka Telefona",
        items: [
          { label: "Apple", query: "Apple iPhone" },
          { label: "Samsung", query: "Samsung Galaxy" },
          { label: "Xiaomi", query: "Xiaomi Phone" },
          { label: "OnePlus", query: "OnePlus" },
          { label: "Google", query: "Google Pixel" },
          { label: "Android", query: "Android Phone" },
          { label: "Premium Phones", query: "Premium Phone" },
        ],
      },
      {
        title: "Marka Laptopë",
        items: [
          { label: "Apple MacBook", query: "MacBook" },
          { label: "ASUS", query: "ASUS Laptop" },
          { label: "Lenovo", query: "Lenovo Laptop" },
          { label: "Dell", query: "Dell Laptop" },
          { label: "HP", query: "HP Laptop" },
          { label: "MSI", query: "MSI Laptop" },
          { label: "Acer", query: "Acer Laptop" },
        ],
      },
    ],
  },

  {
    label: "Komponentë PC",
    to: shopSearchPath("PC Components"),
    sections: [
      {
        title: "Kartela Grafike",
        items: [
          { label: "Të gjitha GPU", query: "NVIDIA GeForce" },
          { label: "RTX 5090", query: "RTX 5090" },
          { label: "RTX 4080 SUPER", query: "RTX 4080 SUPER" },
          { label: "RTX 4070", query: "RTX 4070" },
          { label: "RTX 4060", query: "RTX 4060" },
          { label: "NVIDIA", query: "NVIDIA" },
          { label: "GeForce RTX", query: "GeForce RTX" },
        ],
      },
      {
        title: "CPU & Motherboard",
        items: [
          { label: "AMD Ryzen", query: "AMD Ryzen" },
          { label: "Ryzen 7", query: "Ryzen 7" },
          { label: "Intel Core", query: "Intel Core" },
          { label: "Motherboard", query: "Motherboard" },
          { label: "B650", query: "B650" },
          { label: "AM5", query: "AM5" },
          { label: "Gaming Motherboard", query: "Gaming Motherboard" },
        ],
      },
      {
        title: "RAM & Storage",
        items: [
          { label: "DDR5 RAM", query: "DDR5 RAM" },
          { label: "32GB RAM", query: "32GB RAM" },
          { label: "64GB RAM", query: "64GB RAM" },
          { label: "NVMe SSD", query: "NVMe SSD" },
          { label: "1TB SSD", query: "1TB SSD" },
          { label: "2TB SSD", query: "2TB SSD" },
          { label: "Storage", query: "SSD" },
        ],
      },
      {
        title: "Power & Cooling",
        items: [
          { label: "Power Supply", query: "Power Supply" },
          { label: "750W PSU", query: "750W Power Supply" },
          { label: "850W PSU", query: "850W Power Supply" },
          { label: "CPU Cooler", query: "CPU Cooler" },
          { label: "AIO Liquid", query: "AIO Liquid" },
          { label: "240mm AIO", query: "240mm AIO" },
          { label: "PC Fans", query: "PC Fan" },
        ],
      },
    ],
  },

  {
    label: "Aksesorë",
    to: "/Accessories",
    sections: [
      {
        title: "Mouse & Tastiera",
        items: [
          { label: "Të gjitha", query: "Keyboards & Mice" },
          { label: "Gaming Mouse", query: "Gaming Mouse" },
          { label: "Wireless Mouse", query: "Wireless Mouse" },
          { label: "Mechanical Keyboard", query: "Mechanical Keyboard" },
          { label: "Wireless Keyboard", query: "Wireless Keyboard" },
          { label: "Logitech", query: "Logitech" },
          { label: "Keychron", query: "Keychron" },
        ],
      },
      {
        title: "Audio",
        items: [
          { label: "Kufje", query: "Headset" },
          { label: "Gaming Kufje", query: "Gaming Headset" },
          { label: "Wireless Headset", query: "Wireless Headset" },
          { label: "AirPods", query: "AirPods" },
          { label: "SteelSeries", query: "SteelSeries" },
          { label: "Sony INZONE", query: "Sony INZONE" },
          { label: "Bluetooth Audio", query: "Bluetooth Audio" },
        ],
      },
      {
        title: "Karikim & Lidhje",
        items: [
          { label: "Karikues", query: "Charger" },
          { label: "USB-C Charger", query: "USB-C Charger" },
          { label: "Power Bank", query: "Power Bank" },
          { label: "USB-C Cable", query: "USB-C Cable" },
          { label: "HDMI", query: "HDMI Cable" },
          { label: "Anker", query: "Anker" },
          { label: "Baseus", query: "Baseus" },
        ],
      },
      {
        title: "Të tjera",
        items: [
          { label: "Mouse Pad", query: "Mouse Pad" },
          { label: "Webcam", query: "Webcam" },
          { label: "USB Hub", query: "USB Hub" },
          { label: "Docking Station", query: "Docking Station" },
          { label: "Laptop Stand", query: "Laptop Stand" },
          { label: "Phone Accessories", query: "Phone Accessories" },
          { label: "Smart Accessories", query: "Smart Accessories" },
        ],
      },
    ],
  },

  {
    label: "Monitorë",
    to: "/Monitors",
    sections: [
      {
        title: "Gaming",
        items: [
          { label: "Të gjithë monitorët", query: "Monitors" },
          { label: "120Hz", query: "120Hz Monitor" },
          { label: "144Hz", query: "144Hz" },
          { label: "165Hz", query: "165Hz" },
          { label: "180Hz", query: "180Hz Monitor" },
          { label: "240Hz", query: "240Hz" },
          { label: "1ms", query: "1ms Monitor" },
        ],
      },
      {
        title: "Rezolucioni",
        items: [
          { label: "Full HD", query: "Full HD Monitor" },
          { label: "QHD", query: "QHD Monitor" },
          { label: "WQHD", query: "WQHD" },
          { label: "4K", query: "4K Monitor" },
          { label: "UltraWide", query: "UltraWide" },
          { label: "DQHD", query: "DQHD" },
          { label: "Super UltraWide", query: "Super UltraWide" },
        ],
      },
      {
        title: "Madhësia",
        items: [
          { label: '24"', query: '24" Monitor' },
          { label: '27"', query: '27" Monitor' },
          { label: '32"', query: '32" Monitor' },
          { label: '34"', query: '34" Monitor' },
          { label: '38"', query: '38" Monitor' },
          { label: '49"', query: '49" Monitor' },
          { label: "Curved", query: "Curved Monitor" },
        ],
      },
      {
        title: "Marka",
        items: [
          { label: "MSI", query: "MSI Monitor" },
          { label: "Samsung", query: "Samsung Monitor" },
          { label: "ASUS", query: "ASUS Monitor" },
          { label: "AOC", query: "AOC Monitor" },
          { label: "LG", query: "LG Monitor" },
          { label: "Dell", query: "Dell Monitor" },
          { label: "Gaming Monitor", query: "Gaming Monitor" },
        ],
      },
    ],
  },

  {
    label: "Smart Pajisje",
    to: shopSearchPath("Smart Accessories"),
    sections: [
      {
        title: "Smartwatch",
        items: [
          { label: "Të gjitha", query: "Smart Accessories" },
          { label: "Apple Watch", query: "Apple Watch" },
          { label: "Galaxy Watch", query: "Galaxy Watch" },
          { label: "Samsung Watch", query: "Samsung Galaxy Watch" },
          { label: "Wearables", query: "Wearables" },
          { label: "Smart Bands", query: "Smart Band" },
          { label: "Watch Accessories", query: "Watch Accessories" },
        ],
      },
      {
        title: "Audio Smart",
        items: [
          { label: "AirPods Pro", query: "AirPods Pro" },
          { label: "Wireless Headset", query: "Wireless Headset" },
          { label: "Bluetooth Earbuds", query: "Bluetooth Earbuds" },
          { label: "Sony INZONE", query: "Sony INZONE" },
          { label: "SteelSeries", query: "SteelSeries" },
          { label: "Logitech", query: "Logitech Headset" },
          { label: "Wireless Audio", query: "Wireless Audio" },
        ],
      },
      {
        title: "Energjia",
        items: [
          { label: "USB-C Charger", query: "USB-C Charger" },
          { label: "Fast Charger", query: "Fast Charger" },
          { label: "Wireless Charger", query: "Wireless Charger" },
          { label: "Power Bank", query: "Power Bank" },
          { label: "Anker", query: "Anker" },
          { label: "Baseus", query: "Baseus" },
          { label: "Charging Accessories", query: "Charging Accessories" },
        ],
      },
      {
        title: "Marka & Pajisje",
        items: [
          { label: "Apple", query: "Apple Accessories" },
          { label: "Samsung", query: "Samsung Accessories" },
          { label: "Sony", query: "Sony Accessories" },
          { label: "Logitech", query: "Logitech" },
          { label: "Anker", query: "Anker" },
          { label: "Bluetooth", query: "Bluetooth" },
          { label: "Smart Accessories", query: "Smart Accessories" },
        ],
      },
    ],
  },

  {
    label: "Rrjet & Internet",
    to: shopSearchPath("Networking"),
    sections: [
      {
        title: "Router & Wi-Fi",
        items: [
          { label: "Router", query: "Router" },
          { label: "Wi-Fi Router", query: "WiFi Router" },
          { label: "Gaming Router", query: "Gaming Router" },
          { label: "Mesh Wi-Fi", query: "Mesh WiFi" },
          { label: "Access Point", query: "Access Point" },
          { label: "Wi-Fi Extender", query: "WiFi Extender" },
          { label: "Network Switch", query: "Network Switch" },
        ],
      },
      {
        title: "Kabllo & Adapterë",
        items: [
          { label: "Ethernet", query: "Ethernet Cable" },
          { label: "Cat 6", query: "Cat 6" },
          { label: "Cat 7", query: "Cat 7" },
          { label: "USB Network Adapter", query: "Network Adapter" },
          { label: "Wi-Fi Adapter", query: "WiFi Adapter" },
          { label: "LAN", query: "LAN" },
          { label: "Networking Accessories", query: "Networking Accessories" },
        ],
      },
      {
        title: "Marka",
        items: [
          { label: "TP-Link", query: "TP-Link" },
          { label: "ASUS", query: "ASUS Router" },
          { label: "Ubiquiti", query: "Ubiquiti" },
          { label: "D-Link", query: "D-Link" },
          { label: "Tenda", query: "Tenda" },
          { label: "Netgear", query: "Netgear" },
          { label: "Networking", query: "Networking" },
        ],
      },
      {
        title: "Sipas përdorimit",
        items: [
          { label: "Gaming", query: "Gaming Network" },
          { label: "Shtëpi", query: "Home WiFi" },
          { label: "Zyrë", query: "Office Network" },
          { label: "Smart Home", query: "Smart Home Network" },
          { label: "Streaming", query: "Streaming Network" },
          { label: "High Speed", query: "High Speed Router" },
          { label: "Network Security", query: "Network Security" },
        ],
      },
    ],
  },
];


function MenuIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6.5h16M4 12h16M4 17.5h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoryIcon({ index, className = "" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    "aria-hidden": "true",
  };

  const s = {
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = [
    <>
      <path d="M8.5 8h7a4.5 4.5 0 0 1 4.32 3.24l1.08 3.72a2.8 2.8 0 0 1-4.57 2.85l-1.74-1.56H9.41l-1.74 1.56a2.8 2.8 0 0 1-4.57-2.85l1.08-3.72A4.5 4.5 0 0 1 8.5 8Z" {...s} />
      <path d="M8 11.5v3M6.5 13h3M16.3 12.2h.01M18.2 14h.01" {...s} />
    </>,
    <>
      <rect x="5" y="3" width="10" height="18" rx="1.5" {...s} />
      <path d="M8 18h4M18 6h2v12h-2" {...s} />
    </>,
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.2" {...s} />
      <path d="M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2" {...s} />
    </>,
    <>
      <path d="M5 14v-2a7 7 0 1 1 14 0v2" {...s} />
      <path d="M5 13.5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v-6ZM19 13.5h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v-6Z" {...s} />
    </>,
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.2" {...s} />
      <path d="M9 21h6M12 17v4" {...s} />
    </>,
    <>
      <rect x="8" y="4" width="8" height="16" rx="2.6" {...s} />
      <path d="M10 2h4M10 22h4M10 8h4v4h-4z" {...s} />
    </>,
    <>
      <path d="M4 10a11 11 0 0 1 16 0M7 13a7 7 0 0 1 10 0M10 16a3 3 0 0 1 4 0" {...s} />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </>,
  ];

  return <svg {...common}>{icons[index] || icons[0]}</svg>;
}

export function CategoryMegaPanel({
  category,
  className = "",
  onNavigate,
}) {
  if (!category) return null;

  return (
    <div className={`overflow-hidden bg-white ${className}`}>
      <div className="flex h-[48px] items-center justify-between border-b border-slate-200 bg-white px-5">
        <div className="flex min-w-0 items-center gap-3">
          <h3 className="truncate text-[14px] font-bold text-slate-950">
            {category.label}
          </h3>
          <span className="h-4 w-px shrink-0 bg-slate-200" />
          <span className="hidden text-[11px] text-slate-500 xl:inline">
            Eksploro kategorinë
          </span>
        </div>

        <NavLink
          to={category.to}
          onClick={onNavigate}
          className="group ml-4 flex shrink-0 items-center gap-1.5 text-[11.5px] font-semibold text-emerald-800 transition-colors hover:text-emerald-950"
        >
          Shiko të gjitha
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </NavLink>
      </div>

      <div
        key={category.label}
        className="grid h-[326px] grid-cols-4 divide-x divide-slate-100 animate-[megaFade_.16s_ease-out]"
      >
        {category.sections.map((section) => (
          <div
            key={`${category.label}-${section.title}`}
            className="min-w-0 px-5 py-4"
          >
            <h4 className="mb-2.5 text-[12.5px] font-bold text-slate-900">
              {section.title}
            </h4>

            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={`${category.label}-${section.title}-${item.label}`}
                  to={shopSearchPath(item.query)}
                  onClick={onNavigate}
                  className="group flex min-h-[29px] items-center gap-2 text-[12px] font-medium text-slate-600 transition-colors hover:text-emerald-800"
                >
                  <span className="h-[3px] w-[3px] shrink-0 bg-slate-300 transition-colors group-hover:bg-emerald-600" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes megaFade {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

const SIDEBAR_TOP = 140;
const FOOTER_CLEARANCE = 18;

export default function CategoriesMenu() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [footerLift, setFooterLift] = useState(0);

  const closeTimerRef = useRef(null);
  const asideRef = useRef(null);

  const activeCategory =
    activeIndex === null ? null : categoryGroups[activeIndex];

  function cancelClose() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openCategory(index) {
    cancelClose();
    setActiveIndex(index);
  }

  function closeLater() {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 160);
  }

  function closeNow() {
    cancelClose();
    setActiveIndex(null);
  }

  function isRouteCategoryActive(category) {
    if (!category?.to) return false;

    if (category.to.startsWith("/shop?")) {
      if (location.pathname !== "/shop") return false;
      const categorySearch = category.to.slice(category.to.indexOf("?"));
      return location.search === categorySearch;
    }

    return location.pathname === category.to;
  }

  useEffect(() => {
    function syncWithFooter() {
      const sidebar = asideRef.current;

      if (!sidebar) return;

      const footer = document.querySelector(
        "footer, #footer, .site-footer, .footer"
      );

      if (!footer) {
        setFooterLift(0);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const sidebarHeight = sidebar.offsetHeight;
      const normalBottom = SIDEBAR_TOP + sidebarHeight;

      const nextLift = Math.min(
        0,
        footerTop - FOOTER_CLEARANCE - normalBottom
      );

      setFooterLift((current) =>
        Math.abs(current - nextLift) < 0.5 ? current : nextLift
      );
    }

    syncWithFooter();

    window.addEventListener("scroll", syncWithFooter, { passive: true });
    window.addEventListener("resize", syncWithFooter);

    return () => {
      window.removeEventListener("scroll", syncWithFooter);
      window.removeEventListener("resize", syncWithFooter);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <aside
      ref={asideRef}
      className="fixed left-[18px] top-[140px] z-[45] hidden w-[250px] transition-transform duration-150 ease-out min-[1500px]:block"
      style={{
        transform: `translateY(${footerLift}px)`,
      }}
      onMouseEnter={cancelClose}
      onMouseLeave={closeLater}
      aria-label="Kategoritë e produkteve"
    >
      <div className="overflow-hidden rounded-[2px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        {/* HEADER — styled directly from the reference */}
        <div className="flex h-[45px] items-center border-b border-emerald-950/20 bg-[#064e3b] px-3.5 text-white">
          <MenuIcon className="mr-3 h-[18px] w-[18px] text-white/90" />
          <span className="text-[12.5px] font-bold uppercase tracking-[0.02em]">
            Kategoritë
          </span>
        </div>

        <nav className="bg-white">
          {categoryGroups.map((category, index) => {
            const hovered = activeIndex === index;
            const routeActive =
              activeIndex === null && isRouteCategoryActive(category);
            const selected = hovered || routeActive;

            return (
              <div
                key={category.label}
                onMouseEnter={() => openCategory(index)}
              >
                <NavLink
                  to={category.to}
                  onClick={closeNow}
                  className={`group relative flex h-[46px] items-center gap-3 border-b border-slate-200/80 px-3.5 transition-colors last:border-b-0 ${
                    selected
                      ? "bg-emerald-50/75 text-slate-950"
                      : "bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {routeActive && (
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-emerald-700" />
                  )}

                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                      selected
                        ? "text-emerald-800"
                        : "text-emerald-800/90"
                    }`}
                  >
                    <CategoryIcon index={index} className="h-[19px] w-[19px]" />
                  </span>

                  <span
                    className={`min-w-0 flex-1 truncate text-[12.5px] ${
                      selected ? "font-semibold" : "font-semibold"
                    }`}
                  >
                    {category.label}
                  </span>

                  <ArrowIcon
                    className={`h-[14px] w-[14px] shrink-0 transition-transform ${
                      hovered
                        ? "translate-x-0.5 text-emerald-700"
                        : "text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-700"
                    }`}
                  />
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>

      {/* MEGA MENU — overlay; never pushes the Hero */}
      <div
        className={`absolute left-[calc(100%+12px)] top-0 z-[80] h-[374px] origin-left transition-all duration-150 ease-out ${
          activeCategory
            ? "visible pointer-events-auto translate-x-0 opacity-100"
            : "invisible pointer-events-none -translate-x-1 opacity-0"
        }`}
        style={{
          width: "min(860px, calc(100vw - 310px))",
        }}
        onMouseEnter={cancelClose}
        onMouseLeave={closeLater}
      >
        <CategoryMegaPanel
          category={activeCategory}
          onNavigate={closeNow}
          className="h-full rounded-[2px] border border-slate-200 shadow-[0_18px_42px_rgba(15,23,42,0.16)]"
        />
      </div>
    </aside>
  );
}