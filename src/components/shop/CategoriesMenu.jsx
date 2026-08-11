import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/BlackLogo.png";
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
                    {
                        label: "Të gjithë Gaming PC",
                        query: "Gaming PCs",
                    },
                    {
                        label: "RTX 4060",
                        query: "RTX 4060",
                    },
                    {
                        label: "RTX 4070",
                        query: "RTX 4070",
                    },
                    {
                        label: "RTX 4080",
                        query: "RTX 4080",
                    },
                    {
                        label: "RTX 4090",
                        query: "RTX 4090",
                    },
                    {
                        label: "Ryzen Gaming PC",
                        query: "Ryzen Gaming PC",
                    },
                    {
                        label: "Intel Gaming PC",
                        query: "Intel Gaming PC",
                    },
                ],
            },
            {
                title: "Konsola",
                items: [
                    {
                        label: "PlayStation 5",
                        query: "PlayStation 5",
                    },
                    {
                        label: "PS5 Slim",
                        query: "PlayStation 5 Slim",
                    },
                    {
                        label: "DualSense",
                        query: "DualSense",
                    },
                    {
                        label: "Xbox Series",
                        query: "Xbox Series",
                    },
                    {
                        label: "Nintendo Switch",
                        query: "Nintendo Switch",
                    },
                    {
                        label: "Controllers",
                        query: "Controller",
                    },
                    {
                        label: "Console Accessories",
                        query: "Console Accessories",
                    },
                ],
            },
            {
                title: "Gaming Gear",
                items: [
                    {
                        label: "Gaming Mouse",
                        query: "Gaming Mouse",
                    },
                    {
                        label: "Mechanical Keyboard",
                        query: "Mechanical Keyboard",
                    },
                    {
                        label: "Gaming Kufje",
                        query: "Gaming Headset",
                    },
                    {
                        label: "Wireless Mouse",
                        query: "Wireless Mouse",
                    },
                    {
                        label: "Mouse Pad",
                        query: "Mouse Pad",
                    },
                    {
                        label: "Streaming Gear",
                        query: "Streaming Gear",
                    },
                    {
                        label: "Racing Wheel",
                        query: "Racing Wheel",
                    },
                ],
            },
            {
                title: "Komponentë",
                items: [
                    {
                        label: "Kartela Grafike",
                        query: "NVIDIA GeForce",
                    },
                    {
                        label: "AMD Ryzen",
                        query: "AMD Ryzen",
                    },
                    {
                        label: "Intel Core",
                        query: "Intel Core",
                    },
                    {
                        label: "DDR5 RAM",
                        query: "DDR5 RAM",
                    },
                    {
                        label: "NVMe SSD",
                        query: "NVMe SSD",
                    },
                    {
                        label: "Power Supply",
                        query: "Power Supply",
                    },
                    {
                        label: "CPU Cooling",
                        query: "CPU Cooler",
                    },
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
                    {
                        label: "Të gjithë telefonat",
                        query: "Phones",
                    },
                    {
                        label: "iPhone",
                        query: "iPhone",
                    },
                    {
                        label: "Samsung Galaxy",
                        query: "Samsung Galaxy",
                    },
                    {
                        label: "Xiaomi",
                        query: "Xiaomi",
                    },
                    {
                        label: "Google Pixel",
                        query: "Google Pixel",
                    },
                    {
                        label: "OnePlus",
                        query: "OnePlus",
                    },
                    {
                        label: "Telefona 5G",
                        query: "5G Phone",
                    },
                ],
            },
            {
                title: "Laptopë",
                items: [
                    {
                        label: "Të gjithë laptopët",
                        query: "Laptops",
                    },
                    {
                        label: "Gaming Laptopë",
                        query: "Gaming Laptop",
                    },
                    {
                        label: "MacBook",
                        query: "MacBook",
                    },
                    {
                        label: "ASUS TUF",
                        query: "ASUS TUF",
                    },
                    {
                        label: "Lenovo Legion",
                        query: "Lenovo Legion",
                    },
                    {
                        label: "Dell Laptop",
                        query: "Dell Laptop",
                    },
                    {
                        label: "HP Laptop",
                        query: "HP Laptop",
                    },
                ],
            },
            {
                title: "Marka Telefona",
                items: [
                    {
                        label: "Apple",
                        query: "Apple iPhone",
                    },
                    {
                        label: "Samsung",
                        query: "Samsung Galaxy",
                    },
                    {
                        label: "Xiaomi",
                        query: "Xiaomi Phone",
                    },
                    {
                        label: "OnePlus",
                        query: "OnePlus",
                    },
                    {
                        label: "Google",
                        query: "Google Pixel",
                    },
                    {
                        label: "Android",
                        query: "Android Phone",
                    },
                    {
                        label: "Premium Phones",
                        query: "Premium Phone",
                    },
                ],
            },
            {
                title: "Marka Laptopë",
                items: [
                    {
                        label: "Apple MacBook",
                        query: "MacBook",
                    },
                    {
                        label: "ASUS",
                        query: "ASUS Laptop",
                    },
                    {
                        label: "Lenovo",
                        query: "Lenovo Laptop",
                    },
                    {
                        label: "Dell",
                        query: "Dell Laptop",
                    },
                    {
                        label: "HP",
                        query: "HP Laptop",
                    },
                    {
                        label: "MSI",
                        query: "MSI Laptop",
                    },
                    {
                        label: "Acer",
                        query: "Acer Laptop",
                    },
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
                    {
                        label: "Të gjitha GPU",
                        query: "NVIDIA GeForce",
                    },
                    {
                        label: "RTX 5090",
                        query: "RTX 5090",
                    },
                    {
                        label: "RTX 4080 SUPER",
                        query: "RTX 4080 SUPER",
                    },
                    {
                        label: "RTX 4070",
                        query: "RTX 4070",
                    },
                    {
                        label: "RTX 4060",
                        query: "RTX 4060",
                    },
                    {
                        label: "NVIDIA",
                        query: "NVIDIA",
                    },
                    {
                        label: "GeForce RTX",
                        query: "GeForce RTX",
                    },
                ],
            },
            {
                title: "CPU & Motherboard",
                items: [
                    {
                        label: "AMD Ryzen",
                        query: "AMD Ryzen",
                    },
                    {
                        label: "Ryzen 7",
                        query: "Ryzen 7",
                    },
                    {
                        label: "Intel Core",
                        query: "Intel Core",
                    },
                    {
                        label: "Motherboard",
                        query: "Motherboard",
                    },
                    {
                        label: "B650",
                        query: "B650",
                    },
                    {
                        label: "AM5",
                        query: "AM5",
                    },
                    {
                        label: "Gaming Motherboard",
                        query: "Gaming Motherboard",
                    },
                ],
            },
            {
                title: "RAM & Storage",
                items: [
                    {
                        label: "DDR5 RAM",
                        query: "DDR5 RAM",
                    },
                    {
                        label: "32GB RAM",
                        query: "32GB RAM",
                    },
                    {
                        label: "64GB RAM",
                        query: "64GB RAM",
                    },
                    {
                        label: "NVMe SSD",
                        query: "NVMe SSD",
                    },
                    {
                        label: "1TB SSD",
                        query: "1TB SSD",
                    },
                    {
                        label: "2TB SSD",
                        query: "2TB SSD",
                    },
                    {
                        label: "Storage",
                        query: "SSD",
                    },
                ],
            },
            {
                title: "Power & Cooling",
                items: [
                    {
                        label: "Power Supply",
                        query: "Power Supply",
                    },
                    {
                        label: "750W PSU",
                        query: "750W Power Supply",
                    },
                    {
                        label: "850W PSU",
                        query: "850W Power Supply",
                    },
                    {
                        label: "CPU Cooler",
                        query: "CPU Cooler",
                    },
                    {
                        label: "AIO Liquid",
                        query: "AIO Liquid",
                    },
                    {
                        label: "240mm AIO",
                        query: "240mm AIO",
                    },
                    {
                        label: "PC Fans",
                        query: "PC Fan",
                    },
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
                    {
                        label: "Të gjitha",
                        query: "Keyboards & Mice",
                    },
                    {
                        label: "Gaming Mouse",
                        query: "Gaming Mouse",
                    },
                    {
                        label: "Wireless Mouse",
                        query: "Wireless Mouse",
                    },
                    {
                        label: "Mechanical Keyboard",
                        query: "Mechanical Keyboard",
                    },
                    {
                        label: "Wireless Keyboard",
                        query: "Wireless Keyboard",
                    },
                    {
                        label: "Logitech",
                        query: "Logitech",
                    },
                    {
                        label: "Keychron",
                        query: "Keychron",
                    },
                ],
            },
            {
                title: "Audio",
                items: [
                    {
                        label: "Kufje",
                        query: "Headset",
                    },
                    {
                        label: "Gaming Kufje",
                        query: "Gaming Headset",
                    },
                    {
                        label: "Wireless Headset",
                        query: "Wireless Headset",
                    },
                    {
                        label: "AirPods",
                        query: "AirPods",
                    },
                    {
                        label: "SteelSeries",
                        query: "SteelSeries",
                    },
                    {
                        label: "Sony INZONE",
                        query: "Sony INZONE",
                    },
                    {
                        label: "Bluetooth Audio",
                        query: "Bluetooth Audio",
                    },
                ],
            },
            {
                title: "Karikim & Lidhje",
                items: [
                    {
                        label: "Karikues",
                        query: "Charger",
                    },
                    {
                        label: "USB-C Charger",
                        query: "USB-C Charger",
                    },
                    {
                        label: "Power Bank",
                        query: "Power Bank",
                    },
                    {
                        label: "USB-C Cable",
                        query: "USB-C Cable",
                    },
                    {
                        label: "HDMI",
                        query: "HDMI Cable",
                    },
                    {
                        label: "Anker",
                        query: "Anker",
                    },
                    {
                        label: "Baseus",
                        query: "Baseus",
                    },
                ],
            },
            {
                title: "Të tjera",
                items: [
                    {
                        label: "Mouse Pad",
                        query: "Mouse Pad",
                    },
                    {
                        label: "Webcam",
                        query: "Webcam",
                    },
                    {
                        label: "USB Hub",
                        query: "USB Hub",
                    },
                    {
                        label: "Docking Station",
                        query: "Docking Station",
                    },
                    {
                        label: "Laptop Stand",
                        query: "Laptop Stand",
                    },
                    {
                        label: "Phone Accessories",
                        query: "Phone Accessories",
                    },
                    {
                        label: "Smart Accessories",
                        query: "Smart Accessories",
                    },
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
                    {
                        label: "Të gjithë monitorët",
                        query: "Monitors",
                    },
                    {
                        label: "120Hz",
                        query: "120Hz Monitor",
                    },
                    {
                        label: "144Hz",
                        query: "144Hz",
                    },
                    {
                        label: "165Hz",
                        query: "165Hz",
                    },
                    {
                        label: "180Hz",
                        query: "180Hz Monitor",
                    },
                    {
                        label: "240Hz",
                        query: "240Hz",
                    },
                    {
                        label: "1ms",
                        query: "1ms Monitor",
                    },
                ],
            },
            {
                title: "Rezolucioni",
                items: [
                    {
                        label: "Full HD",
                        query: "Full HD Monitor",
                    },
                    {
                        label: "QHD",
                        query: "QHD Monitor",
                    },
                    {
                        label: "WQHD",
                        query: "WQHD",
                    },
                    {
                        label: "4K",
                        query: "4K Monitor",
                    },
                    {
                        label: "UltraWide",
                        query: "UltraWide",
                    },
                    {
                        label: "DQHD",
                        query: "DQHD",
                    },
                    {
                        label: "Super UltraWide",
                        query: "Super UltraWide",
                    },
                ],
            },
            {
                title: "Madhësia",
                items: [
                    {
                        label: '24"',
                        query: '24" Monitor',
                    },
                    {
                        label: '27"',
                        query: '27" Monitor',
                    },
                    {
                        label: '32"',
                        query: '32" Monitor',
                    },
                    {
                        label: '34"',
                        query: '34" Monitor',
                    },
                    {
                        label: '38"',
                        query: '38" Monitor',
                    },
                    {
                        label: '49"',
                        query: '49" Monitor',
                    },
                    {
                        label: "Curved",
                        query: "Curved Monitor",
                    },
                ],
            },
            {
                title: "Marka",
                items: [
                    {
                        label: "MSI",
                        query: "MSI Monitor",
                    },
                    {
                        label: "Samsung",
                        query: "Samsung Monitor",
                    },
                    {
                        label: "ASUS",
                        query: "ASUS Monitor",
                    },
                    {
                        label: "AOC",
                        query: "AOC Monitor",
                    },
                    {
                        label: "LG",
                        query: "LG Monitor",
                    },
                    {
                        label: "Dell",
                        query: "Dell Monitor",
                    },
                    {
                        label: "Gaming Monitor",
                        query: "Gaming Monitor",
                    },
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
                    {
                        label: "Të gjitha",
                        query: "Smart Accessories",
                    },
                    {
                        label: "Apple Watch",
                        query: "Apple Watch",
                    },
                    {
                        label: "Galaxy Watch",
                        query: "Galaxy Watch",
                    },
                    {
                        label: "Samsung Watch",
                        query: "Samsung Galaxy Watch",
                    },
                    {
                        label: "Wearables",
                        query: "Wearables",
                    },
                    {
                        label: "Smart Bands",
                        query: "Smart Band",
                    },
                    {
                        label: "Watch Accessories",
                        query: "Watch Accessories",
                    },
                ],
            },
            {
                title: "Audio Smart",
                items: [
                    {
                        label: "AirPods Pro",
                        query: "AirPods Pro",
                    },
                    {
                        label: "Wireless Headset",
                        query: "Wireless Headset",
                    },
                    {
                        label: "Bluetooth Earbuds",
                        query: "Bluetooth Earbuds",
                    },
                    {
                        label: "Sony INZONE",
                        query: "Sony INZONE",
                    },
                    {
                        label: "SteelSeries",
                        query: "SteelSeries",
                    },
                    {
                        label: "Logitech",
                        query: "Logitech Headset",
                    },
                    {
                        label: "Wireless Audio",
                        query: "Wireless Audio",
                    },
                ],
            },
            {
                title: "Energjia",
                items: [
                    {
                        label: "USB-C Charger",
                        query: "USB-C Charger",
                    },
                    {
                        label: "Fast Charger",
                        query: "Fast Charger",
                    },
                    {
                        label: "Wireless Charger",
                        query: "Wireless Charger",
                    },
                    {
                        label: "Power Bank",
                        query: "Power Bank",
                    },
                    {
                        label: "Anker",
                        query: "Anker",
                    },
                    {
                        label: "Baseus",
                        query: "Baseus",
                    },
                    {
                        label: "Charging Accessories",
                        query: "Charging Accessories",
                    },
                ],
            },
            {
                title: "Marka & Pajisje",
                items: [
                    {
                        label: "Apple",
                        query: "Apple Accessories",
                    },
                    {
                        label: "Samsung",
                        query: "Samsung Accessories",
                    },
                    {
                        label: "Sony",
                        query: "Sony Accessories",
                    },
                    {
                        label: "Logitech",
                        query: "Logitech",
                    },
                    {
                        label: "Anker",
                        query: "Anker",
                    },
                    {
                        label: "Bluetooth",
                        query: "Bluetooth",
                    },
                    {
                        label: "Smart Accessories",
                        query: "Smart Accessories",
                    },
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
                    {
                        label: "Router",
                        query: "Router",
                    },
                    {
                        label: "Wi-Fi Router",
                        query: "WiFi Router",
                    },
                    {
                        label: "Gaming Router",
                        query: "Gaming Router",
                    },
                    {
                        label: "Mesh Wi-Fi",
                        query: "Mesh WiFi",
                    },
                    {
                        label: "Access Point",
                        query: "Access Point",
                    },
                    {
                        label: "Wi-Fi Extender",
                        query: "WiFi Extender",
                    },
                    {
                        label: "Network Switch",
                        query: "Network Switch",
                    },
                ],
            },
            {
                title: "Kabllo & Adapterë",
                items: [
                    {
                        label: "Ethernet",
                        query: "Ethernet Cable",
                    },
                    {
                        label: "Cat 6",
                        query: "Cat 6",
                    },
                    {
                        label: "Cat 7",
                        query: "Cat 7",
                    },
                    {
                        label: "USB Network Adapter",
                        query: "Network Adapter",
                    },
                    {
                        label: "Wi-Fi Adapter",
                        query: "WiFi Adapter",
                    },
                    {
                        label: "LAN",
                        query: "LAN",
                    },
                    {
                        label: "Networking Accessories",
                        query: "Networking Accessories",
                    },
                ],
            },
            {
                title: "Marka",
                items: [
                    {
                        label: "TP-Link",
                        query: "TP-Link",
                    },
                    {
                        label: "ASUS",
                        query: "ASUS Router",
                    },
                    {
                        label: "Ubiquiti",
                        query: "Ubiquiti",
                    },
                    {
                        label: "D-Link",
                        query: "D-Link",
                    },
                    {
                        label: "Tenda",
                        query: "Tenda",
                    },
                    {
                        label: "Netgear",
                        query: "Netgear",
                    },
                    {
                        label: "Networking",
                        query: "Networking",
                    },
                ],
            },
            {
                title: "Sipas përdorimit",
                items: [
                    {
                        label: "Gaming",
                        query: "Gaming Network",
                    },
                    {
                        label: "Shtëpi",
                        query: "Home WiFi",
                    },
                    {
                        label: "Zyrë",
                        query: "Office Network",
                    },
                    {
                        label: "Smart Home",
                        query: "Smart Home Network",
                    },
                    {
                        label: "Streaming",
                        query: "Streaming Network",
                    },
                    {
                        label: "High Speed",
                        query: "High Speed Router",
                    },
                    {
                        label: "Network Security",
                        query: "Network Security",
                    },
                ],
            },
        ],
    },
    {
        label: "TV & Smart Home",
        to: shopSearchPath("TV Smart Home"),
        sections: [
            {
                title: "Televizorë",
                items: [
                    {
                        label: "Të gjithë TV",
                        query: "Television",
                    },
                    {
                        label: "Smart TV",
                        query: "Smart TV",
                    },
                    {
                        label: "4K TV",
                        query: "4K TV",
                    },
                    {
                        label: "OLED",
                        query: "OLED TV",
                    },
                    {
                        label: "QLED",
                        query: "QLED TV",
                    },
                    {
                        label: "Samsung TV",
                        query: "Samsung TV",
                    },
                    {
                        label: "LG TV",
                        query: "LG TV",
                    },
                ],
            },
            {
                title: "Smart Home",
                items: [
                    {
                        label: "Smart Home",
                        query: "Smart Home",
                    },
                    {
                        label: "Smart Lighting",
                        query: "Smart Lighting",
                    },
                    {
                        label: "Smart Plug",
                        query: "Smart Plug",
                    },
                    {
                        label: "Smart Camera",
                        query: "Smart Camera",
                    },
                    {
                        label: "Doorbell",
                        query: "Smart Doorbell",
                    },
                    {
                        label: "Sensors",
                        query: "Smart Sensor",
                    },
                    {
                        label: "Automation",
                        query: "Home Automation",
                    },
                ],
            },
            {
                title: "Entertainment",
                items: [
                    {
                        label: "Streaming",
                        query: "Streaming Device",
                    },
                    {
                        label: "Android TV",
                        query: "Android TV",
                    },
                    {
                        label: "Apple TV",
                        query: "Apple TV",
                    },
                    {
                        label: "Chromecast",
                        query: "Chromecast",
                    },
                    {
                        label: "Soundbar",
                        query: "Soundbar",
                    },
                    {
                        label: "Speakers",
                        query: "Speakers",
                    },
                    {
                        label: "Home Cinema",
                        query: "Home Cinema",
                    },
                ],
            },
            {
                title: "Marka",
                items: [
                    {
                        label: "Samsung",
                        query: "Samsung Smart TV",
                    },
                    {
                        label: "LG",
                        query: "LG Smart TV",
                    },
                    {
                        label: "Sony",
                        query: "Sony TV",
                    },
                    {
                        label: "Xiaomi",
                        query: "Xiaomi Smart Home",
                    },
                    {
                        label: "Philips",
                        query: "Philips TV",
                    },
                    {
                        label: "Google",
                        query: "Google Home",
                    },
                    {
                        label: "Apple",
                        query: "Apple Home",
                    },
                ],
            },
        ],
    },
    {
        label: "Printerë & Zyrë",
        to: shopSearchPath("Printers Office"),
        sections: [
            {
                title: "Printerë",
                items: [
                    {
                        label: "Të gjithë printerët",
                        query: "Printer",
                    },
                    {
                        label: "Laser Printer",
                        query: "Laser Printer",
                    },
                    {
                        label: "Inkjet Printer",
                        query: "Inkjet Printer",
                    },
                    {
                        label: "Multifunction",
                        query: "Multifunction Printer",
                    },
                    {
                        label: "Color Printer",
                        query: "Color Printer",
                    },
                    {
                        label: "Wi-Fi Printer",
                        query: "WiFi Printer",
                    },
                    {
                        label: "Photo Printer",
                        query: "Photo Printer",
                    },
                ],
            },
            {
                title: "Zyrë",
                items: [
                    {
                        label: "Office Equipment",
                        query: "Office Equipment",
                    },
                    {
                        label: "Scanner",
                        query: "Scanner",
                    },
                    {
                        label: "Shredder",
                        query: "Paper Shredder",
                    },
                    {
                        label: "Calculator",
                        query: "Calculator",
                    },
                    {
                        label: "Label Printer",
                        query: "Label Printer",
                    },
                    {
                        label: "Projector",
                        query: "Projector",
                    },
                    {
                        label: "Presentation",
                        query: "Presentation Equipment",
                    },
                ],
            },
            {
                title: "Materiale",
                items: [
                    {
                        label: "Toner",
                        query: "Printer Toner",
                    },
                    {
                        label: "Ink",
                        query: "Printer Ink",
                    },
                    {
                        label: "Paper",
                        query: "Printer Paper",
                    },
                    {
                        label: "Labels",
                        query: "Printer Labels",
                    },
                    {
                        label: "Photo Paper",
                        query: "Photo Paper",
                    },
                    {
                        label: "Cartridge",
                        query: "Printer Cartridge",
                    },
                    {
                        label: "Office Supplies",
                        query: "Office Supplies",
                    },
                ],
            },
            {
                title: "Marka",
                items: [
                    {
                        label: "HP",
                        query: "HP Printer",
                    },
                    {
                        label: "Canon",
                        query: "Canon Printer",
                    },
                    {
                        label: "Epson",
                        query: "Epson Printer",
                    },
                    {
                        label: "Brother",
                        query: "Brother Printer",
                    },
                    {
                        label: "Xerox",
                        query: "Xerox Printer",
                    },
                    {
                        label: "Samsung",
                        query: "Samsung Printer",
                    },
                    {
                        label: "Lexmark",
                        query: "Lexmark Printer",
                    },
                ],
            },
        ],
    },
];
function HomeIcon({ className = "", }) {
    return (<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 11.2 12 4l8.5 7.2" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"/>

      <path d="M5.5 10v9h5v-5h3v5h5v-9" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
function ArrowIcon({ className = "", }) {
    return (<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
function CategoryIcon({ index, className = "", }) {
    const common = {
        viewBox: "0 0 24 24",
        fill: "none",
        className,
        "aria-hidden": "true",
    };
    const s = {
        stroke: "currentColor",
        strokeWidth: 1.55,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };
    const icons = [
        <>
      <path d="M8.5 8h7a4.5 4.5 0 0 1 4.32 3.24l1.08 3.72a2.8 2.8 0 0 1-4.57 2.85l-1.74-1.56H9.41l-1.74 1.56a2.8 2.8 0 0 1-4.57-2.85l1.08-3.72A4.5 4.5 0 0 1 8.5 8Z" {...s}/>

      <path d="M8 11.5v3M6.5 13h3M16.3 12.2h.01M18.2 14h.01" {...s}/>
    </>,
        <>
      <rect x="5" y="3" width="10" height="18" rx="1.5" {...s}/>

      <path d="M8 18h4M18 6h2v12h-2" {...s}/>
    </>,
        <>
      <rect x="7" y="7" width="10" height="10" rx="1.2" {...s}/>

      <path d="M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2" {...s}/>
    </>,
        <>
      <path d="M5 14v-2a7 7 0 1 1 14 0v2" {...s}/>

      <path d="M5 13.5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v-6ZM19 13.5h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v-6Z" {...s}/>
    </>,
        <>
      <rect x="3" y="5" width="18" height="12" rx="1.2" {...s}/>

      <path d="M9 21h6M12 17v4" {...s}/>
    </>,
        <>
      <rect x="8" y="4" width="8" height="16" rx="2.6" {...s}/>

      <path d="M10 2h4M10 22h4M10 8h4v4h-4z" {...s}/>
    </>,
        <>
      <path d="M4 10a11 11 0 0 1 16 0M7 13a7 7 0 0 1 10 0M10 16a3 3 0 0 1 4 0" {...s}/>

      <circle cx="12" cy="19" r="1" fill="currentColor"/>
    </>,
        <>
      <rect x="3" y="5" width="18" height="13" rx="1.5" {...s}/>

      <path d="m8 2 4 3 4-3M9 21h6" {...s}/>

      <circle cx="18" cy="15" r=".7" fill="currentColor"/>
    </>,
        <>
      <path d="M7 8V3h10v5M6 17H4a2 2 0 0 1-2-2v-4a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4a2 2 0 0 1-2 2h-2" {...s}/>

      <rect x="6" y="14" width="12" height="7" rx="1" {...s}/>

      <circle cx="18" cy="11" r=".7" fill="currentColor"/>
    </>,
    ];
    return (<svg {...common}>
      {icons[index] ||
            icons[0]}
    </svg>);
}
export function CategoryMegaPanel({ category, className = "", onNavigate, }) {
    if (!category) {
        return null;
    }
    return (<div className={`
        flex
        h-full
        flex-col
        overflow-hidden
        bg-white

        ${className}
      `}>
      <div className="
          flex
          h-[50px]
          shrink-0
          items-center
          justify-between

          border-b
          border-slate-200

          bg-white

          px-5
        ">
        <div className="
            flex
            min-w-0
            items-center
            gap-3
          ">
          <h3 className="
              whitespace-nowrap

              text-[14.5px]
              font-semibold
              leading-[1.3]
              text-slate-700
            ">
            {category.label}
          </h3>

          <span className="
              h-4
              w-px
              shrink-0
              bg-slate-200
            "/>

          <span className="
              hidden

              text-[11.5px]
              font-normal
              text-slate-500

              xl:inline
            ">
            Eksploro
            kategorinë
          </span>
        </div>

        <NavLink to={category.to} onClick={onNavigate} className="
            group

            ml-4

            flex
            shrink-0
            items-center
            gap-2

            text-[12px]
            font-medium
            text-blue-700

            transition-colors

            hover:text-blue-800
          ">
          Shiko të gjitha

          <span className="
              transition-transform

              group-hover:translate-x-0.5
            ">
            →
          </span>
        </NavLink>
      </div>

      <div key={category.label} className="
          grid
          min-h-0
          flex-1
          grid-cols-4

          divide-x
          divide-slate-100
        ">
        {category.sections.map((section) => (<div key={`${category.label}-${section.title}`} className="
                min-w-0

                px-5
                py-4
              ">
              <h4 className="
                  mb-2

                  text-[13.5px]
                  font-semibold
                  leading-[1.3]
                  text-slate-700
                ">
                {section.title}
              </h4>

              <div className="
                  space-y-0
                ">
                {section.items.map((item) => (<NavLink key={`${category.label}-${section.title}-${item.label}`} to={shopSearchPath(item.query)} onClick={onNavigate} className="
                        group

                        flex
                        min-h-[31px]
                        items-center
                        gap-2

                        text-[13px]
                        font-normal
                        leading-[1.35]
                        text-slate-500

                        transition-colors

                        hover:text-blue-700
                      ">
                      <span className="
                          h-[3px]
                          w-[3px]
                          shrink-0

                          rounded-none

                          bg-slate-600

                          transition-colors

                          group-hover:bg-blue-500
                        "/>

                      <span>
                        {item.label}
                      </span>
                    </NavLink>))}
              </div>
            </div>))}
      </div>
    </div>);
}
const HIDDEN_CATEGORY_PATHS = [
    "/login",
    "/signin",
    "/sign-in",
];
function BurgerIcon({ className = "", }) {
    return (<svg viewBox="0 0 40 32" fill="none" className={className} aria-hidden="true">
      <path d="M3 5H37" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/>

      <path d="M3 16H37" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/>

      <path d="M3 27H37" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/>
    </svg>);
}
function CloseIcon({ className = "", }) {
    return (<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round"/>
    </svg>);
}
function ChevronDownIcon({ className = "", }) {
    return (<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6.5 9 5.5 5.5L17.5 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
export default function CategoriesMenu() {
    const location = useLocation();
    const [menuOpen, setMenuOpen,] = useState(false);
    const [expandedCategory, setExpandedCategory,] = useState(null);
    const normalizedPath = location.pathname
        .toLowerCase()
        .replace(/\/+$/, "") || "/";
    const isLoginPage = HIDDEN_CATEGORY_PATHS.includes(normalizedPath);
    const homeActive = normalizedPath ===
        "/";
    function closeMenu() {
        setMenuOpen(false);
        setExpandedCategory(null);
    }
    function isRouteCategoryActive(category) {
        if (!category?.to) {
            return false;
        }
        if (category.to.startsWith("/shop?")) {
            if (location.pathname !==
                "/shop") {
                return false;
            }
            const categorySearch = category.to.slice(category.to.indexOf("?"));
            return (location.search ===
                categorySearch);
        }
        return (location.pathname ===
            category.to);
    }
    function toggleCategory(index) {
        setExpandedCategory((current) => current ===
            index
            ? null
            : index);
    }
    useEffect(() => {
        setMenuOpen(false);
        setExpandedCategory(null);
    }, [
        location.pathname,
        location.search,
    ]);
    useEffect(() => {
        const landscapeMedia = window.matchMedia("(orientation: landscape)");
        const handleOrientationChange = (event) => {
            if (!event.matches) {
                setMenuOpen(false);
                setExpandedCategory(null);
            }
        };
        if (!landscapeMedia.matches) {
            setMenuOpen(false);
            setExpandedCategory(null);
        }
        if (landscapeMedia
            .addEventListener) {
            landscapeMedia
                .addEventListener("change", handleOrientationChange);
            return () => {
                landscapeMedia
                    .removeEventListener("change", handleOrientationChange);
            };
        }
        landscapeMedia.addListener(handleOrientationChange);
        return () => {
            landscapeMedia.removeListener(handleOrientationChange);
        };
    }, []);
    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }
        const previousBodyOverflow = document.body
            .style
            .overflow;
        document.body.style.overflow =
            "hidden";
        function handleKeyDown(event) {
            if (event.key ===
                "Escape") {
                setMenuOpen(false);
                setExpandedCategory(null);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body
                .style
                .overflow =
                previousBodyOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);
    if (isLoginPage) {
        return null;
    }
    return (<>
      

      <button type="button" onClick={() => setMenuOpen(true)} aria-label="Hap kategoritë" aria-expanded={menuOpen} className={`
          orientation-categories-trigger

          fixed
          left-[16px]
          top-[85px]
          z-[160]

          h-[56px]
          w-[64px]

          items-center
          justify-center

          bg-transparent

          p-0

          text-white

          transition-all
          duration-200

          hover:scale-[1.05]
          active:scale-[0.96]

          sm:left-[20px]
          md:left-[24px]
          lg:left-[26px]
          xl:left-[30px]
          2xl:left-[36px]

          ${menuOpen
            ? `
                  pointer-events-none
                  opacity-0
                `
            : `
                  pointer-events-auto
                  opacity-100
                `}
        `}>
        <BurgerIcon className="
            h-[29px]
            w-[39px]

            translate-y-[9px]

            xl:h-[30px]
            xl:w-[40px]
          "/>
      </button>

      

      <div className={`
          fixed
          inset-0
          z-[500]

          transition-[visibility]
          duration-300

          ${menuOpen
            ? `
                  visible
                  pointer-events-auto
                `
            : `
                  invisible
                  pointer-events-none
                `}
        `} aria-hidden={!menuOpen}>
        

        <button type="button" onClick={closeMenu} aria-label="Mbyll menunë" className={`
            absolute
            inset-0

            h-full
            w-full

            bg-slate-950/60

            backdrop-blur-[1px]

            transition-opacity
            duration-300

            md:duration-[360ms]
            md:ease-[cubic-bezier(0.22,1,0.36,1)]

            ${menuOpen
            ? "opacity-100"
            : "opacity-0"}
          `}/>

        

        <aside className={`
            absolute
            left-0
            top-0

            flex

            h-[100dvh]
            w-[min(91vw,390px)]

            flex-col

            overflow-hidden

            border-r
            border-slate-200

            bg-white

            shadow-[24px_0_70px_rgba(15,23,42,0.24)]

            transition-transform
            duration-300
            ease-out

            sm:w-[390px]

            md:transition-[transform,opacity]
            md:duration-[420ms]
            md:ease-[cubic-bezier(0.22,1,0.36,1)]

            ${menuOpen
            ? `
                    translate-x-0

                    md:opacity-100
                  `
            : `
                    -translate-x-full

                    md:opacity-0
                  `}
          `} aria-label="Kategoritë">
          

          <div className="
              shrink-0

              bg-white

              px-5
              pt-4
            ">
            <div className="
                flex
                h-[70px]
                items-center
                justify-between
                gap-4
              ">
              <NavLink to="/" onClick={closeMenu} className="
                  flex
                  min-w-0
                  items-center
                ">
                <img src={logo} alt="Verse Tech" className="
                    block

                    h-auto
                    max-h-[48px]

                    w-auto
                    max-w-[190px]

                    object-contain
                    object-left
                  "/>
              </NavLink>

              <button type="button" onClick={closeMenu} aria-label="Mbyll kategoritë" className="
                  flex
                  h-[42px]
                  w-[42px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-none

                  text-slate-500

                  transition

                  hover:bg-slate-100
                  hover:text-slate-950

                  active:scale-95
                ">
                <CloseIcon className="
                    h-[22px]
                    w-[22px]
                  "/>
              </button>
            </div>

            <div className="
                h-px
                w-full
                bg-slate-200
              "/>
          </div>

          

          <nav className="
              category-drawer-scroll

              min-h-0
              flex-1

              overflow-y-auto
              overscroll-contain

              px-2.5
              pb-6
              pt-3

              sm:px-3
            ">
            

            <NavLink to="/" onClick={closeMenu} className={`
                group

                flex
                min-h-[54px]
                items-center
                gap-3

                rounded-none

                px-3

                transition-colors
                duration-150

                ${homeActive
            ? `
                        bg-blue-50
                        text-blue-700
                      `
            : `
                        text-slate-700

                        hover:bg-slate-50
                        hover:text-slate-950
                      `}
              `}>
              <span className={`
                  flex
                  h-[34px]
                  w-[34px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-none

                  transition

                  ${homeActive
            ? `
                          bg-white
                          text-blue-500

                          shadow-sm

                          ring-1
                          ring-blue-100
                        `
            : `
                          bg-slate-50
                          text-slate-500

                          group-hover:bg-white
                          group-hover:text-blue-700
                          group-hover:shadow-sm
                        `}
                `}>
                <HomeIcon className="
                    h-[18px]
                    w-[18px]
                  "/>
              </span>

              <span className="
                  min-w-0
                  flex-1

                  truncate

                  text-[14px]
                  font-semibold
                ">
                Home
              </span>

              <ArrowIcon className="
                  h-[14px]
                  w-[14px]

                  text-slate-500

                  transition-transform

                  group-hover:translate-x-0.5
                "/>
            </NavLink>

            <div className="
                mx-3
                my-2

                h-px

                bg-slate-100
              "/>

            

            {categoryGroups.map((category, index) => {
            const expanded = expandedCategory ===
                index;
            const routeActive = isRouteCategoryActive(category);
            const highlighted = expanded ||
                routeActive;
            return (<div key={category.label} className="
                      mb-[2px]
                    ">
                    <div className={`
                        group

                        flex
                        min-h-[54px]
                        items-center

                        rounded-none

                        transition-colors
                        duration-150

                        ${highlighted
                    ? "bg-blue-50"
                    : "hover:bg-slate-50"}
                      `}>
                      <NavLink to={category.to} onClick={closeMenu} className="
                          flex
                          min-w-0
                          flex-1
                          items-center
                          gap-3

                          px-3
                          py-2
                        ">
                        <span className={`
                            flex
                            h-[34px]
                            w-[34px]
                            shrink-0
                            items-center
                            justify-center

                            rounded-none

                            transition

                            ${highlighted
                    ? `
                                    bg-white
                                    text-blue-500

                                    shadow-sm

                                    ring-1
                                    ring-blue-100
                                  `
                    : `
                                    bg-slate-50
                                    text-slate-500

                                    group-hover:bg-white
                                    group-hover:text-blue-700
                                    group-hover:shadow-sm
                                  `}
                          `}>
                          <CategoryIcon index={index} className="
                              h-[18px]
                              w-[18px]
                            "/>
                        </span>

                        <span className={`
                            min-w-0
                            flex-1

                            truncate

                            text-[14px]
                            font-semibold
                            tracking-[-0.01em]

                            ${highlighted
                    ? "text-blue-700"
                    : "text-slate-700"}
                          `}>
                          {category.label}
                        </span>
                      </NavLink>

                      

                      <button type="button" onClick={() => toggleCategory(index)} aria-label={`${expanded
                    ? "Mbyll"
                    : "Hap"} ${category.label}`} aria-expanded={expanded} className="
                          mr-2

                          flex
                          h-[40px]
                          w-[40px]
                          shrink-0
                          items-center
                          justify-center

                          rounded-none

                          text-slate-500

                          transition

                          hover:bg-white
                          hover:text-blue-700
                        ">
                        <ChevronDownIcon className={`
                            h-[16px]
                            w-[16px]

                            transition-transform
                            duration-200

                            ${expanded
                    ? `
                                    rotate-180
                                    text-blue-500
                                  `
                    : "rotate-0"}
                          `}/>
                      </button>
                    </div>

                    

                    <div className={`
                        grid

                        transition-[grid-template-rows,opacity]
                        duration-250
                        ease-out

                        ${expanded
                    ? `
                                grid-rows-[1fr]
                                opacity-100
                              `
                    : `
                                grid-rows-[0fr]
                                opacity-0
                              `}
                      `}>
                      <div className="
                          min-h-0
                          overflow-hidden
                        ">
                        <div className="
                            mb-3
                            ml-[23px]
                            mr-1
                            mt-1

                            border-l
                            border-blue-100

                            pl-[24px]
                          ">
                          {category.sections.map((section) => (<div key={`${category.label}-${section.title}`} className="
                                  pb-3
                                  pt-2
                                ">
                                <div className="
                                    mb-1.5

                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.075em]
                                    text-slate-500
                                  ">
                                  {section.title}
                                </div>

                                <div className="
                                    space-y-[1px]
                                  ">
                                  {section.items.map((item) => (<NavLink key={`${category.label}-${section.title}-${item.label}`} to={shopSearchPath(item.query)} onClick={closeMenu} className="
                                          group/item

                                          flex
                                          min-h-[34px]
                                          items-center
                                          gap-2

                                          rounded-none

                                          px-2

                                          text-[12.5px]
                                          font-medium
                                          text-slate-500

                                          transition

                                          hover:bg-blue-50
                                          hover:text-blue-700
                                        ">
                                        <span className="
                                            h-[4px]
                                            w-[4px]
                                            shrink-0

                                            rounded-none

                                            bg-slate-600

                                            transition-colors

                                            group-hover/item:bg-blue-500
                                          "/>

                                        <span>
                                          {item.label}
                                        </span>
                                      </NavLink>))}
                                </div>
                              </div>))}

                          <NavLink to={category.to} onClick={closeMenu} className="
                              mb-2
                              mt-1

                              inline-flex
                              items-center
                              gap-1.5

                              rounded-none

                              bg-[#2563eb]

                              px-3
                              py-2

                              text-[11px]
                              font-bold
                              text-white

                              transition

                              hover:bg-[#1d4ed8]
                            ">
                            Shiko të gjitha

                            <ArrowIcon className="
                                h-3
                                w-3
                              "/>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>);
        })}
          </nav>

          

          <div className="
              shrink-0

              border-t
              border-slate-200

              bg-slate-50

              px-4
              py-4

              sm:px-5
            ">
            <div className="
                flex
                items-center
                justify-between
                gap-4
              ">
              <div>
                <p className="
                    text-[11px]
                    font-bold
                    text-slate-700
                  ">
                  Ke nevojë për
                  ndihmë?
                </p>

                <p className="
                    mt-0.5

                    text-[10px]
                    text-slate-500
                  ">
                  Mbështetje 24/7
                </p>
              </div>

              <NavLink to="/support" onClick={closeMenu} className="
                  rounded-none

                  border
                  border-slate-200

                  bg-white

                  px-3
                  py-2

                  text-[11px]
                  font-semibold
                  text-slate-700

                  shadow-sm

                  transition

                  hover:border-blue-300
                  hover:text-blue-700
                ">
                Support
              </NavLink>
            </div>
          </div>
        </aside>
      </div>

      

      <style>
        {`
          /*
            EXACT RULE:

            width > height
            = landscape
            = top-left hamburger

            height >= width
            = portrait
            = top-left hamburger hidden

            The Navbar component shows
            the bottom categories bar
            during portrait.
          */

          .orientation-categories-trigger {
            display: none;
          }

          @media (orientation: landscape) {
            .orientation-categories-trigger {
              display: flex;
            }
          }

          @media (orientation: portrait) {
            .orientation-categories-trigger {
              display: none !important;
            }
          }

          .category-drawer-scroll {
            scrollbar-width: thin;

            scrollbar-color:
              rgba(100, 116, 139, 0.28)
              transparent;
          }

          .category-drawer-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .category-drawer-scroll::-webkit-scrollbar-track {
            background:
              transparent;
          }

          .category-drawer-scroll::-webkit-scrollbar-thumb {
            background:
              rgba(100, 116, 139, 0.26);

            border-radius:
              0;
          }

          .category-drawer-scroll::-webkit-scrollbar-thumb:hover {
            background:
              rgba(71, 85, 105, 0.42);
          }

          @media (max-width: 640px) {
            .category-drawer-scroll::-webkit-scrollbar {
              width: 4px;
            }
          }
        `}
      </style>
    </>);
}