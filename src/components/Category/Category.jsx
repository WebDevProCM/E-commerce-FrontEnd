import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import classes from './Category.module.css';
import Item from '../Product/ProductItem/Item'
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
    let perfumesWithCount = useLoaderData(); 
    // product cards per page
    const limit = 9; 
    const [allPerfumes, setAllPerfumes] = useState(perfumesWithCount.products);
    const [remainingDocuments, setRemainingDocuments] = useState(perfumesWithCount.total - limit);
    const [filters, setFilters] = useState([]);

    useEffect(() =>{
        setAllPerfumes(perfumesWithCount.products);
    }, [perfumesWithCount])
    
    const [currentPage, setCurrentPage] = useState(1);

    //changing sort state when user applying filters
    const filterHandler = useCallback(function filterHandler(e) {
        if(e.target.checked){
            return setFilters( (prev) => [...prev, e.target.value]);
        }
        if(!e.target.checked){
            return setFilters((prev) => prev.filter((value) => value !== e.target.value));
        }
    }, []);

    //filtering perfumes based on user selected filters
    const filteredPerfumes = allPerfumes.filter((product) => {
        const matchesType = filters.length === 0 || filters.includes(product.type);
        const matchesMl = filters.length === 0 || filters.includes(product.ml.toString()); 
        
        return matchesType || matchesMl;
    })
    
    const nextPageHandler = async () =>{
        let newPage = currentPage + 1
        if (remainingDocuments < 1){
            return;
        }

        setCurrentPage((prev) => prev + 1);
        setRemainingDocuments((prev) => prev - limit);

        try {
            const response = await apiClient.get("/api/products",
                {params: {category: ["Unisex", props.category], page: newPage}}
            );
            const data = response.data;
            setAllPerfumes(data.products);
    
            if (data.error) {
                return toast.error(data.error);
            }
            window.scrollTo(0, 500);
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
            const response = await apiClient.get("/api/products",{
                params: {category: ["Unisex", props.category], page: newPage}
            });
            const data = response.data;
            setAllPerfumes(data.products);
    
            if (data.error) {
                return toast.error(data.error);
            }
            window.scrollTo(0, 500);
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong!");
        }
    }

    return (
        <>
        <div className={classes.category} id="products">
            <SortSection sortHandler={filterHandler} />
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