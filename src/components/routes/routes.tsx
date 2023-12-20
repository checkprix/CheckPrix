import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../home/home";
import Contact from "../contact/contact";
import AboutUs from "../aboutus/aboutus";
import Allblogs from "../blog/allblogs/allblogs";
import BlogDescription from "../blog/blogDescription/blogDescription";
import ProductPage from "../productPage/productPage";

const Routers =():any=>{

    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/blogs" element={<Allblogs/>}/>
            <Route path="/blog-detail/:id" element={<BlogDescription/>}/>
            <Route path="/product-detail/:id" element={<ProductPage/>}/>
        </Routes>
        
        </>
    )
}

export default Routers;