import React from "react";
import Hero from '../components/Hero/Hero'
import Section from '../components/Sections/Section'
import newArrivals from '../components/assets/newArrivals.json'
import mensNew from '../components/assets/mensNew.json'
import womensNew from '../components/assets/womensNew.json'

const Home = () =>{
    return(
        <div className="home">
            <Hero/>
            <Section title='New Arrival' bg='white' color='black' path='/mens' perfumes={newArrivals}/>
            <Section title='Mens Perfume' bg='#11235A' color='white' button='btn btn-outline-primary' path='/mens' perfumes={mensNew}/>
            <Section title='Womens Perfume' bg='#9D65C9' color='white' button='btn btn-outline-dark' path='womens' perfumes={womensNew}/>
        </div>
    )
}

export default Home
//homepage