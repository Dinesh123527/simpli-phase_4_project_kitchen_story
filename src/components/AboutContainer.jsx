import React from "react";
import fastDelivery from "../assets/fast_delivery.png";
import "./AboutContainer.css";

const AboutContainer = () => {
  return (
    <div className="w-full my-6">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-bold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-16 before:h-1 
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-fuchsia-300 
          to-purple-600 transition-all ease-in-out duration-100 mr-auto"
        >
          more about us
        </p>
        <p
          className="text-3xl font-bold capitalize text-salmon relative
          mr-auto mt-20"
        >
          fast and safe
        </p>
        <p
          className="text-4xl font-bold uppercase text-indigo-700 relative
          mr-auto mt-3"
        >
          food delivery
        </p>
      </div>
      <div className="flex flex-col items-start justify-start">
        <span className="text-lg mt-4 text-textColor" id="text">
          At <p className="text-red-700 font-bold text-2xl">Plate</p> we’re tied
          in with presenting crisp food, regardless of whether it implies going
          the additional mile. When you stroll through our entryways, we do what
          we can to make everybody feel comfortable in light of the fact that
          our family stretches out through your locale.
        </span>
      </div>
      <div className="w-full flex flex-col items-end justify-end">
        <img
          src={fastDelivery}
          className="w-[800px] h-[400px] object-contain 
          lg:-mr-32 lg:mt-[-340px] -mr-4 mt-10"
          alt="delivery"
        />
      </div>
    </div>
  );
};

export default AboutContainer;
