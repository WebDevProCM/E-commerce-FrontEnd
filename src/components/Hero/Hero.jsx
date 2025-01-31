import React from "react";
import classes from './Hero.module.css'
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const Hero = () =>{
    return(
        <div className={classes.hero}>
            <section className={classes.topSection}>
                <h3>DISCOVER THE</h3>
                <img src="/images/heroImg1.webp" alt="perfume"/>
            </section>

            <section className={classes.midSection}>
                <h3>FRAGANCE OF</h3>
            </section>
            <section className={classes.botSection}>
                <img src="/images/heroImg2.webp" alt="perfume"/>
                <div className={classes.shopMore}>
                    <p>New Perfumes</p>
                    <button><Link to="/mens"><FaArrowRightLong /></Link></button>
                </div>
                <h3>ELEGANCE</h3>
            </section>
            <section className={classes.arrSection}>
                <button className={classes.arrBtn}><Link to="#section"><FaArrowDown /></Link></button>
            </section>
        </div>
    )
}

export default Hero