import React, { useContext, useEffect, useState } from "react";
import { useLoaderData} from "react-router-dom";
import { CurrentUserContext } from "./Layout";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './css/cart.module.css'
import CartItem from "../components/CartItem/CartItem";
import CartTotal from "../components/CartTotal/CartTotal";

const Cart = () =>{
    const [cartItems, setCartItems] = useState(useLoaderData());
    const {setCartCount} = useContext(CurrentUserContext);
    let total = 0;

    cartItems.forEach((item) =>{
        total = total + item.total;
    });

    useEffect(() =>{
        setCartCount(cartItems.length);
    },[cartItems])
    
    const removeItem = async (id) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_DOMAIN}/api/cart/${id}`, {
                headers: {
                  'Content-Type': 'application/json'
                },
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
                <div className={classes.cartAllItems}>
                    {cartItems.length < 1? "No Items" : cartItems.map((item) =>{
                        return <CartItem key={item.product.prodId + Math.random()} perfume={item} onRemoveItem={removeItem} onTotalChange={totalChange} />
                    })}
                </div>
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
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/cart`, {withCredentials: true});
        const cartItems = response.data;
        if(response.data.error){
            throw new Error(response.data.error);
        }
        return cartItems;
    }catch(error){
        throw new Error(error);
    }
}
