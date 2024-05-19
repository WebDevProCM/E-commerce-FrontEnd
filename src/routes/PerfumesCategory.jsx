import React from "react";
import './css/mens.css'
import Banner from '../components/banner/banner'
import Category from '../components/category/category'
import mensBanner from '../components/assets/mens-banner.jpg'
import womensBanner from '../components/assets/women-banner.png'
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
    const response = await fetch("http://localhost:3000/api/product");
    const data = await response.json();
    return data;
}