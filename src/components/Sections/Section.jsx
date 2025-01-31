import React from "react";
import classes from './Section.module.css'
import Item from "../ProductItem/Item";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const MenSection = (props) =>{
    return(
        <motion.div 
        id="section"
        className={classes['All-section']} 
        // style={{backgroundColor:props.bg, color:props.color}}
        // initial={{opacity: 0.3}}
        // whileInView={{opacity: 1}}
        // viewport={{once: true}}
        // transition={{duration: 0.5, delay: 0.1}}
        >
            <h1 className={classes[`h1-${props.type}`]}> {props.title} </h1>
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
             <Link to={props.path}><button type="button" className="btn btn-outline-dark" onClick={() => {window.scrollTo(0,0)}}>Explore More</button></Link>
            }

            <hr />
            
        </motion.div>
    )
}

export default MenSection