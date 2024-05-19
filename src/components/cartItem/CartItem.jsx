import React, { useState } from "react";
import classes from './CartItem.module.css'
import perfume from '../assets/item1.jpg'


const CartItem = (props) =>{
    const [quantity, setQuantity] = useState(props.perfume.quantity);
    const [showError, setShowError] = useState(undefined);
    const [total, setTotal] = useState(props.perfume.total);
    
    const changeHandler = async (event) =>{
        const data = {
            quantity: event.target.value
        }

        const response = await fetch(`http://localhost:3000/api/cart/${props.perfume._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const updateItem = await response.json();
        if(updateItem.error){
            setShowError(updateItem.error);
            return setQuantity(event.target.value);
        }
        props.onTotalChange(updateItem);
        setQuantity(updateItem.quantity);
        setShowError(undefined);
        setTotal(updateItem.total);
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
                <input type="number" name="quantity" id="change-quantity" value={quantity} onChange={changeHandler} />
                <p className={classes.error}>{showError? showError : ''}</p>
            </div>
            <p className={classes.priceTag}>${Math.round(total * 10) / 10}</p>
           </div>
        </div>
    )
}

export default CartItem