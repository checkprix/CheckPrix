import React from "react"
import Navbar from "../navbar/navbar";
import CreateBlog from "../createBlog/createBlog";
import ProductUploadForm from "../createProduct/ProductUploadForm";
const AdminDashboard = () =>{
    return (<>
    <div className="w-full h-screen overflow-y-scroll">
        <div>
        <Navbar/>
        </div>
        <div className="w-full">
            {/* <CreateBlog/> */}
            <ProductUploadForm/>
        </div>
    </div>
    </>)
}


export default AdminDashboard;