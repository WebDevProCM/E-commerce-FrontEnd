import React from 'react'
import classes from "./Womensbanner.module.css";
import { Link } from 'react-router-dom';

function Womensbanner() {
  return (
    <main className={classes.womensbanner}>
        <section className={classes.leftSection}>
            <img src='/images/secret garden.jpg' alt='women perfume' />
        </section>
        <section className={classes.midSection}>
            <h2>Best Perfume <br/>Collection For You</h2>
            <p>Explore our collection and find the fragrance that makes every moment unforgettable!</p>
            <button>BUY NOW</button>
            <h3>essence unleashed</h3>
            <h5>Unleashed elegance, timeless scents—discover your signature fragrance today.</h5>
        </section>
        <section className={classes.rightSection}>
        <img src='/images/sparkling citrus.jpg' alt='women perfume' />
        </section>

    </main>
  )
}

export default Womensbanner