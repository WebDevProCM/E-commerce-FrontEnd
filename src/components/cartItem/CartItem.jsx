import React, { useState } from "react";
import { toast } from "react-toastify";
import classes from './CartItem.module.css'
import perfume from '../assets/item1.jpg'
import axios from "axios";


const CartItem = (props) =>{
    const [quantity, setQuantity] = useState(props.perfume.quantity);
    const [showError, setShowError] = useState(undefined);
    
    const changeHandler = async (event) =>{
        const data = {
            quantity: event.target.value
        }
        try{
            const response = await axios.patch(`http://localhost:3000/api/cart/${props.perfume._id}`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            const updateItem = response.data;
            if(updateItem.error){
                setShowError(updateItem.error);
                return setQuantity(event.target.value);
            }
            props.onTotalChange(updateItem);
            setQuantity(updateItem.quantity);
            setShowError(undefined);
        }catch(error){
            toast.error("Something went wrong!");
            console.log(error);
        }
    }
    
    return(
        <div className={classes.cartItem}>

           <div className={classes.itemDetails}>
                <img className={classes.cartImage} src={perfume} alt="cart-item" />
                <div className={classes.details}>
                    <h3>{props.perfume.product.name}</h3>
                    <p>Category: {props.perfume.product.category}</p>
                    <p>Type: {props.perfume.product.type}</p>
                    <button onClick={() => {props.onRemoveItem(props.perfume._id)}}>Remove</button>
                </div>
           </div>

           <div className={classes.itemPrice}>
            <div>
                <label htmlFor="change-quantity">Quantity</label>
                <input type="number" name="quantity" id="change-quantity" value={quantity} min="1" onChange={changeHandler} />
                <p className={classes.error}>{showError? showError : ''}</p>
            </div>
            <p className={classes.priceTag}>${Math.round(props.perfume.total * 10) / 10}</p>
           </div>
        </div>
    )
}

export default CartItem