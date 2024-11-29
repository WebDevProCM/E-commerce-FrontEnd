import axios from "axios";
import { cartActions } from "./cart-slice";
import apiClient from "../utilis/apiClient";

export const getCart = () =>{
    return async (dispatch) =>{
        const sendRequest = async () =>{
            const response = await apiClient.get("/api/cart");
            const cartItems = response.data;
            return cartItems;
        }
        try{
            const data = await sendRequest();
            if(data.error){
                throw new Error(data.error);
            }
            dispatch(cartActions.updateCart({quantity: data.length , items: data}));
        }catch(error){
            if(error?.response?.data){
                throw new Error(error?.response?.data?.error);
            }
            throw new Error(error);
        }
    }
}