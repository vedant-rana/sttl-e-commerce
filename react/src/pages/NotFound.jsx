import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
        Page is Not available
      </h2>
      <h2 className="title font-manrope font-bold text-2xl leading-10 mb-8 text-center text-black">
        go to home{" "}
        <Link to="/" className="text-purple-600">
          Click Here
        </Link>
      </h2>
    </div>
  );
};

export default NotFound;
