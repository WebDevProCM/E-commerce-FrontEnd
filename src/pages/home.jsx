import React from "react";
import Hero from '../components/hero/hero'
import Section from '../components/sections/section'
import Footer from '../components/footer/footer'

const Home = () =>{
    return(
        <div className="home">
            <Hero/>
            <Section title='New Arrival' bg='white' color='black' button='btn btn-outline-dark'/>
            <Section title='Mens Perfume' bg='#11235A' color='white' button='btn btn-outline-primary'/>
            <Section title='Womens Perfume' bg='#9D65C9' color='white' button='btn btn-outline-dark'/>
            <Footer/>
        </div>
    )
}

export default Home