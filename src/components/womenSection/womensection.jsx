import React from "react";
import './womensection.css'
import Item from "../productItem/item";

const WomenSection = () =>{
    return(
        <div className="women-section">
            <h1>Womens perfume</h1>
            <div class="container text-center">
                <div class="row">
                    <div class="col-lg-4"> <Item /> </div>
                    <div class="col-lg-4"> <Item /> </div>
                    <div class="col-lg-4"> <Item /> </div>
                </div>
            </div>
            <button type="button" class="btn btn-outline-dark">Explore More</button>
            
        </div>
    )
}

export default WomenSection