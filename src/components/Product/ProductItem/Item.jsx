import React from "react";
import {Rating} from 'react-simple-star-rating';
import classes from './Item.module.css'
import {motion} from 'framer-motion'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const item = (props) =>{
    return(
    <motion.div 
    className={`${classes.card} card`} onClick={() =>{window.scrollTo(0,0)}}
    whileHover={{scale: 1.1}}
    transition={{type: "spring"}}
    >   
        <div className={classes['img-container']}>
            {/* <img src={props.perfume.image.startsWith("https")?`${props.perfume.image}` : `/images/${props.perfume.image}.webp`} className="card-img-top" alt="perfume"/> */}
            <LazyLoadImage
                className="card-img-top"
                src={props.perfume.image.startsWith("https")?`${props.perfume.image}` : `/images/${props.perfume.image}.webp`}
                alt="perfume"
                effect="opacity"
                width="100%"
                height="auto"
            />
        </div>
        <div className={`${classes["card-body"]} card-body`}>
            <h5 className={classes['card-title']}>{props.perfume.name}</h5>
            <p className={classes["card-text"]}>Category: {props.perfume.category}</p>
            <p className={classes["card-text"]}>Type: {props.perfume.type}</p>
            <p className={classes["card-text"]}>{props.perfume.ml}ML</p>
        </div>
        <div className={`${classes["card-body"]} card-body`}>
            <div className={classes["card-link"]}>
                <p className={classes["new-price"]}>${props.perfume.price}</p>
                {props.perfume.oldPrice > 0 && <p className={classes["old-price"]}>${props.perfume.oldPrice}</p>} 
            </div>
            {/* <div className={classes["card-link"]}>
                {props.perfume.quantity < 1 && "Out of stock"}
                {props.perfume.status !== 1 ?"Unavailable": "Available"}
            </div> */}
            <div className={classes.reviews}>
                <Rating initialValue={props.perfume.averageRating} readonly={true} size={18}/>
                <p>&#40;{props.perfume.totalReviews}&#41;</p>
            </div>
        </div>
    </motion.div>
        
    )
}

export default item