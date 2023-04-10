import React from "react";
import comingSoon from "../assets/soon.png";
const PageNotFound = () => {
  return (
    <div className="w-full my-6">
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src={comingSoon}
          className="w-[800px] h-[400px] object-contain"
          alt="coming"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
