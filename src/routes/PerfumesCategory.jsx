import React from "react";
import Banner from '../components/banner/banner'
import Category from '../components/category/category'
import mensBanner from '../components/assets/mens-banner.jpg'
import womensBanner from '../components/assets/women-banner.png'
import axios from "axios";
const PerfumesCategory = (props) =>{
    const bannerImg = props.bannerImg === 'mensBanner'?mensBanner:womensBanner; 
    return(
        <div className={props.category}>
            <Banner title={props.bannerTitle} bannerImg={bannerImg}/>
            <Category category={props.category}/>
        </div>
    )
}

export default PerfumesCategory
export async function loader(){
    try{
        const response = await axios.get("http://localhost:3000/api/product", {withCredentials: true});
        const data = response.data
        if(data.error){
            throw new Error(data.error);
        }
        return data;
    }catch(error){
        throw new Error(error);
    }
}