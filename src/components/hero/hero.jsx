import React from "react";
import './hero.css'
import fragranceBanner from '../assets/banner-fragance1.png'
import { Link } from "react-router-dom";

const Hero = () =>{
    return(
        <div className="hero text-center">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 hero-left">
                    <h3>Discover the Fragance of Elegance</h3>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                         Nam dicta eum possimus, aut quae reprehenderit corrupti voluptatibus error vero quod 
                         esse, vitae ea expedita, necessitatibus voluptate non fugiat! Sequi, fuga!
                    </p>
                    <Link to="/mens"><button type="button" className="btn btn-outline-dark">Shop More</button></Link>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 hero-right">
                    <img src={fragranceBanner} alt="fragrance bottle" />
                </div>
            </div>
        </div>
    )
}

export default Hero