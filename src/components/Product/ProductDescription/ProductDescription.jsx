import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './ProductDescription.module.css';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import apiClient from "../../../utilis/apiClient";

const ProductDescription = (props) =>{
    const [showError, setShowError] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    // const {user} = useContext(CurrentUserContext);

    const addToCartHandler = async (prodId) =>{
        setLoading(true);
        try{
            if(!user){
                return toast.error("Please Log In!");
            }
            const quantity = document.querySelector("#quantity").value;
            const data = {
                product: prodId,
                quantity: quantity
            }
            const response =  await apiClient.post(`/api/cart`, data);
    
            const cartItem = response.data;
            if(cartItem.error){
                return setShowError(cartItem.error);
            }
            setLoading(false);
            return navigate("/cart");
        }catch(error){
            if(error?.response?.data){
                return setShowError(error.response.data.error);
            }
            return setShowError("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className={classes.description}>
            <h2>{props.perfume.name}</h2>
            <div className={classes.price}>
                <p className={classes.newPrice}>${props.perfume.price}</p>
                {props.perfume.oldpirce &&
                    <p className={classes.oldPrice}>${props.perfume.oldPrice}</p>
                }
            </div>
            <div className={classes.details}>
                {props.perfume.description}
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity" min="1"></input>
            </div>
            <div className={classes.addCart}>
                <button type="button" className={`btn btn-danger`} disabled={loading} onClick={ () => addToCartHandler(props.perfume._id)}>Add to cart</button>
                {loading && <div className="spinner-border spinner-border-sm text-secondary ms-1" role="status" />}
                <p className={classes.error}>{showError? showError : ''}</p>
            </div>
            <div className={classes.tags}>
                <p>Category: {props.perfume.category}</p>
                <p>Type: {props.perfume.type}</p>
                <p>{props.perfume.ml}ML</p>
            </div>
        </div>
    )
}

export default ProductDescription