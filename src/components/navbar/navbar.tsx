import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [bgWhite, setBgWhite] = useState(true);

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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      
      if (window.scrollY > 5) setBgWhite(true);
      else setBgWhite(false);
    });
  }, []);

  return (
    <>
      <nav className=" w-full lg:fixed bg-transparent">
        <motion.div
          animate={{ backgroundColor: bgWhite ? "white" : "transparent" }}
          className="transition-all "
        >
          <div className="flex  flex-col lg:flex-row text-black ">
            <div className="lg:w-fit p-5 text-xl flex justify-between">
              <span className="https://checkprix.net/images/logo.png">
                <Link to={"/"}>
                  <img
                    src="https://checkprix.net/images/logo.png"
                    className="h-10 object-cover bg-cover"
                    alt="logo"
                  />
                </Link>
              </span>
              <span className="lg:hidden">
                <button
                  className="p-1"
                  onClick={() => setMenuOpen(!isMenuOpen)}
                >
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
                className={`lg:w-fit flex flex-col lg:flex-row lg:justify-center text-white lg:text-gray-600  lg:text-sm lg:p-0 gap-8 
                ${(!bgWhite)?'lg:shadow':''}
                bg-orange-500 lg:bg-white
                 rounded-xl overflow-hidden
           `}
              >
                <span className="lg:border-r border-neutral-200 lg:p-5 pl-6 mt-5 lg:mt-0  ">
                  <span>Products</span>
                  {/* <div className="absolute  top-20 pl-5 pt-2 border border-gray-300 shadow-md rounded-md w-fit p-3">
              <ul className="flex justify-center items-center w-fit">
                <li>Mobiles</li>
              </ul>
            </div> */}
                </span>
                <span className="lg:p-5 pl-6 lg:text-gray-600 ">
                  <Link to={"/price-drop"}>Price Drop</Link>
                </span>
                <span className="lg:p-5 pl-6 lg:text-gray-600 ">
                  <Link to={"/blogs"}>Blog</Link>
                </span>
                <span className="lg:p-5 pl-6 lg:text-gray-600 ">
                  <Link to={"/aboutus"}>About Us</Link>
                </span>
                <span className="lg:p-5 pl-6 lg:text-gray-600 ">
                  <Link to={"/contact"}>Contact</Link>
                </span>
                <span className="lg:p-5 pl-6 mb-5 lg:mb-0 lg:border-l border-neutral-200">
                  <Link to={"/signin"}>Sing In</Link>
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
