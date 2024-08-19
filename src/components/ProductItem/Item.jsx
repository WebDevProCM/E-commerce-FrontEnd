import React from "react";
import './Item.css'
import {motion} from 'framer-motion'

const item = (props) =>{
    return(
    <motion.div 
    className="card" onClick={() =>{window.scrollTo(0,0)}}
    whileHover={{scale: 1.1}}
    transition={{type: "spring"}}
    >   
        <div className="img-container">
            <img src={`/images/${props.perfume.name}.jpg`} className="card-img-top" alt="perfume"/>
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.perfume.name}</h5>
            <p className="card-text">Category: {props.perfume.category}</p>
            <p className="card-text">Type: {props.perfume.type}</p>
            <p className="card-text">{props.perfume.ml}ML</p>
        </div>
        <div className="card-body">
            <div className="card-link">
                <p className="new-price">${props.perfume.price}</p>
                {props.perfume.oldPrice > 0 && <p className="old-price">${props.perfume.oldPrice}</p>} 
            </div>
            <div className="card-link">
                {props.perfume.quantity < 1 && "Out of stock"}
                {props.perfume.status !== 1 ?"Unavailable": "Available"}
            </div>
        </div>
    </motion.div>
        
    )
}

export default item
// {require(`../assets/${props.title}.jpg`)}