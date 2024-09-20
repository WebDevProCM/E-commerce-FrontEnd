import React, { useState } from "react";
import { toast } from "react-toastify";
import classes from './CartItem.module.css'
import axios from "axios";
import {motion} from "framer-motion"


const CartItem = (props) =>{
    const [quantity, setQuantity] = useState(props.perfume.quantity);
    const [showError, setShowError] = useState(undefined);
    
    const changeHandler = async (event) =>{
        const data = {
            quantity: event.target.value
        }
        if(event.target.value === ''){
            return setQuantity((prev) => 0)
        }
        try{
            const response = await axios.patch(`${process.env.REACT_APP_DOMAIN}/api/cart/${props.perfume._id}`, data, {
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

            const updateItem = response.data;
            if(updateItem.error){
                setShowError(updateItem.error);
                return setQuantity( (prev) => event.target.value);
            }
            props.onTotalChange(updateItem);
            setQuantity( (prev) => updateItem.quantity);
            setShowError(undefined);
        }catch(error){
            toast.error("Something went wrong!");
        }
    }
    
    return(
        <motion.div className={classes.cartItem}
        initial={{x: -100, opacity: 0}}
        animate={{x:0 , opacity: 1}}
        exit={{x: -100, opacity: 0}}
        >

           <div className={classes.itemDetails}>
                <img className={classes.cartImage} src={props.perfume.product.image.startsWith("https")?`${props.perfume.product.image}` : `/images/${props.perfume.product.image}.jpg`} alt="cart-item" />
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
                <input type="number" name="quantity" id="change-quantity" value={quantity} min="0" onChange={changeHandler} />
                <p className={classes.error}>{showError? showError : ''}</p>
            </div>
            <p className={classes.priceTag}>${parseFloat(props.perfume.total).toFixed(2)}</p>
            
           </div>
        </motion.div>
    )
}

export default CartItem
// {require(`../assets/${props.perfume.product.name}.jpg`)}