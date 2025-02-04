import React, { memo, useCallback, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import classes from './Category.module.css';
import Item from '../ProductItem/Item'
import {motion, AnimatePresence} from "framer-motion"
import { toast } from "react-toastify";
import apiClient from "../../utilis/apiClient";

//product item displaying card
const ProductCard = ({perfume}) =>{
    return (
        <motion.div className={`${classes["col-lg-4"]} col-lg-4 col-md-6 col-sm-12`} key={perfume.prodId}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Link to={`/item/${perfume.prodId}`}> <Item perfume={perfume}/> </Link>
        </motion.div>
    )
}

//one input element of filter section
const FilterValue = ({value, unit, handler}) =>{
    return(
        <div className={`${classes.sort} form-check`}>
        <input className="form-check-input" type="checkbox" name={value} value={value} onChange={handler}/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
            {value}{unit}
        </label>
      </div>
    )
}

//filter section
const SortSection = memo(function SortSection({sortHandler}){
    return(
    <div className={classes["sort-section"]}>
        <h2>Filters</h2>
        <section className={classes["sort-type"]}>
            <h4>ml-</h4>
            <FilterValue value="500" handler={sortHandler} unit="ML"/>
            <FilterValue value="250" handler={sortHandler} unit="ML"/>
            <FilterValue value="100" handler={sortHandler} unit="ML"/>
            <FilterValue value="50" handler={sortHandler} unit="ML"/>
        </section>

        <section className={classes["sort-type"]}>
            <h4>type-</h4>
            <FilterValue value="eau de cologne" handler={sortHandler}/>
            <FilterValue value="parfume" handler={sortHandler}/>
            <FilterValue value="eau de toilette" handler={sortHandler}/>
            <FilterValue value="eau fraiche" handler={sortHandler}/>
        </section>

    </div>
    )
})

const Category = (props) =>{
    //storing the object with products and total documents count during initial page load
    let PerfumesWithCount = useLoaderData(); 
    // product cards per page
    const limit = 9; 

    const [allPerfumes, setAllPerfumes] = useState(PerfumesWithCount.products);
    const [remainingDocuments, setRemainingDocuments] = useState(PerfumesWithCount.total - limit);
    
    const [currentPage, setCurrentPage] = useState(1);
    
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
    const filteredPerfumes = sort.length > 7 ? allPerfumes : allPerfumes.filter(perfume => !sort.includes(perfume.type) || !sort.includes(perfume.ml.toString()));

    const nextPageHandler = async () =>{
        let newPage = currentPage + 1
        if (remainingDocuments < 1){
            return;
        }

        setCurrentPage((prev) => prev + 1);
        setRemainingDocuments((prev) => prev - limit);

        try {
            const response = await apiClient.get(`/api/products/${props.category}/${newPage}`);
            const data = response.data;
            setAllPerfumes(data.products);
    
            if (data.error) {
                return toast.error(data.error);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong!");
        }
    }
    
    const prevPageHandler = async () =>{
        let newPage = currentPage - 1
        if (newPage < 1){
            return;
        }

        setCurrentPage((prev) => prev - 1);
        setRemainingDocuments((prev) => prev + limit);

        try {
            const response = await apiClient.get(`/api/products/${props.category}/${newPage}`);
            const data = response.data;
            setAllPerfumes(data.products);
    
            if (data.error) {
                return toast.error(data.error);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong!");
        }
    }

    return (
        <>
        <div className={classes.category} id="products">
            <SortSection sortHandler={sortHandler} />
            <div className={classes.items}>
                <AnimatePresence mode="wait">

                {filteredPerfumes.map((perfume) =>{
                    return(
                        <ProductCard
                            key={perfume._id} perfume={perfume} 
                        />
                    )
                })}

                </AnimatePresence>


            </div>
        </div>
        
        {/* pagination */}
        <nav aria-label="Page navigation" className={classes.pagination}>
        <ul className="pagination mx-auto">
            <li className="page-item">
                <span className="page-link" onClick={prevPageHandler}>Previous</span>
            </li>
            <li className="page-item">
                <span className="page-link">{currentPage}</span>
            </li>
            <li className="page-item">
                <span className="page-link" onClick={nextPageHandler}>Next</span>
            </li>
        </ul>
        </nav>
        </>
    )
}

export default Category