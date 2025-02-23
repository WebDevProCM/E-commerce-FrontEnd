import React from 'react'
import classes from "./Womensbanner.module.css";
import {motion} from 'framer-motion'

function Womensbanner() {
  return (
    <main className={classes.womensbanner}>
        <section className={classes.leftSection}>
            <motion.img 
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{duration: 0.5, ease: "easeInOut"}}
              src='/images/secret garden.webp' alt='women perfume' />
        </section>
        <section className={classes.midSection}>
            <motion.h2
              initial={{scaleY: 0, opacity: 0}}
              animate={{scaleY: 1, opacity: 1}}
              transition={{duration: 0.5, ease: "easeInOut"}}
            >
              Best Perfume <br/>Collection For You</motion.h2>
            <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, ease: "easeInOut"}}
            >
              Explore our collection and find the fragrance that makes every moment unforgettable!</motion.p>
            <motion.button
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, ease: "easeInOut"}}
            >
              BUY NOW</motion.button>
            
            <motion.h3
              initial={{opacity: 0, scaleX: 0}}
              animate={{opacity: 1, scaleX: 1}}
              transition={{duration: 0.7, ease: "easeInOut"}}
            >
              essence unleashed</motion.h3>
            
            <motion.h5
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, ease: "easeInOut"}}
            >
              Unleashed elegance, timeless scents—discover your signature fragrance today.</motion.h5>
        </section>
        <section className={classes.rightSection}>
          <motion.img
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}} 
            src='/images/sparkling citrus.webp' alt='women perfume' />
        </section>

    </main>
  )
}

export default Womensbanner