import React from "react";
import classes from './ProductSlides.module.css'

const ProductSlides = (props) =>{
    return(
        <div className={classes.slides}>
            <div id="carouselCaptions" className={`carousel slide`}>
                <div className={`carousel-indicators`}>
                    <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="0" className={`active`} aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className={`carousel-inner`}>
                    <div className={`${classes["carousel-item"]} carousel-item active`}>
                    <img src={props.image.startsWith("https")?`${props.image}` : `/images/${props.image}.jpg`} className={`d-block w-100`} alt="..."/>
                    <div className={`carousel-caption d-none d-md-block`}>
                        <h5>{props.title}</h5>
                    </div>
                    </div>
                    <div className={`${classes["carousel-item"]} carousel-item`}>
                    <img src={props.image.startsWith("https")?`${props.image}` : `/images/${props.image}.jpg`} className={`d-block w-100`} alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{props.title}</h5>
                    </div>
                    </div>
                    <div className={`${classes["carousel-item"]} carousel-item`}>
                    <img src={props.image.startsWith("https")?`${props.image}` : `/images/${props.image}.jpg`} className={`d-block w-100`} alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{props.title}</h5>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSlides