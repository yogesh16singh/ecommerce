/* eslint-disable jsx-a11y/img-redundant-alt */
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item Added Successfully");
  };

  const removeFromCart = () => {
    dispatch(remove(product.id));
    toast.error("Item Removed Successfully");
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white hover:scale-105 transition-all duration-300  ease-in gap-3 p-4 mt-10 ml-5 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_0px_5px_5px_#00000024] ">
       <div className="h-[180px]">
        <img
          alt="Product Image"
          src={product.image}
          className="h-full w-full"
        />
      </div>
      <div>
        <h1 className="text-gray-600 font-semibold text-sm text-left  mt-2 ">
          {product.title}
        </h1>
      </div>
      {/* <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
          {product.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div> */}
      <div className="flex justify-between items-center w-full mt-5">
        <p className="text-black font-semibold">${product.price}</p>
        {cart.some((p) => p.id === product.id) ? (
          <button
            className="border-2 border-red-400 text-red-400 uppercase font-semibold px-3 py-1 rounded-full text-[12px] transition-all duration-300 ease-in hover:text-white hover:bg-red-700"
            onClick={removeFromCart}
          >
            Remove Product
          </button>
        ) : (
          <button
            className="border-2 border-green-700 text-green-700 uppercase font-semibold px-3 py-1 rounded-full text-[12px] transition-all duration-300 ease-in hover:text-white hover:bg-green-700"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
