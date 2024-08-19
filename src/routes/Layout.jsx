import React, {useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShowingLoading from "../components/ShowingLoading/ShowingLoading";
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer";
import { verifyUser } from "../store/authActions.js";
import { getCart } from "../store/cart-actions.js";

const RootLayout = () =>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    // const [user, setUser] = useState("");
    // const [cartCount, setCartCount] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        // const isAuth = async () => {
        //   try {
        //     const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/user/logged`, {
        //       headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Origin": true,      
        //         "Access-Control-Allow-Headers": true, 
        //         "Access-Control-Allow-Methods": true 
        //     }, 
        //     credentials: 'include',
        //     withCredentials: true });
        //     const data = response.data;
        //     if(data.error || !data){
        //       return dispatch(authActions.logout());
        //         // return setUser("");
        //     }
        //     dispatch(authActions.login(data));
        //     // setUser(data);
        //   }catch(error) {
        //     toast.error("Something went wrong!");
        //   };
        // };
        // isAuth();
        dispatch(verifyUser());
    }, [dispatch]);

    useEffect(() =>{
        if(user){
            dispatch(getCart());
        }
    }, [user, dispatch]);

    return(
        <>
        {/* <CurrentUserContext.Provider value={{cartCount, setCartCount}}> */}
            {navigation.state === "loading" &&<ShowingLoading/>}
            <Navbar/>
            <Outlet/>
            <ToastContainer autoClose={2000}/>
            <Footer/>
        {/* </CurrentUserContext.Provider> */}
        </>
    )
}

export default RootLayout