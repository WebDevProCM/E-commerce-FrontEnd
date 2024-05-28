import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ShowingLoading from "../components/ShowingLoading/ShowingLoading";
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer";
import axios from "axios";

export const CurrentUserContext = createContext(null);
const RootLayout = () =>{
    const [user, setUser] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const navigation = useNavigation();
    useEffect(() => {
        const isAuth = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/user/logged`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,      
                "Access-Control-Allow-Headers": true, 
                "Access-Control-Allow-Methods": true 
            }, 
            credentials: 'include',
            withCredentials: true });
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
            {navigation.state === "loading" &&<ShowingLoading/>}
            <Navbar/>
            <Outlet/>
            <ToastContainer autoClose={2000}/>
            <Footer/>
        </CurrentUserContext.Provider>
        </>
    )
}

export default RootLayout