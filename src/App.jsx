import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import Thank from "./pages/Thank";

const App = () => {
  return (
    <div>
      <div className="bg-blue-600">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/thankyou" element={<Thank />} />
      </Routes>
    </div>
  );
};

export default App;
