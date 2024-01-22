import React from "react";
import Navbar from "../navbar/navbar";
import CreateBlog from "../createBlog/createBlog";
import ProductList from "../productList/productList";
const AdminDashboard = () => {
  return (
    <>
      <div className="w-full h-screen overflow-y-scroll">
        <div className="w-full">
         <ProductList/>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
