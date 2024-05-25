import React from "react";
import './hero.css'
import { Link } from "react-router-dom";

const Hero = () =>{
    return(
        <div className="hero text-center">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 hero-left">
                    <h3>Discover the Fragance of Elegance</h3>
                    <p>
                        Unveiling the art of fragrance! We're passionate about helping you find the perfect scent
                        to express yourself. Explore our delightful collection of perfumes at TrueElegance.
                    </p>
                    <Link to="/mens" className="btn btn-outline-dark">Shop More</Link>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 hero-right">
                    <img src="./images/banner2.png" alt="fragrance bottle" />
                </div>
            </div>
        </div>
    )
}

export default Hero