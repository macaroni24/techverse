import { NavLink, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

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
        ],
      },
      {
        title: "PlayStation",
        items: [
          { label: "PlayStation 5", query: "PlayStation 5" },
          { label: "PS5 Slim", query: "PlayStation 5 Slim" },
          { label: "DualSense", query: "DualSense" },
          { label: "Controllers", query: "Controller" },
          { label: "Gaming Consoles", query: "Gaming Consoles" },
        ],
      },
      {
        title: "Gaming Gear",
        items: [
          { label: "Gaming Mouse", query: "Gaming Mouse" },
          { label: "Mechanical Keyboard", query: "Mechanical Keyboard" },
          { label: "Gaming Kufje", query: "Gaming Headset" },
          { label: "Wireless Mouse", query: "Wireless Mouse" },
          { label: "Keyboards & Mice", query: "Keyboards & Mice" },
        ],
      },
      {
        title: "Komponentë",
        items: [
          { label: "Kartela Grafike", query: "NVIDIA GeForce" },
          { label: "AMD Ryzen", query: "AMD Ryzen" },
          { label: "DDR5 RAM", query: "DDR5 RAM" },
          { label: "NVMe SSD", query: "NVMe SSD" },
          { label: "PC Components", query: "PC Components" },
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
        ],
      },
      {
        title: "Marka Telefona",
        items: [
          { label: "Apple", query: "Apple" },
          { label: "Samsung", query: "Samsung" },
          { label: "Xiaomi", query: "Xiaomi" },
          { label: "OnePlus", query: "OnePlus" },
          { label: "Google", query: "Google Pixel" },
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
          { label: "NVIDIA", query: "NVIDIA" },
        ],
      },
      {
        title: "CPU & Motherboard",
        items: [
          { label: "AMD Ryzen", query: "AMD Ryzen" },
          { label: "Ryzen 7", query: "Ryzen 7" },
          { label: "Motherboard", query: "Motherboard" },
          { label: "B650", query: "B650" },
          { label: "AM5", query: "AM5" },
        ],
      },
      {
        title: "RAM & Storage",
        items: [
          { label: "DDR5 RAM", query: "DDR5 RAM" },
          { label: "32GB RAM", query: "32GB" },
          { label: "NVMe SSD", query: "NVMe SSD" },
          { label: "1TB SSD", query: "1TB SSD" },
          { label: "Storage", query: "SSD" },
        ],
      },
      {
        title: "Power & Cooling",
        items: [
          { label: "Power Supply", query: "Power Supply" },
          { label: "750W PSU", query: "750W Power Supply" },
          { label: "CPU Cooler", query: "CPU Cooler" },
          { label: "AIO Liquid", query: "AIO Liquid" },
          { label: "240mm AIO", query: "240mm AIO" },
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
          { label: "Mechanical Keyboard", query: "Mechanical Keyboard" },
          { label: "Logitech", query: "Logitech" },
          { label: "Keychron", query: "Keychron" },
        ],
      },
      {
        title: "Audio",
        items: [
          { label: "Kufje", query: "Headset" },
          { label: "Gaming Kufje", query: "Gaming Headset" },
          { label: "AirPods", query: "AirPods" },
          { label: "SteelSeries", query: "SteelSeries" },
          { label: "Sony INZONE", query: "Sony INZONE" },
        ],
      },
      {
        title: "Karikim",
        items: [
          { label: "Karikues", query: "Charger" },
          { label: "USB-C", query: "USB-C Charger" },
          { label: "Power Bank", query: "Power Bank" },
          { label: "Anker", query: "Anker" },
          { label: "Baseus", query: "Baseus" },
        ],
      },
      {
        title: "Wireless",
        items: [
          { label: "Wireless Mouse", query: "Wireless Mouse" },
          {
            label: "Wireless Keyboard",
            query: "Wireless Mechanical Keyboard",
          },
          { label: "Wireless Headset", query: "Wireless Headset" },
          { label: "Bluetooth", query: "Bluetooth" },
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
          { label: "144Hz", query: "144Hz" },
          { label: "165Hz", query: "165Hz" },
          { label: "240Hz", query: "240Hz" },
          { label: "1ms", query: "1ms" },
        ],
      },
      {
        title: "Rezolucioni",
        items: [
          { label: "4K", query: "4K Monitor" },
          { label: "WQHD", query: "WQHD" },
          { label: "DQHD", query: "DQHD" },
          { label: "UltraWide", query: "UltraWide" },
          { label: "Super UltraWide", query: "Super UltraWide" },
        ],
      },
      {
        title: "Madhësia",
        items: [
          { label: '24"', query: '24"' },
          { label: '27"', query: '27"' },
          { label: '32"', query: '32"' },
          { label: '34"', query: '34"' },
          { label: '49"', query: '49"' },
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
          { label: "Galaxy Watch", query: "Galaxy Watch" },
          { label: "Samsung Watch", query: "Samsung Galaxy Watch" },
          { label: "Apple Watch", query: "Apple Watch" },
          { label: "Wearables", query: "Watch" },
        ],
      },
      {
        title: "Audio Smart",
        items: [
          { label: "AirPods Pro", query: "AirPods Pro" },
          { label: "Wireless Headset", query: "Wireless Headset" },
          { label: "Sony INZONE", query: "Sony INZONE" },
          { label: "SteelSeries", query: "SteelSeries" },
          { label: "Logitech", query: "Logitech Headset" },
        ],
      },
      {
        title: "Energjia",
        items: [
          { label: "USB-C Charger", query: "USB-C Charger" },
          { label: "Anker", query: "Anker" },
          { label: "Power Bank", query: "Power Bank" },
          { label: "Baseus", query: "Baseus" },
          { label: "Karikues", query: "Charger" },
        ],
      },
      {
        title: "Marka",
        items: [
          { label: "Apple", query: "Apple" },
          { label: "Samsung", query: "Samsung" },
          { label: "Sony", query: "Sony" },
          { label: "Logitech", query: "Logitech" },
          { label: "Anker", query: "Anker" },
        ],
      },
    ],
  },
];

function MenuIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CategoryMegaPanel({
  category,
  className = "",
  onNavigate,
}) {
  if (!category) {
    return null;
  }

  return (
    <div className={`overflow-hidden bg-white ${className}`}>
      <div className="flex h-12 items-center justify-between border-b border-slate-200 px-5">
        <div className="flex items-center gap-3">
          <h3 className="text-[15px] font-bold text-slate-900">
            {category.label}
          </h3>

          <span className="h-4 w-px bg-slate-200" />

          <span className="text-[12px] text-slate-500">
            Eksploro kategorinë
          </span>
        </div>

        <NavLink
          to={category.to}
          onClick={onNavigate}
          className="group flex items-center gap-2 text-[12px] font-semibold text-emerald-800 transition-colors duration-200 hover:text-emerald-950"
        >
          Shiko të gjitha

          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </NavLink>
      </div>

      <div
        key={category.label}
        className="grid h-[302px] grid-cols-4 divide-x divide-slate-100 animate-[megaFade_.22s_ease-out]"
      >
        {category.sections.map((section) => (
          <div
            key={`${category.label}-${section.title}`}
            className="min-w-0 px-5 py-4"
          >
            <h4 className="mb-3 text-[13.5px] font-bold text-slate-900">
              {section.title}
            </h4>

            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={`${category.label}-${section.title}-${item.label}`}
                  to={shopSearchPath(item.query)}
                  onClick={onNavigate}
                  className="group flex min-h-[32px] items-center gap-2 text-[13px] font-medium text-slate-600 transition-all duration-150 hover:translate-x-0.5 hover:text-emerald-800"
                >
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-slate-300 transition-colors duration-150 group-hover:bg-emerald-600" />

                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes megaFade {
            from {
              opacity: 0;
              transform: translateX(-6px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default function CategoriesMenu() {
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(null);

  const closeTimerRef = useRef(null);

  if (location.pathname !== "/") {
    return null;
  }

  const activeCategory =
    activeIndex === null
      ? null
      : categoryGroups[activeIndex];

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
    }, 180);
  }

  return (
    <div
      className="relative z-[40] hidden h-[350px] w-[230px] shrink-0 lg:block"
      onMouseEnter={cancelClose}
      onMouseLeave={closeLater}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[7px] border border-slate-200 bg-white shadow-sm">
        <div className="flex h-12 shrink-0 items-center border-b border-slate-200 px-4">
          <MenuIcon className="mr-2.5 h-[17px] w-[17px] text-emerald-900" />

          <span className="text-[14px] font-bold text-slate-900">
            Kategoritë
          </span>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col">
          {categoryGroups.map((category, index) => {
            const selected = activeIndex === index;

            return (
              <div
                key={category.label}
                className="min-h-0 flex-1"
                onMouseEnter={() => openCategory(index)}
              >
                <NavLink
                  to={category.to}
                  className={`group flex h-full items-center justify-between border-b border-slate-100 px-4 text-[13.5px] font-medium transition-all duration-200 last:border-b-0 ${
                    selected
                      ? "bg-emerald-50 font-semibold text-emerald-900"
                      : "bg-white text-slate-700 hover:bg-slate-50 hover:text-emerald-900"
                  }`}
                >
                  <span>{category.label}</span>

                  <ArrowIcon
                    className={`h-4 w-4 transition-all duration-200 ${
                      selected
                        ? "translate-x-0.5 text-emerald-700"
                        : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-emerald-700"
                    }`}
                  />
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>

      <div
        className={`absolute left-full top-12 z-[70] h-[302px] w-[820px] origin-left transition-all duration-200 ease-out ${
          activeCategory
            ? "visible pointer-events-auto translate-x-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-x-2 scale-[0.995] opacity-0"
        }`}
        onMouseEnter={cancelClose}
        onMouseLeave={closeLater}
      >
        <CategoryMegaPanel
          category={activeCategory}
          className="h-full rounded-r-[7px] border border-l-0 border-slate-200 shadow-[12px_16px_40px_rgba(15,23,42,0.16)]"
        />
      </div>
    </div>
  );
}