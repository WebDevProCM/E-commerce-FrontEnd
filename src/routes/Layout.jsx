import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const RootLayout = () =>{

    return(
        <>
           <Navbar/>
            <Outlet/>
           <Footer/>
        </>
    )
}

export default RootLayout