import React from "react";
import './item.css'
import item1 from '../assets/item1.jpg'

const item = () =>{
    return(
    <div className="card">
        <img src={item1} className="card-img-top" alt="perfume"/>
        <div className="card-body">
            <h5 className="card-title">LE perfume</h5>
            <p className="card-text">card's content.</p>
        </div>
        <div className="card-body">
            <div class="card-link"><p className="new-price">Rs2500</p> <p className="old-price">Rs2500</p></div>
            <div class="card-link">Available</div>
        </div>
    </div>
        
    )
}

export default item