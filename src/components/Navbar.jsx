import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-500">
          Techverse
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium text-gray-300">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/products" className="hover:text-indigo-400 transition">Products</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">About</Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link>
          <Link to="/login" className="hover:text-indigo-400 transition">Login</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none text-gray-300"
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 w-full absolute left-0 top-full shadow-md">
          <div className="flex flex-col items-center py-4 gap-4">
            <Link to="/" className="py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" className="py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/about" className="py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/login" className="py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
