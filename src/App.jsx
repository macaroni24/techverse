import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* placeholder routes */}
      <Route path="/explore" element={<div className="p-6">Explore</div>} />
      <Route path="/hub" element={<div className="p-6">Hub</div>} />
      <Route path="/about" element={<div className="p-6">About</div>} />
      <Route path="/contact" element={<div className="p-6">Contact</div>} />
      <Route path="/bookmarks" element={<div className="p-6">Bookmarks</div>} />
      <Route path="*" element={<div className="p-6">Not Found</div>} />
    </Routes>
  );
}
