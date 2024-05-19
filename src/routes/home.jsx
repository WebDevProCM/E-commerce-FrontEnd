import React from "react";
import Hero from '../components/hero/hero'
import Section from '../components/sections/section'

const Home = () =>{
    return(
        <div className="home">
            <Hero/>
            <Section title='New Arrival' bg='white' color='black' button='btn btn-outline-dark' path='/mens'/>
            <Section title='Mens Perfume' bg='#11235A' color='white' button='btn btn-outline-primary' path='/mens'/>
            <Section title='Womens Perfume' bg='#9D65C9' color='white' button='btn btn-outline-dark' path='womens'/>
        </div>
    )
}

export default Home