import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ProductDescription.css';

const ProductDescription = (props) =>{
    const [showError, setShowError] = useState(undefined);
    const navigate = useNavigate();

    const addToCartHandler = async (prodId) =>{
        const quantity = document.querySelector("#quantity").value;
        const data = {
            product: prodId,
            quantity: quantity
        }
        const response =  await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const cartItem = await response.json();
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
                <p className="oldPrice">${props.perfume.oldPrice}</p>
            </div>
            <div className="details">
                {props.perfume.description}
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity"></input>
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