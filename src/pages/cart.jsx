import React, { useState } from "react";
import './css/cart.css'
import CartItem from "../components/cartItem/CartItem";
import CartTotal from "../components/cartTotal/CartTotal";

const Cart = (props) =>{
    const [items, setItems] = useState([]);
    return (
        <div className="cart">
            <h5 className="title">Cart</h5>
            <div className="row row-cols-6">
                <h5 className="col">Product</h5>
                <h5 className="col">Name</h5>
                <h5 className="col">Quantity</h5>
                <h5 className="col">Price</h5>
                <h5 className="col">Total</h5>
                <h5 className="col">Actions</h5>
            </div>
            <CartItem/>
            <CartTotal/>
        </div>
    )
}

export default Cart