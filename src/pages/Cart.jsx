import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
import { clear } from "../redux/Slices/cartSlice";
import logo from "../components/profile-transparent-blue.svg";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [amount, setAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      const totalAmount = cart.reduce((acc, curr) => {
        const price = parseFloat(curr.price) || 0;
        const quantity = parseInt(curr.quantity, 10) || 1;
        return acc + price * quantity;
      }, 0);

      const finalAmount = Math.max(totalAmount - discount, 0);
      setAmount(finalAmount);
    } else {
      setAmount(0);
    }
  }, [cart, discount]);

  const applyCoupon = () => {
    const totalAmount = cart.reduce((acc, curr) => {
      const price = parseFloat(curr.price) || 0;
      const quantity = parseInt(curr.quantity, 10) || 1;
      return acc + price * quantity;
    }, 0);

    if (couponCode.trim().toUpperCase() === "SAVE10") {
      if (couponCode === "SAVE10") {
        const discountAmount = totalAmount * 0.1;
        setDiscount(discountAmount);
        setAppliedCoupon("SAVE10");
        toast.success(
          `Coupon applied successfully! 10% off ($${discountAmount.toFixed(2)})`
        );
      } else {
        setDiscount(0);
        setAppliedCoupon(null);
        toast.error("Invalid coupon code");
      }
    } else {
      setDiscount(0);
      setAppliedCoupon(null);
      toast.error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  const handlePayment = async () => {
    toast.success("Please wait, processing payment...", {
      duration: 2000,
    });

    setTimeout(() => {
      const options = {
        key: "rzp_test_UjGPIwbgTuLTWn",
        amount: parseInt(amount * 100), // amount,
        currency: "USD",
        name: "Profile",
        description: "Thank you for shopping with us!",
        image: logo,
        handler: function (response) {
          toast.success("Payment successful!", { duration: 2000 });
          dispatch(clear());
          navigate("/thankyou");
        },
        prefill: {
          name: "Yogesh Singh",
          email: "email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again.");
      });
    }, 2000);
  };

  return (
    <div className="mb-10 px-4 sm:px-6 lg:px-8">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row lg:justify-center max-w-7xl mx-auto gap-x-5">
          <div className="lg:w-[60%] flex flex-col p-2">
            {cart.map((cartItem, index) => (
              <CartItem item={cartItem} key={cartItem.id} itemIndex={index} />
            ))}
          </div>

          <div className="lg:w-[40%] mt-5 flex flex-col">
          
            <div className="flex flex-col gap-5 mt-10">
              <div className="text-xl font-bold">
              <span className="text-gray-700 font-semibold text-xl">
                    Total Items: {cart.length}
                  </span><br></br>
                <span className="text-gray-700 font-semibold">
                  Total Amount:
                </span>{" "}
                ${amount > 0 ? amount.toFixed(2) : "0.00"}
              </div>

              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md text-lg text-gray-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">Coupon Code:</span>
                  <span
                    className={`font-bold ${
                      appliedCoupon ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {appliedCoupon || "Not Applied"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Discount:</span>
                  <span className="font-bold text-blue-600">
                    ${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">
                    Amount Payable:
                  </span>
                  <span className="font-bold text-blue-600">
                    ${amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md text-lg text-gray-800 flex items-center justify-between">
                <span className="font-bold text-blue-600">Coupon Code:</span>
                <span className="font-bold text-red-600 bg-yellow-300 px-3 py-1 rounded-lg shadow-md animate-pulse mx-2">
                  SAVE10
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-md mb-3 sm:mb-0"
                />
                {!appliedCoupon ? (
                  <button
                    onClick={applyCoupon}
                    className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-2 border-2 text-white transition duration-300 ease-linear border-blue-600 font-bold"
                  >
                    Apply Coupon
                  </button>
                ) : (
                  <button
                    onClick={removeCoupon}
                    className="bg-red-600 hover:bg-red-800 rounded py-2 px-2 border-2 text-white transition duration-300 ease-linear border-red-700 font-bold"
                  >
                    Remove Coupon
                  </button>
                )}
              </div>

              <button
                onClick={handlePayment}
                className="bg-blue-700 hover:bg-blue-900 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-blue-600 font-bold p-3 text-xl"
              >
                CheckOut Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">
            Your cart is empty!
          </h1>
          <NavLink to="/">
            <button className="uppercase bg-blue-600 p-3 px-10 rounded-lg text-white mt-6 font-semibold tracking-wider hover:bg-blue-700 duration-300 transition-all ease-in">
              Shop Now
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
