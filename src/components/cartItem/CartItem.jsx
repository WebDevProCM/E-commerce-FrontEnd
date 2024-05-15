import React from "react";
import './CartItem.css'
import perfume from '../assets/item1.jpg'

const CartItem = () =>{
    return(
        <div className="cartItem">
            <div className="row row-cols-6 cartItem-body">
                <img className="cart-image" src={perfume} alt="cart-item" />
                <p>Mens perfume</p>
                <p>5</p>
                <p>Rs.1000</p>
                <p>Rs.5000</p>
                <button type="button" className="btn btn-outline-danger">Remove</button>

            </div>
        </div>
    )
}

export default CartItem