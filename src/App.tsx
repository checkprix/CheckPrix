import React from "react";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Routers from "./components/routes/routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
       <BrowserRouter>
    <div className="h-screen w-full">
   
    <Routers/>
   
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
