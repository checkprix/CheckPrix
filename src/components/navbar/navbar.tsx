import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [bgWhite, setBgWhite] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSignOptionOpen, setIsSignOptionOpen] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 1024 && isMenuOpen === true) {
      setMenuOpen(false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1024) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    });
  }, []);

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
          className="transition-all"
        >
          <div
            className={`flex  flex-col lg:flex-row text-black transition-all
          ${bgWhite ? "lg:shadow" : ""}
          `}
          >
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
                  className=" border border-gray-400 p-2 w-12 rounded-md"
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
                ${!bgWhite ? "lg:shadow" : ""}
                bg-orange-500 lg:bg-white
                 rounded-xl overflow-hidden
           `}
              >
                <span
                  className="lg:border-r border-neutral-200 lg:p-5 pl-6 mt-5 lg:mt-0 pr-6"
                  onMouseLeave={() => setIsSubMenuOpen(false)}
                >
                  <span
                    className="space-x-2"
                    onMouseOver={() => setIsSubMenuOpen(true)}
                  >
                    <span>Products</span>
                    <span>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                  </span>
                  <motion.div
                    animate={{ display: !isSubMenuOpen ? "none" : "block" }}
                    className="lg:absolute top-16 static"
                  >
                    <Products setIsSubMenuOpen={setIsSubMenuOpen} />
                  </motion.div>
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

                <span
                  // onMouseOver={() => setIsSignOptionOpen(true)}
                  // onMouseLeave={() => setIsSignOptionOpen(false)}
                  className="lg:p-5 pl-6 mb-5 lg:mb-0 lg:border-l border-neutral-200 space-x-2"
                >
                  <span>
                    <Link to={"/signin"}>Sing In</Link>
                  </span>
                  <span 
                  onClick={()=>{setIsSignOptionOpen(!isSignOptionOpen)}}
                  >
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                  <motion.div
                    animate={{ display: !isSignOptionOpen ? "none" : "block" }}
                    className="lg:absolute top-16 lef static"
                  >
                    <LoggedInOption setIsSignOptionOpen={setIsSignOptionOpen} />
                  </motion.div>
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

const Products = (Props: Record<string, any>): any => {
  return (
    <>
      {/* onMouseLeave={()=> Props?.setIsSubMenuOpen(false)} */}
      <div className="w-full h-fit flex flex-col">
        <ul className="mt-3 border lg:bg-white flex flex-col  border-gray-200 rounded-md">
          <li className="p-3">
            <span className="lg:border-r lg:border-l lg:border-gray-300 p-2 text-white lg:text-gray-500 ">
              Mobile Phone
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

const LoggedInOption = (Props: Record<string, any>): any => {
  return (
    <>
      {/* add here conditon so only open when user LoggedIn */}
      <div
        onMouseLeave={() => Props?.setIsSignOptionOpen(false)}
        className="w-full h-fit lg:relative lg:right-32 pr-6"
      >
        <ul className="mt-3 border  lg:bg-white p-2 space-y-2 rounded-md">
          <li className="p-3 w-44 lg:text-center lg:border-l lg:border-r lg:border-gray-300 ">
            <span className="w-full  text-white lg:text-gray-500 break-words">
              <Link to={"/dashboard"}>Favorite</Link>
            </span>
          </li>

          <li className="p-3 w-44 lg:text-center lg:border-l lg:border-gray-300 lg:border-r">
            <span className="w-full  text-white lg:text-gray-500 break-words">
              <Link to={"/change-password"}>Change Password</Link>
            </span>
          </li>

          <li className="p-3 w-44 lg:text-center lg:border-l lg:border-gray-300 lg:border-r">
            <span className="w-full  text-white lg:text-gray-500 break-words">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
