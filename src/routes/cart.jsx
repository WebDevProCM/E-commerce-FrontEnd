import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/cart.css'
import CartItem from "../components/cartItem/CartItem";
import CartTotal from "../components/cartTotal/CartTotal";

const Cart = (props) =>{
    const [cartItems, setCartItems] = useState(useLoaderData());
    let total = 0; 
    cartItems.forEach((item) =>{
        total = total + item.total;
    });

    const removeItem = async (id) =>{
        try{
            const response = await fetch(`http://localhost:3000/api/cart/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const deletedItem = await response.json();
            if(deletedItem.error){
                return  toast.error(`${deletedItem.error}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true
                        });;
            }
            toast.success(`Item Removed!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "dark",
            });
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
    }

    return (
        <>
            <ToastContainer/>
            <h5 className="title">My Shopping Cart</h5>
            <div className="cart">
                <div className="cartAllItems">
                    {cartItems.map((item) =>{
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
    const response = await fetch("http://localhost:3000/api/cart");
    const cartItems = await response.json();
    return cartItems;
}
