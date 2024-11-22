import React, { useState } from "react";
import { toast } from "react-toastify";
import classes from './CartItem.module.css'
import {motion} from "framer-motion"
import apiClient from "../../utilis/apiClient";


const CartItem = (props) =>{
    const [quantity, setQuantity] = useState(props.perfume.quantity);
    const [showError, setShowError] = useState(undefined);
    
    const changeHandler = async (event) =>{
        const data = {
            quantity: event.target.value
        }
        if(event.target.value === ''){
            return setQuantity(() => 0)
        }
        try{
            const response = await apiClient.patch(`/api/cart/${props.perfume._id}`, data);

            const updateItem = response.data;
            if(updateItem?.error){
                setShowError(updateItem.error);
                return setQuantity(() => event.target.value);
            }
            props.onTotalChange(updateItem);
            setQuantity( () => updateItem.quantity);
        }catch(error){
            toast.error("Something went wrong!");
        }
    }
    
    const product = props.perfume.product;
    return(
        <motion.div className={classes.cartItem}
        initial={{x: -100, opacity: 0}}
        animate={{x:0 , opacity: 1}}
        exit={{x: -100, opacity: 0}}
        >

           <div className={classes.itemDetails}>
                <img className={classes.cartImage} src={product.image.startsWith("https")?`${product.image}` : `/images/${product.image}.jpg`} alt="cart-item" />
                <div className={classes.details}>
                    <h3>{product.name}</h3>
                    <p>Category: {product.category}</p>
                    <p>Type: {product.type}</p>
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