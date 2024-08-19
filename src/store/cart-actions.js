import axios from "axios";
import { cartActions } from "./cart-slice";

export const getCart = () =>{
    return async (dispatch) =>{
        const sendRequest = async () =>{
            const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/cart`, {
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Credentials": true,
                    // "Access-Control-Allow-Origin": true,      
                    // "Access-Control-Allow-Headers": true, 
                    // "Access-Control-Allow-Methods": true 
                },
                credentials: 'include',
                withCredentials: true});
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
            throw new Error(error);
        }
    }
}