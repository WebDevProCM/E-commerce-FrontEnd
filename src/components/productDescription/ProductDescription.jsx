import React, {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../routes/Layout";
import './ProductDescription.css';
import axios from "axios";
import { toast } from "react-toastify";

const ProductDescription = (props) =>{
    const [showError, setShowError] = useState(undefined);
    const navigate = useNavigate();
    const {user} = useContext(CurrentUserContext);

    const addToCartHandler = async (prodId) =>{
        if(!user){
            return toast.error("Please Log In!");
        }
        const quantity = document.querySelector("#quantity").value;
        const data = {
            product: prodId,
            quantity: quantity
        }
        const response =  await axios.post("http://localhost:3000/api/cart", data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        const cartItem = response.data;
        if(cartItem.error){
            return setShowError(cartItem.error);
        }
        return navigate("/cart");
    }

    return (
        <div className="description">
            <h2>{props.perfume.name}</h2>
            <div className="price">
                <p className="newPrice">${props.perfume.price}</p>
                {props.perfume.oldpirce &&
                    <p className="oldPrice">${props.perfume.oldPrice}</p>
                }
            </div>
            <div className="details">
                {props.perfume.description}
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity" min="1"></input>
            </div>
            <div className="addCart">
                <button type="button" className="btn btn-danger" onClick={ () => addToCartHandler(props.perfume._id)}>Add to cart</button>
                <p className="error">{showError? showError : ''}</p>
            </div>
            <div className="tags">
                <p>Category: {props.perfume.category}</p>
            </div>
        </div>
    )
}

export default ProductDescription