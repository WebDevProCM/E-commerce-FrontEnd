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
                <motion.h3
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                >DISCOVER THE</motion.h3>
                <motion.img
                    initial={{translateX: -200, opacity:0}} 
                    animate={{translateX: 0, opacity: 1}} 
                    transition={{duration: 1, ease: "easeInOut"}} 
                    src="/images/heroImg1.webp" alt="perfume"/>
            </section>

            <section className={classes.midSection}>
                <motion.h3
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 0.3}}
                >FRAGANCE OF</motion.h3>
            </section>
            <section className={classes.botSection}>
                <motion.img
                    initial={{translateX: 200, opacity: 0}} 
                    animate={{translateX: 0, opacity: 1}}
                    transition={{duration: 1, ease: "easeInOut"}} 
                    src="/images/heroImg2.webp" alt="perfume"/>
                
                <motion.div className={classes.shopMore}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    <p>New Perfumes</p>
                    <button><Link to="/mens"><FaArrowRightLong /></Link></button>
                </motion.div>
                <motion.h3
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 0.6}}
                >ELEGANCE</motion.h3>
            </section>
            <motion.section 
                className={classes.arrSection}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
            >
                <button className={classes.arrBtn}><Link to="#section"><FaArrowDown /></Link></button>
            </motion.section>
        </div>
    )
}

export default Hero