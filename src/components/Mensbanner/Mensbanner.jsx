import React from 'react'
import classes from "./Mensbanner.module.css";
import {motion} from 'framer-motion'

function Mensbanner() {
  return (
    <main className={classes.mensbanner}> 
        <section className={classes.titleSection}>
            <motion.p style={{textAlign:"center"}}
              initial={{translateX: -200, opacity: 0}}
              animate={{translateX: 0, opacity: 1}}
              transition={{duration: 1, ease: "easeInOut"}}
            >
              Top-Selling Perfumes</motion.p>

            <motion.p style={{textAlign:"left"}}
              initial={{translateX: 200, opacity: 0}}
              animate={{translateX: 0, opacity: 1}}
              transition={{duration: 1, ease: "easeInOut"}}
            >
              The Most Popular <span className={classes.lightText}>and best</span>
            </motion.p>

            <motion.p style={{textAlign:"right"}}
              initial={{translateX: -200, opacity: 0}}
              animate={{translateX: 0, opacity: 1}}
              transition={{duration: 1, ease: "easeInOut"}}
            >
              Scents for Every Mood</motion.p>

        </section>
        <motion.section className={classes.imageSection}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 1}}
        >
            <img src='/images/mystic forest.webp' alt='men perfume' />
            <img src='/images/oceanic escape.webp' alt='men perfume' />
            <img src='/images/sunlit whisper.webp' alt='men perfume' />
        </motion.section>
        <motion.section className={classes.textSection}
          initial={{translateY: -100, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{duration: 1, ease: "easeInOut"}}
        >
            <p>Discover the perfect scent that defines your style and personality. Our collection of men's 
                perfumes brings together bold, sophisticated, and timeless fragrances designed for every 
                occasion. Whether you prefer fresh, woody, or musky notes, you'll find a scent that leaves a 
                lasting impression. </p>
        </motion.section>
    </main>
  )
}

export default Mensbanner