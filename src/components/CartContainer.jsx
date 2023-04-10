/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../assets/emptyCart.svg";
import CartItem from "./CartItem";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const firebaseAuth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const [flag, setFlag] = useState(1);

  const [tot, setTot] = useState(0);

  const navigate = useNavigate();

  const checkout = () => {
    navigate("/notFound");
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const loginToCheckout = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen
    bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div
        className="w-full flex items-center justify-between
      p-4 cursor-pointer"
      >
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-bold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md 
          hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div
            className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 
        overflow-y-scroll scrollbar-none"
          >
            {/* cart Item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div
            className="w-full flex-1 bg-cartTotal rounded-t-[2rem] 
         flex flex-col items-center justify-evenly px-8 py-2"
          >
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg font-semibold">Sub Total</p>
              <p className="text-gray-400 text-lg font-bold">{tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg font-semibold">Delivery</p>
              <p className="text-gray-400 text-lg font-bold">Rs. 20</p>
            </div>

            <div className="w-full border-b-4 border-emerald-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-bold"> Rs. {tot + 20}</p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-purple-500 
            to-red-700 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={checkout}
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-purple-500 
            to-red-700 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={loginToCheckout}
              >
                Login to Checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
