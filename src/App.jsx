import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Gaming from "./pages/Gaming";
import LaptopsPhones from "./pages/LaptopsPhones";
import Accessories from "./pages/Accessories";
import Monitors from "./pages/Monitors";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import PayingSection from "./pages/PayingSection";


export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {

 window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/paying" element={<PayingSection />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/gaming" element={<Gaming />} />
      <Route path="/laptops-phones" element={<LaptopsPhones />} />
      <Route path="/accessories" element={<Accessories />} />
      <Route path="/monitors" element={<Monitors />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
