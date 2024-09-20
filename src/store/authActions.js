import axios from "axios";
import { authActions } from "./auth-slice";
import { toast } from "react-toastify";
import { cartActions } from "./cart-slice";

export const verifyUser = () =>{
    return async (dispatch) =>{
        const sendingRequest = async () =>{
            const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/user/logged`, {
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Credentials": true,
                // "Access-Control-Allow-Origin": true,      
                // "Access-Control-Allow-Headers": true, 
                // "Access-Control-Allow-Methods": true 
            }, 
            credentials: 'include',
            withCredentials: true });
            const data = response.data;
            if(data.error){
            throw new Error("Verifying user failed!");
            }

            return data
        }

        try {
            const data = await sendingRequest();
            if(!data){
                return dispatch(authActions.logout());
            } 
            dispatch(authActions.login({data}));
        }catch(error) {
            dispatch(authActions.logout());
            return toast.error("Something went wrong!");
        };
    }
}

export const loginUser = (data) =>{
    return async (dispatch) =>{
        let url = `${process.env.REACT_APP_DOMAIN}/user/login`;

        const sendingRequest = async () =>{
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Credentials": true,
                    // "Access-Control-Allow-Origin": true,      
                    // "Access-Control-Allow-Headers": true, 
                    // "Access-Control-Allow-Methods": true 
                },
                credentials: 'include',
                withCredentials: true
            })
            const responseData = response.data;

            return responseData
        }

        try{
            const responseData = await sendingRequest();
            if(responseData.error || !responseData){
                if(responseData.error){
                    throw Error(responseData.error)
                }
                throw Error("User login failed!")
            }
        
            dispatch(authActions.login({data: responseData}));
            toast.success("Logged in");
            
        }catch(error){
            return toast.error(error.message);
        }

    }
}

export const logoutUser = () =>{
    return async (dispatch) =>{
        const sendingRequest = async () =>{
            const url = `${process.env.REACT_APP_DOMAIN}/user/logout`;
            const value = {name: "cookie"};
            const response = await axios.post(url,value, {
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Credentials": true,
                    // "Access-Control-Allow-Origin": true,      
                    // "Access-Control-Allow-Headers": true, 
                    // "Access-Control-Allow-Methods": true 
                },
                credentials: 'include',
                withCredentials: true
            });

            const data = response.data;
            if(data.error){
                throw new Error("user logging out failed!");
            }
        }
        try{
            await sendingRequest();
            // setUser(undefined);
            dispatch(authActions.logout());
            dispatch(cartActions.updateCart({quantity: 0, item: []}));
            toast.success("Logged out successfully");
        }catch(error){
            toast.error("something went wrong!");
        }
    }
}