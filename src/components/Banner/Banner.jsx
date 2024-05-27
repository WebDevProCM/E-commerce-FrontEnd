import React from "react";
import './Banner.css'

const Banner = (props) =>{
    return (
        <div className="banner">
            <div className="banner-left">
                <h2>{props.title}</h2>
                <p>CheckOut the New Arrivals!</p>
            </div>
            <div className="banner-right">
                <img src={props.bannerImg} alt="banner" />
            </div>
        </div>
    )
}

export default Banner