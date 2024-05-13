import React from "react";
import Banner from '../components/banner/banner'
import Category from '../components/category/category'
import Footer from '../components/footer/footer'
import mensBanner from '../components/assets/mens-banner.jpg'


const mensCategory = (props) =>{
    return(
        <div className="mens">
            <Banner title='Trending Mens Perfume' bannerImg={mensBanner}/>
            <Category/>
            <Footer/>
        </div>
    )
}

export default mensCategory