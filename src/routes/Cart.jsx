import React, { useEffect, useState } from "react";
import { useLoaderData} from "react-router-dom";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './css/cart.module.css'
import CartItem from "../components/CartItem/CartItem";
import CartTotal from "../components/CartTotal/CartTotal";
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

const Cart = () =>{
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState(useLoaderData());
    // const {setCartCount} = useContext(CurrentUserContext);
    let total = 0;

    cartItems.forEach((item) =>{
        total = total + item.total;
    });

    useEffect(() =>{
        // setCartCount( (prev) => cartItems.length);
        dispatch(cartActions.updateCart({quantity: cartItems.length}));
    },[cartItems, dispatch])
    
    const removeItem = async (id) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_DOMAIN}/api/cart/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": true,      
                    "Access-Control-Allow-Headers": true, 
                    "Access-Control-Allow-Methods": true 
                },
                credentials: 'include',
                withCredentials: true
              })
            const deletedItem = response.data;
            if(deletedItem.error){
                return toast.error(`${deletedItem.error}`);
            }
            toast.warn(`Item Removed!`);
            const newCartItems = cartItems.filter((item) => item._id !== deletedItem._id);
            setCartItems(newCartItems);
            
        }catch(error){ 
            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true
            });;
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
                    <CartTotal total={total}/>
                </div>
            </div>
        </>
    )
}

export default Cart;

export async function loader(){
    try{
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/cart`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,      
                "Access-Control-Allow-Headers": true, 
                "Access-Control-Allow-Methods": true 
            },
            credentials: 'include',
            withCredentials: true});
        const cartItems = response.data;
        if(response.data.error){
            throw new Error(response.data.error);
        }
        return cartItems;
    }catch(error){
        throw new Error(error);
    }
}
