import React from "react";
import classes from './Banner.module.css'

const Banner = (props) =>{
    return (
        <section className={classes.banner}>
            <div className={classes["banner-left"]}>
                <h2>{props.title}</h2>
            </div>
            <div className={classes["banner-right"]}>
                <img src={props.bannerImg} alt="banner" />
            </div>
        </section>
    )
}

export default Banner