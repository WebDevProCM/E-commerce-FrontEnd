import React from "react";
import './ProductDescription.css';

const ProductDescription = (props) =>{
    const addToCartHandler = () =>{

    }

    return (
        <div className="description">
            <h2>{props.title}</h2>
            <div className="price">
                <p className="newPrice">${props.price}</p>
                <p className="oldPrice">${props.oldPrice}</p>
            </div>
            <div className="details">
                {props.description}
            </div>
            <div className="addCart">
                <button type="button" className="btn btn-danger" onClick={addToCartHandler}>Add to cart</button>
            </div>
            <div className="tags">
                <p>Category: {props.category}</p>
            </div>
        </div>
    )
}

export default ProductDescription