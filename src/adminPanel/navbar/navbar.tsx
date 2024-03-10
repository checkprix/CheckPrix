import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import Logo from "../../assests/logo/logo.png";
import Cookies from "js-cookie";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-black p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8 w-auto mr-4" />
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex gap-3">
            <Link
              to="/product-list"
              className="text-black font-semibold mr-4"
            >
              Home
            </Link>
            <Link to="/product-list" className="text-gray font-semibold mr-4">
              Products
            </Link>
            <Link to="/store" className="text-gray font-semibold mr-4">
              Store
            </Link>
            <Link to="/blog-list" className="text-gray font-semibold mr-4">
              Blog
            </Link>
            <Link
              to="#"
              onClick={() => LogOutAdmin()}
              className="text-gray font-semibold mr-4"
            >
              Sign Out
            </Link>
          </div>
          <button className="text-black md:hidden" onClick={toggleMenu}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Collapsible Menu */}
      {isOpen && (
        <div className="md:hidden">
          <Link to="/product-list" className="block text-black p-2">
            Products
          </Link>
          <Link to="/store" className="block text-black p-2">
            Store
          </Link>
          <Link to="/blog-list" className="block text-black p-2">
            Blog
          </Link>
          <Link to="/logout" className="block text-black p-2">
            Sign Out
          </Link>
          <Link to="/product-list" className="block text-black p-2">
            Home
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const LogOutAdmin = () => {
  localStorage.removeItem("check_prix_admin");
  Cookies.remove("authHeaderCheckprixadmin", { path: "/" });
  window.location.href = "/admin-login";
};
