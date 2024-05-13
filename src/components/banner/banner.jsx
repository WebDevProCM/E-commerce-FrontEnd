import React from "react";
import './banner.css'
import fragranceBanner from '../assets/banner-fragance1.png'

const Banner = () =>{
    return(
        <div className="banner text-center">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 banner-left">
                    <h3>Discover the Fragance of Elegance</h3>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                         Nam dicta eum possimus, aut quae reprehenderit corrupti voluptatibus error vero quod 
                         esse, vitae ea expedita, necessitatibus voluptate non fugiat! Sequi, fuga!
                    </p>
                    <button type="button" className="btn btn-outline-dark">Shop More</button>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 banner-right">
                    <img src={fragranceBanner} alt="fragrance bottle" />
                </div>
            </div>
        </div>
    )
}

export default Banner