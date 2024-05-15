import React from "react";
import './section.css'
import Item from "../productItem/item";
import { Link } from "react-router-dom";

const MenSection = (props) =>{
    return(
        <div className="men-section" style={{backgroundColor:props.bg, color:props.color}}>
            <h1>{props.title}</h1>
            <hr />
            <div className="section">
                <div className="row">
                    <div className="col-lg-4"><Link to='/item'><Item /></Link></div>
                    <div className="col-lg-4"><Link to='/item'><Item /></Link></div>
                    <div className="col-lg-4"><Link to='/item'><Item /></Link></div>
                </div>
            </div>
            <Link to={props.path}><button type="button" className={props.button} onClick={() => {window.scrollTo(0,0)}}>Explore More</button></Link>
            
        </div>
    )
}

export default MenSection