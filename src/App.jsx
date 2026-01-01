import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Gaming from "./pages/Gaming";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gaming" element={<Gaming />} /> 
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/explore" element={<div className="p-6">Explore</div>} />
      <Route path="/hub" element={<div className="p-6">Hub</div>} />
      <Route path="/about" element={<div className="p-6">About</div>} />
      <Route path="/contact" element={<div className="p-6">Contact</div>} />
      <Route path="/bookmarks" element={<div className="p-6">Bookmarks</div>} />
      <Route path="*" element={<div className="p-6">Not Found</div>} />
    </Routes>
  );
}
