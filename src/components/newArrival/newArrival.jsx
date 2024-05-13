import React from "react";
import './newArrival.css'
import Item from "../productItem/item";

const NewArrival = () =>{
    return(
        <div className="new-arrival">
            <h1>New Arrival</h1>
            <div class="container text-center">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12"> <Item /> </div>
                    <div class="col-lg-4 col-md-6 col-sm-12"> <Item /> </div>
                    <div class="col-lg-4 col-md-6 col-sm-12"> <Item /> </div>
                </div>
            </div>
            
        </div>
    )
}

export default NewArrival