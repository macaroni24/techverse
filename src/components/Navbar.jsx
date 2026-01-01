import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0A3D38] text-white fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          Tech<span className="text-orange-500">verse</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium text-white/80">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/products" className="hover:text-white transition">Products</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>

          <Link
            to="/login"
            className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A3D38] border-t border-white/20">
          <div className="flex flex-col items-center py-6 gap-4 text-white/90">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-white">
              Home
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-white">
              Products
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-white">
              About
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-white">
              Contact
            </Link>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-orange-500 px-6 py-2 hover:bg-orange-600 transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

