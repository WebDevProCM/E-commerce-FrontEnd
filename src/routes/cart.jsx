import React, { useContext, useEffect, useState } from "react";
import { useLoaderData} from "react-router-dom";
import { CurrentUserContext } from "./Layout";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/cart.css'
import CartItem from "../components/cartItem/CartItem";
import CartTotal from "../components/cartTotal/CartTotal";

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
            const response = await axios.delete(`http://localhost:3000/api/cart/${id}`, {
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
            console.log(error);
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
            <h5 className="title">My Shopping Cart</h5>
            <div className="cart">
                <div className="cartAllItems">
                    {cartItems.length < 1? "No Items" : cartItems.map((item) =>{
                        return <CartItem key={item.product.prodId + Math.random()} perfume={item} onRemoveItem={removeItem} onTotalChange={totalChange} />
                    })}
                </div>
                <div className="cartCheckout">
                    <CartTotal total={total}/>
                </div>
            </div>
        </>
    )
}

export default Cart;

export async function loader(){
    try{
        const response = await axios.get("http://localhost:3000/api/cart", {withCredentials: true});
        const cartItems = response.data;
        if(response.data.error){
            throw new Error(response.data.error);
        }
        return cartItems;
    }catch(error){
        throw new Error(error);
    }
}
