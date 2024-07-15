import React from "react";
import Banner from "../components/Banner/Banner"
import Category from '../components/Category/Category'
import mensBanner from '../components/assets/mens-banner.jpg'
import womensBanner from '../components/assets/women-banner.png'
import axios from "axios";
const PerfumesCategory = (props) =>{
    const bannerImg = props.bannerImg === 'mensBanner'?mensBanner:womensBanner; 
    return(
        <div className={props.category} style={{padding:"20px"}}>
            <Banner title={props.bannerTitle} bannerImg={bannerImg}/>
            <Category category={props.category}/>
        </div>
    )
}

export default PerfumesCategory
export async function loader(){
    try{
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/product`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,      
                "Access-Control-Allow-Headers": true, 
                "Access-Control-Allow-Methods": true 
            },
            credentials: 'include',
            withCredentials: true});
        const data = response.data
        if(data.error){
            throw new Error(data.error);
        }
        return data;
    }catch(error){
        throw new Error(error);
    }
}