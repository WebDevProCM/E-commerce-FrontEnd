import React from "react";
import './Hero.css'
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const Hero = () =>{
    return(
        <div className="hero text-center">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 hero-left">
                    <motion.h3
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.6, delay: 0.1}}
                    >Discover the Fragance of Elegance
                    </motion.h3>
                    <motion.p
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{duration: 0.5, delay: 0.3}}
                    >
                        Unveiling the art of fragrance! We're passionate about helping you find the perfect scent
                        to express yourself. Explore our delightful collection of perfumes at TrueElegance.
                    </motion.p>
                    <Link to="/mens" className="btn btn-outline-dark">Shop More</Link>
                </div>
                <motion.div 
                className="col-lg-6 col-md-12 col-sm-12 hero-right"
                initial={{opacity: 0, scaleY: 0}}
                animate={{opacity: 1, scaleY: 1}}
                transition={{duration: 0.8, delay: 0.1, type: "spring"}}
                >
                    <img src="./images/banner2.webp" alt="fragrance bottle" />
                </motion.div>
            </div>
        </div>
    )
}

export default Hero