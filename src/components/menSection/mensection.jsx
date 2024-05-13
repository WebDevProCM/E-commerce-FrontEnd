import React from "react";
import './mensection.css'
import Item from "../productItem/item";

const MenSection = () =>{
    return(
        <div className="men-section">
            <h1>Mens perfume</h1>
            <div class="container text-center">
                <div class="row">
                    <div class="col-lg-4"> <Item /> </div>
                    <div class="col-lg-4"> <Item /> </div>
                    <div class="col-lg-4"> <Item /> </div>
                </div>
            </div>
            <button type="button" class="btn btn-outline-primary">Explore More</button>
            
        </div>
    )
}

export default MenSection