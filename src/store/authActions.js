import axios from "axios";
import { authActions } from "./auth-slice";
import { toast } from "react-toastify";
import { cartActions } from "./cart-slice";
import apiClient from "../utilis/apiClient";

export const verifyUser = () =>{
    return async (dispatch) =>{
        const sendingRequest = async () =>{
            const response = await apiClient.get("/user/logged");
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
            if(error?.response?.data){
                return toast.error(error?.response?.data?.error);
            }
            return toast.error("Something went wrong!");
        };
    }
}

export const loginUser = (data) =>{
    return async (dispatch) =>{
        let url = "/user/login";

        const sendingRequest = async () =>{
            const response = await apiClient.post(url, data);
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
            if(error?.response?.data){
                return toast.error(error?.response?.data?.error);
            }
            return toast.error(error.message);
        }

    }
}

export const logoutUser = () =>{
    return async (dispatch) =>{
        const sendingRequest = async () =>{
            const url = "/user/logout";
            const value = {name: "cookie"};
            const response = await apiClient.post(url,value);

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
            if(error?.response?.data){
                return toast.error(error?.response?.data?.error);
            }
            toast.error("something went wrong!");
        }
    }
}