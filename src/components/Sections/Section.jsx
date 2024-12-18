import React, { useEffect, useState } from "react";
import classes from './Section.module.css'
import Item from "../ProductItem/Item";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const MenSection = (props) =>{
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() =>{
        const screenSizeHandler = () =>{
            setScreenSize(window.innerWidth);
        }
        screenSizeHandler();
        window.addEventListener("resize", screenSizeHandler);

        return () => window.removeEventListener("resize", screenSizeHandler);
    }, [])

    const movingCords = screenSize > 500 ? ["-95%", "100%"] : ["-170%", "100%"]

    return(
        <motion.div 
        className={classes['All-section']} 
        style={{backgroundColor:props.bg, color:props.color}}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{duration: 1}}
        >
            <motion.h1 
            className={classes[`h1-${props.type}`]}
            animate={{x:movingCords}}
            transition={{duration: 20, repeat:Infinity, ease: "linear"}}
            >{props.title}</motion.h1>
            {/* <hr /> */}
            <div className={classes.section}>
                <div className={`${classes.row} row`}>
                    {props.perfumes.map((perfume) =>{
                        return <motion.div key={perfume.id} className="col-lg-4" 
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition= {{type:"spring"}}
                        viewport={{once: true}}
                        >
                            <Link to={`/item/${perfume.id}`}> 
                                <Item perfume={perfume} />
                            </Link>
                        </motion.div>
                    })}
                </div>
            </div>
            {props.button &&
             <Link to={props.path}><button type="button" className={props.button} onClick={() => {window.scrollTo(0,0)}}>Explore More</button></Link>
            }
            
        </motion.div>
    )
}

export default MenSection