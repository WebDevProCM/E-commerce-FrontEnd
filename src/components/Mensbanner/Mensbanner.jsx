import React from 'react'
import classes from "./Mensbanner.module.css";

function Mensbanner() {
  return (
    <main className={classes.mensbanner}> 
        <section className={classes.titleSection}>
            <p style={{textAlign:"center"}}>Top-Selling Perfumes</p>
            <p style={{textAlign:"left"}}>The Most Popular <span className={classes.lightText}>and best</span></p>
            <p style={{textAlign:"right"}}>Scents for Every Mood</p>
        </section>
        <section className={classes.imageSection}>
            <img src='/images/mystic forest.jpg' alt='men perfume' />
            <img src='/images/oceanic escape.jpg' alt='men perfume' />
            <img src='/images/sunlit whisper.jpg' alt='men perfume' />
        </section>
        <section className={classes.textSection}>
            <p>Discover the perfect scent that defines your style and personality. Our collection of men's 
                perfumes brings together bold, sophisticated, and timeless fragrances designed for every 
                occasion. Whether you prefer fresh, woody, or musky notes, you'll find a scent that leaves a 
                lasting impression. </p>
        </section>
    </main>
  )
}

export default Mensbanner