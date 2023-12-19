import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    // const width = window.innerWidth;
    // if(width>790) setMenuOpen(true);

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 992) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    });
  });

  return (
    <>
      <nav>
        <div className="flex flex-col lg:flex-row text-black">
          <div className="lg:w-fit p-5 text-xl flex justify-between">
            <span>Logo</span>
            <span className="lg:hidden">
              <button className="p-1" onClick={() => setMenuOpen(!isMenuOpen)}>
                <FontAwesomeIcon style={{ fontSize: "25px" }} icon={faBars} />
              </button>
            </span>
          </div>
          <div className="flex-1 lg:flex justify-end lg:pr-5 p-1 rounded bg-transparent text-black mt-3 lg:pl-5">
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: isMenuOpen ? "auto" : 0,
                // padding:isMenuOpen? '15px 0 15px 0':'0 0 0 0'
              }}
              className={`lg:w-fit flex flex-col lg:flex-row lg:justify-center text-white lg:text-gray-600  lg:text-sm lg:p-0 gap-8 shadow bg-orange-500 lg:bg-white
                 rounded-xl overflow-hidden
           `}
            >
              <span className="lg:border-r border-neutral-200 lg:p-5 pl-6 mt-5 lg:mt-0  ">
                Product
              </span>
              <span className="lg:p-5 pl-6 lg:text-gray-600 ">Price Drop</span>
              <span className="lg:p-5 pl-6 lg:text-gray-600 ">Blog</span>
              <span className="lg:p-5 pl-6 lg:text-gray-600 ">About Us</span>
              <span className="lg:p-5 pl-6 lg:text-gray-600 ">Contact</span>
              <span className="lg:p-5 pl-6 mb-5 lg:mb-0 lg:border-l border-neutral-200  ">Sign In</span>
            </motion.div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
