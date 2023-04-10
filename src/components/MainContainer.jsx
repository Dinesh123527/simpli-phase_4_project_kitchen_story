/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/stateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-bold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-fuchsia-300 
          to-purple-600 transition-all ease-in-out duration-100"
          >
            Our fresh & healthy fruits
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-teal-400 hover:bg-teal-700 
            cursor-pointer hover:shadow-lg 
            flex items-center justify-center"
            >
              <MdChevronLeft
                className="text-2xl text-white"
                onClick={() => setScrollValue(-400)}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-teal-400 hover:bg-teal-700 
            cursor-pointer ease-in-out hover:shadow-lg 
            flex items-center justify-center"
            >
              <MdChevronRight
                className="text-2xl text-white"
                onClick={() => setScrollValue(400)}
              />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
