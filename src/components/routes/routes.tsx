import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../home/home";
import Contact from "../contact/contact";
import AboutUs from "../aboutus/aboutus";
import Allblogs from "../blog/allblogs/allblogs";

const Routers =():any=>{

    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/blogs" element={<Allblogs/>}/>
        </Routes>
        
        </>
    )
}

export default Routers;