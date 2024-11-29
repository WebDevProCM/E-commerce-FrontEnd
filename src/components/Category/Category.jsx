import React, { memo, useCallback, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import classes from './Category.module.css';
import Item from '../ProductItem/Item'
import {motion, AnimatePresence} from "framer-motion"

//product item displaying card
const ProductCard = ({perfume}) =>{
    return (
        <motion.div className={`${classes["col-lg-4"]} col-lg-4 col-md-6 col-sm-12`} key={perfume.prodId}
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale:1}}
        exit={{opacity: 0, scale: 0}}
        >
            <Link to={`/item/${perfume.prodId}`}> <Item perfume={perfume}/> </Link>
        </motion.div>
    )
}

//one input element of filter section
const FilterValue = ({value, unit, handler}) =>{
    return(
        <div className={classes.sort}>
            <label htmlFor={value}>{value}{unit}</label>
            <input type="checkbox" name={value} id={value} value={value} onChange={handler}/>
        </div>
    )
}

//filter section
const SortSection = memo(function SortSection({sortHandler}){
    return(
    <div className={classes["sort-section"]}>
        <section className={classes["sort-type"]}>
            <h4>ML-</h4>
            <FilterValue value="500" handler={sortHandler} unit="ML"/>
            <FilterValue value="250" handler={sortHandler} unit="ML"/>
            <FilterValue value="100" handler={sortHandler} unit="ML"/>
            <FilterValue value="50" handler={sortHandler} unit="ML"/>
        </section>

        <section className={classes["sort-type"]}>
            <h4>TYPE-</h4>
            <FilterValue value="eau de cologne" handler={sortHandler}/>
            <FilterValue value="parfume" handler={sortHandler}/>
            <FilterValue value="eau de toilette" handler={sortHandler}/>
            <FilterValue value="eau fraiche" handler={sortHandler}/>
        </section>

    </div>
    )
})

const Category = (props) =>{
    let allPerfumes = useLoaderData();
    const categories = [props.category, "Unisex"];
    //return perfumes with relevant category(men or women)
    const perfumes = allPerfumes.filter((perfume) => categories.includes(perfume.category));

    const [sort, setSort] = useState(["50", "100", "250", "500", "eau de cologne", "parfume", "eau de toilette", "eau fraiche"]);

    //changing sort state when user applying filters
    const sortHandler = useCallback(function sortHandler(e) {
        if(e.target.checked){
            return setSort( (prev) => prev.filter((value) => value !== e.target.value));
        }
        if(!e.target.checked){
            return setSort((exstingSort) => [e.target.value, ...exstingSort])
        }
    }, []);

    //filtering perfumes based on user selected filters
    const filteredPerfumes = sort.length > 7 ? perfumes : perfumes.filter(perfume => !sort.includes(perfume.type) || !sort.includes(perfume.ml.toString()));

    return ( 
        <motion.div 
        className={classes.category}>
            <SortSection sortHandler={sortHandler} />
            <motion.div layout className={classes.items}>
                    <AnimatePresence mode="wait">

                    {filteredPerfumes.map((perfume) =>{
                        return(
                            <ProductCard key={perfume._id} perfume={perfume} />
                        )
                    })}

                    </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export default Category