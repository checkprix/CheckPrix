import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../home/home";
import Contact from "../contact/contact";
import AboutUs from "../aboutus/aboutus";
import Allblogs from "../blog/allblogs/allblogs";
import BlogDescription from "../blog/blogDescription/blogDescription";
import ProductDetail from "../productPage/productPage";
import SignIn from "../signIn/singin";
import PriceDrop from "../priceDrop/priceDrop";
import DashBoard from "../dashboard/dashboard";
import ChangePassword from "../changePassword/changePassword";
import Products from "../allProducts/products";
import Search from "../search/search";
import FAQ from "../faq/faq";
import TermAndConidtion from "../termAndConditions/termAndCondition";
import Policy from "../privacy policy/privacyPolicy"
import AdminDashboard from "../../adminPanel/dashboard/dashboard"
const Routers =():any=>{

    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/blogs" element={<Allblogs/>}/>
            <Route path="/blog-detail/:id" element={<BlogDescription/>}/>
            <Route path="/product-detail/:id" element={<ProductDetail/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="price-drop" element={<PriceDrop/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/products/:param" element = {<Products/>}/>
            <Route path="/search/:param" element = {<Search/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/term-conditions" element={<TermAndConidtion/>}/>
            <Route path="/privacy-policy" element={<Policy/>}/>
            <Route path="/admin-dashboard" element= {<AdminDashboard/>}/>
        </Routes>
        
        </>
    )
}

export default Routers;