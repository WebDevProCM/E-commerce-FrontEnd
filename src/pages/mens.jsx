import React from "react";
import './css/mens.css'
import Banner from '../components/banner/banner'
import Category from '../components/category/category'
import mensBanner from '../components/assets/mens-banner.jpg'


const mensCategory = (props) =>{
    return(
        <div className="mens">
            <Banner title='Trending Mens Perfume' bannerImg={mensBanner}/>
            <Category category='Men'/>
        </div>
    )
}

export default mensCategory