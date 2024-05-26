import React from "react";
import './Item.css'

const item = (props) =>{
    return(
    <div className="card" onClick={() =>{window.scrollTo(0,0)}}>
        <img src={`/images/${props.title}.jpg`} className="card-img-top" alt="perfume"/>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">Category: {props.category}</p>
        </div>
        <div className="card-body">
            <div className="card-link">
                <p className="new-price">${props.price}</p>
                {props.oldPrice && <p className="old-price">${props.oldPrice}</p>} 
            </div>
            <div className="card-link">Available</div>
        </div>
    </div>
        
    )
}

export default item
// {require(`../assets/${props.title}.jpg`)}