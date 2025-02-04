import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
import classes from './css/cart.module.css'
import CartItem from "../components/CartItem/CartItem";
import CartTotal from "../components/CartTotal/CartTotal";
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import apiClient from "../utilis/apiClient";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () =>{
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState(useLoaderData());
    const [checkoutBtnDisable, setCheckoutBtnDisable] = useState(false);
    const navigation = useNavigate();
    let total = 0;
    const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

    cartItems.forEach((item) =>{
        total = total + item.total;
    });

    useEffect(() =>{
        dispatch(cartActions.updateCart({quantity: cartItems.length}));
    },[cartItems, dispatch])
    
    const removeItem = async (id) =>{
        try{
            const response = await apiClient.delete(`/api/cart/${id}`);
            const deletedItem = response.data;
            if(deletedItem.error){
                return toast.error(`${deletedItem.error}`);
            }
            toast.warn(`Item Removed!`);
            const newCartItems = cartItems.filter((item) => item._id !== deletedItem._id);
            setCartItems(newCartItems);
            
        }catch(error){ 
            if(error?.response?.data){
                return toast.error(`${error.response.data.error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true
                });
            }

            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true
            });
        }
    }
    const totalChange = (cartItem) =>{
        const newItems = cartItems.map((item) =>{
            if(item._id === cartItem._id){
                return item = cartItem;
            }else{
                return item
            }
        })
        setCartItems(newItems);
        toast.success("Cart Updated!");
    }

    const clickHandler = async () =>{
        let orderItems = []
        cartItems.map((item) => orderItems.push({prodId: item.product.prodId, quantity: item.quantity}));
        const requestData = {cartItems: orderItems}
        setCheckoutBtnDisable(true);
        // try{
        //     const response = await apiClient.post("/api/order", requestData);
        //     const data = response.data
        //     if(data.error){
        //         return toast.error(data.error);
        //     }

        //     return navigation("/orders");
            
        // }catch(error){            
        //     if(error?.response?.data){
        //         return toast.error(error.response.data.error);
        //     }
        //     throw new Error(error);
        // }

        try{
            const response = await apiClient.post("api/payment/create-checkout-session", requestData);
            const data = response.data
            if(data.error){
                return toast.error(data.error);
            }

            const stripe = await stripePromise;
            setCheckoutBtnDisable(false)
            stripe.redirectToCheckout({ sessionId: data.id });
            
        }catch(error){    
            setCheckoutBtnDisable(false)        
            if(error?.response?.data){
                return toast.error(error.response.data.error);
            }
            throw new Error(error);
        }
    }

    return (
        <>
            <h5 className={classes.title}>My Shopping Cart</h5>
            <div className={classes.cart}>
                <AnimatePresence mode="wait">
                <motion.div layout className={classes.cartAllItems}>
                    {cartItems.length < 1? 
                        <motion.p 
                        style={{display: "block", fontWeight: "bold", fontSize: "35px", textAlign:"center"}}
                        initial={{scaleX: 0}}
                        animate={{scaleX: 1}}
                        >
                            No Items
                        </motion.p> : 
                    cartItems.map((item) =>{
                        return <CartItem key={item.product.prodId + Math.random()} perfume={item} onRemoveItem={removeItem} onTotalChange={totalChange} />
                    })}
                </motion.div>
                </AnimatePresence>
                <div className={classes.cartCheckout}>
                    <CartTotal total={total} clickHandler={clickHandler} btnDisabled={checkoutBtnDisable}/>
                </div>
            </div>
        </>
    )
}

export default Cart;

export async function loader(){
    try{
        const response = await apiClient.get("/api/cart");
        const cartItems = response.data;
        if(cartItems?.error){
            throw new Error(cartItems.error);
        }
        return cartItems;
    }catch(error){
        if(error?.response?.data){
            throw new Error(error.response.data.error);
        }
        throw new Error(error);
    }
}