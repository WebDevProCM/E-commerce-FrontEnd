import React, {useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import ShowingLoading from "../components/ShowingLoading/ShowingLoading";
import HeaderNav from "../components/HeaderNav/HeaderNav"
import Footer from "../components/Footer/Footer";
import { verifyUser } from "../store/authActions.js";
import { getCart } from "../store/cart-actions.js";

const RootLayout = () =>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(verifyUser());
    }, [dispatch]);

    useEffect(() =>{
        if(user){
            dispatch(getCart());
        }
    }, [user, dispatch]);

    return(
        <>
            {navigation.state !== "idle" &&<ShowingLoading/>}
            <HeaderNav />
            <Outlet/>
            {/* <ToastContainer autoClose={2000}/> */}
            <Footer/>
        </>
    )
}

export default RootLayout