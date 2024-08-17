import logo from "./logo1.png";
import { FaMale, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  return (
    <div className="flex flex-row justify-between items-center h-20 max-w-6xl mx-auto">
      <NavLink to="/">
        <div className="ml-6">
          <img src={logo} className="h-14 w-20 rounded-md" alt="Logo" />
        </div>
      </NavLink>
      <div className="flex flex-row items-center gap-x-6 mr-6 text-slate-100 -tracking-tighter font-medium">
       
        <NavLink to="/cart">
          <div className="relative">
            <FaShoppingCart className="text-2xl " />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 rounded-full text-sm w-5 h-5 grid justify-items-center text-white">
                {cart.length}
              </span>
            )}
            
          </div>
        
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
