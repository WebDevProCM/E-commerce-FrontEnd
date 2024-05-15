import React from "react";
import Banner from '../components/banner/banner'
import Category from '../components/category/category'
import womenBanner from '../components/assets/women-banner.png'



const mensCategory = (props) =>{
    return(
        <div className="mens">
            <Banner title='Trending Womens Perfume' bannerImg={womenBanner}/>
            <Category category='Women'/>
        </div>
    )
}

export default mensCategory