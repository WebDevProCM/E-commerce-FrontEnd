import React from "react";
import classes from "./css/perfumecategory.module.css"
import Category from '../components/Category/Category'
import apiClient from "../utilis/apiClient";
import Mensbanner from "../components/Mensbanner/Mensbanner";
import Womensbanner from "../components/Womensbanner/Womensbanner";

const PerfumesCategory = (props) =>{
    
    return(
        <div className={`${props.category} ${classes.perfumecategory}`}>
            {props.bannerImg === "mensBanner" ?
                <Mensbanner />  :
                <Womensbanner />
            }
            <Category category={props.category}/>
        </div>
    )
}

export default PerfumesCategory
export async function loader({request}){
    //getting the path from the request object
    const path = request.url.split("/").at(-1);

    const category = path === "mens" ? "Men" : "Women"
    try{
        const response = await apiClient.get(`/api/products/${category}/1`);
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