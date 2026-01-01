import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A3D38] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-4">Rreth Nesh</h3>
          <p className="text-sm text-gray-300">
            Ne ofrojmë teknologji të fundit dhe aksesorë me çmime të përballueshme, me dërgesa të shpejta dhe garanci të plotë.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-bold mb-4">Shërbimi i Klientit</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/kontakt" className="hover:text-orange-500 transition">Kontaktoni Ne</Link></li>
            <li><Link to="/faq" className="hover:text-orange-500 transition">FAQ</Link></li>
            <li><Link to="/dorezimi" className="hover:text-orange-500 transition">Politika e Dërgesës</Link></li>
            <li><Link to="/kthim" className="hover:text-orange-500 transition">Kthimi dhe Refundimi</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Lidhje të Shpejta</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/categories" className="hover:text-orange-500 transition">Kategoritë</Link></li>
            <li><Link to="/outlet" className="hover:text-orange-500 transition">Outlet</Link></li>
            <li><Link to="/cfare-ka-te-re" className="hover:text-orange-500 transition">Çfarë ka të re?</Link></li>
            <li><Link to="/blog" className="hover:text-orange-500 transition">Blog</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Regjistrohu për Newsletter</h3>
          <p className="text-sm text-gray-300 mb-3">Merr ofertat më të fundit dhe produktet ekskluzive në email-in tënd.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 outline-none"
            />
            <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition mt-2 sm:mt-0">
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-orange-500 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} YourStore. Të gjitha të drejtat e rezervuara.
      </div>
    </footer>
  );
}
