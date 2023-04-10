/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Avatar from "../assets/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.removeItem("user");

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header
      className="fixed z-50 w-screen p-3 px-4 bg-red-500 
    md:p-6 md:px-16 md:bg-green-500"
    >
      {/* Desktop and Tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-2xl font-bold ">Plate</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 ml-auto"
          >
            <li
              className="text-base text-textColor hover:text-headingColor 
            duration-100 transition-all ease-in-out cursor-pointer"
            >
              <Link to={"/"}>Home</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor 
            duration-100 transition-all ease-in-out cursor-pointer"
            >
              <Link to={"/menu"}>Menu</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor 
            duration-100 transition-all ease-in-out cursor-pointer"
            >
              <Link to={"/aboutUs"}>About Us</Link>
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-3xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg 
                flex items-center justify-center"
              >
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer 
              rounded-full"
              alt="userProfile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-100 shadow-xl rounded-lg flex flex-col 
                absolute top-12  right-0"
              >
                {user && user.email === "raju.ganapathi123@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer
                   hover:bg-slate-300 transition-all duration-100 ease-in-out
                   text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer
               hover:bg-slate-300 transition-all duration-100 ease-in-out
                text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-3xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg 
                flex items-center justify-center"
            >
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-2xl font-bold ">Plate</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer 
            rounded-full"
            alt="userProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-100 shadow-xl rounded-lg flex flex-col 
                absolute top-12  right-0"
            >
              {user && user.email === "raju.ganapathi123@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer
                hover:bg-slate-300 transition-all duration-100 ease-in-out
                text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <motion.ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-col"
              >
                <li
                  className="text-base text-textColor hover:bg-slate-300 
                duration-100 transition-all ease-in-out 
                cursor-pointer px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <Link to={"/"}>Home</Link>
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-300 
                duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <Link to={"/menu"}>Menu</Link>
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-300 
                duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <Link to={"/aboutUs"}>About Us</Link>
                </li>
              </motion.ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center
                 bg-red-400 gap-3 cursor-pointer
               hover:bg-teal-300 transition-all duration-100 ease-in-out
                text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
