import React from "react";
import classes from "./ShowingLoading.module.css"
import { ThreeDots } from 'react-loader-spinner'

const ShowingLoading = ()=>{
    return(
        <div className={classes.loading}>
            <div className={classes.spinner}>
                <ThreeDots width="150" height="60" color="white" radius="9"/>
                <h2>Loading...</h2> 
            </div>
        </div>
    )
}

export default ShowingLoading;