import React from "react";
import classes from "./css/perfumecategory.module.css"
import Banner from "../components/Banner/Banner"
import Category from '../components/Category/Category'
import mensBanner from '../components/assets/mens-banner.jpg'
import womensBanner from '../components/assets/women-banner.png'
import apiClient from "../utilis/apiClient";
const PerfumesCategory = (props) =>{
    //changing banner based on the page
    const bannerImg = props.bannerImg === 'mensBanner'? mensBanner: womensBanner; 
    
    return(
        <div className={`${props.category} ${classes.perfumecategory}`}>
            <Banner title={props.bannerTitle} bannerImg={bannerImg}/>
            <Category category={props.category}/>
        </div>
    )
}

export default PerfumesCategory
export async function loader(){
    try{
        const response = await apiClient.get("/api/product");
        const data = response.data
        if(data.error){
            throw new Error(data.error);
        }
        return data;
    }catch(error){
        if(error?.response?.data){
            throw new Error(error.response.data.error);
        }
        throw new Error(error);
    }
}