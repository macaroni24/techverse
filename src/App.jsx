import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Gaming from "./pages/Gaming";
import LaptopsPhones from "./pages/LaptopsPhones";
import Accessories from "./pages/Accessories";
import Monitors from "./pages/Monitors";
import Login from "./pages/Login";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/monitors" element={<Monitors />} />
      <Route path="/accessories" element={<Accessories />} />
      <Route path="/laptops-phones" element={<LaptopsPhones />} />
      <Route path="/gaming" element={<Gaming />} /> 
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/shop" element={<Shop />} />

    </Routes>
  );
}
