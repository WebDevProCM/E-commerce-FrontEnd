import React, { useState } from "react";
import { toast } from "react-toastify";
import classes from './CartItem.module.css'
import {motion} from "framer-motion"
import apiClient from "../../../utilis/apiClient";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const CartItem = (props) =>{
    const [quantity, setQuantity] = useState(props.perfume.quantity);
    const [showError, setShowError] = useState(undefined);
    const [loading, setLoading] = useState(false);
    
    const changeHandler = async (event) =>{
        setLoading(true)
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
            setLoading(false);
        }catch(error){
            setLoading(false);
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
                {/* <img className={classes.cartImage} src={product.image.startsWith("https")?`${product.image}` : `/images/${product.image}.webp`} alt="cart-item" /> */}
                <LazyLoadImage
                    className={classes.cartImage}
                    src={product.image.startsWith("https")?`${product.image}` : `/images/${product.image}.webp`}
                    alt="cart-item"
                    effect="opacity"
                    height="auto"
                />
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
                {loading && <div className="spinner-border spinner-border-sm text-secondary me-1" role="status" />}
                <input type="number" name="quantity" id="change-quantity" value={quantity} min="0" onChange={changeHandler} disabled={loading}/>
                <p className={classes.error}>{showError? showError : ''}</p>
            </div>
            <p className={classes.priceTag}>${parseFloat(props.perfume.total).toFixed(2)}</p>
            
           </div>
        </motion.div>
    )
}

export default CartItem