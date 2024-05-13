import React from "react";
import './section.css'
import Item from "../productItem/item";

const MenSection = (props) =>{
    return(
        <div className="men-section" style={{backgroundColor:props.bg, color:props.color}}>
            <h1>{props.title}</h1>
            <hr />
            <div class="container text-center">
                <div class="row">
                    <div class="col-lg-4"> <Item /> </div>
                    <div class="col-lg-4"> <Item /> </div>
                    <div class="col-lg-4"> <Item /> </div>
                </div>
            </div>
            <button type="button" class={props.button}>Explore More</button>
            
        </div>
    )
}

export default MenSection