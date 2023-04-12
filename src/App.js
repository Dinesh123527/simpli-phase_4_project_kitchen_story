/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import {
  Header,
  MainContainer,
  CreateContainer,
  AboutContainer,
  MenuContainer,
  PageNotFound,
} from "./components";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { useStateValue } from "./context/stateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="createItem" element={<CreateContainer />} />
            <Route path="aboutUs" element={<AboutContainer />} />
            <Route path="menu" element={<MenuContainer />} />
            <Route path="notFound" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
