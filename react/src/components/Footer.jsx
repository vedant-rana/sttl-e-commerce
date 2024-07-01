import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-black">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <Link
              to="/"
              className="text-base leading-6 text-gray-400 hover:text-gray-200"
            >
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/products"
              className="text-base leading-6 text-gray-400 hover:text-gray-200"
            >
              Products
            </Link>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-400 hover:text-gray-200"
            >
              {" "}
              Pricing
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-400 hover:text-gray-200"
            >
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/contact"
              className="text-base leading-6 text-gray-400 hover:text-gray-200"
            >
              Contact
            </Link>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-400 hover:text-gray-200"
            >
              Terms
            </a>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <span className="sr-only">Facebook</span>
            <FacebookIcon />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <span className="sr-only">Instagram</span>
            <InstagramIcon />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <span className="sr-only">Twitter</span>
            <XIcon />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            <span className="sr-only">GitHub</span>
            <YouTubeIcon />
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2024 WPVANTAGE, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
