import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import axios from "axios";

export const CurrentUserContext = createContext(null);
const RootLayout = () =>{
    const [user, setUser] = useState("");
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const isAuth = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/user/logged`, { withCredentials: true });
            const data = response.data;
            if(data.error){
                return setUser("");
            }
            setUser(data);
          }catch(error) {
            toast.error("Something went wrong!");
          };
        };
    
        isAuth();
    }, []);
    return(
        <>
        <CurrentUserContext.Provider value={{user, setUser, cartCount, setCartCount}}>
            <Navbar/>
            <Outlet/>
            <ToastContainer autoClose={2000}/>
            <Footer/>
        </CurrentUserContext.Provider>
        </>
    )
}

export default RootLayout