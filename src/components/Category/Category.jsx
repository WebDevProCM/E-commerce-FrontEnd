import React, { memo, useCallback, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import './Category.css';
import Item from '../ProductItem/Item'
import {motion, AnimatePresence} from "framer-motion"

const ProductCard = ({perfume}) =>{
    return (
        <motion.div className="col-lg-4 col-md-6 col-sm-12" key={perfume.prodId}
        initial={{scaleX: 0}}
        animate={{scaleX: 1}}
        exit={{scaleX: 0}}
        >
            <Link to={`/item/${perfume.prodId}`}> <Item perfume={perfume}/> </Link>
        </motion.div>
    )
}

const SortSection = memo(function SortSection({mlClickHandler, typeClickHandler}){
    return(
    <div className="sort-section">
        <h4>SORT-</h4>
        <div className="sort">
            <label htmlFor="500">500ML</label>
            <input type="checkbox" name="500" id="500" value='500' onChange={mlClickHandler}/>
        </div>
        <div className="sort">
            <label htmlFor="250">250ML</label>
            <input type="checkbox" name="250" id="250" value='250' onChange={mlClickHandler}/>
        </div>
        <div className="sort">
            <label htmlFor="100">100ML</label>
            <input type="checkbox" name="100" id="100" value='100' onChange={mlClickHandler}/>
        </div>
        <div className="sort">
            <label htmlFor="50">50ML</label>
            <input type="checkbox" name="50" id="50" value='50' onChange={mlClickHandler}/>
        </div>
        <div className="sort">
            <label htmlFor="cologne">Eau de Cologne</label>
            <input type="checkbox" name="Cologne" id="cologne" value='eau de cologne' onClick={typeClickHandler}/>
        </div>
        <div className="sort">
            <label htmlFor="parfume">Parfum</label>
            <input type="checkbox" name="Parfum" id="parfume"  value='parfume' onClick={typeClickHandler}/>
        </div>
        <div className="sort">
            <label htmlFor="toilette">Eau de Toilette</label>
            <input type="checkbox" name="Toilette" id="toilette" value='eau de toilette'  onClick={typeClickHandler}/>
        </div>
        <div className="sort">
            <label htmlFor="fraiche">Eau Fraiche</label>
            <input type="checkbox" name="Fraiche" id="fraiche" value='eau fraiche'  onClick={typeClickHandler}/>
        </div>

    </div>
    )
})

const Category = (props) =>{
    const allPerfumes = useLoaderData();

    const [typeSort, setTypeSort] = useState([]);
    const [mlSort, setMlSort] = useState([]);

    const typeClickHandler = useCallback(function typeClickHandler(e) {
        if(e.target.checked){
            return setTypeSort((exstingSort) => [e.target.value, ...exstingSort])
        }
        if(!e.target.checked){
            let newSort = typeSort.filter((value) => value !== e.target.value);
            return setTypeSort( (prev) => newSort);
        }
    }, []);

    const mlClickHandler = useCallback(function mlClickHandler(e) {
        if(e.target.checked){
            return setMlSort((exstingSort) => [e.target.value, ...exstingSort])
        }
        if(!e.target.checked){
            let newSort = mlSort.filter((value) => value !== e.target.value);
            return setMlSort( (prev) => newSort);
        }
    }, [])

    return ( 
        <motion.div 
        className="category">
            <SortSection typeClickHandler={typeClickHandler} mlClickHandler={mlClickHandler}/>
            <div className="items">
                <motion.div layout className="row">
                    <AnimatePresence mode="sync">
                    {allPerfumes.map((perfume) =>{
                        if((typeSort.length < 1 && mlSort.length < 1) && (props.category===perfume.category || "Unisex"===perfume.category)){
                            return  <ProductCard key={perfume._id} perfume={perfume} />
                        }else if((props.category===perfume.category || "Unisex"===perfume.category) && (typeSort.length > 0 && mlSort.length < 1) && typeSort.includes(perfume.type.toString()) ){
                            return  <ProductCard key={perfume._id} perfume={perfume} />
                        }else if((props.category===perfume.category || "Unisex"===perfume.category) && (mlSort.length > 0 && typeSort.length < 1) && mlSort.includes(perfume.ml.toString()) ){
                            return  <ProductCard key={perfume._id} perfume={perfume} />
                        }else if((props.category===perfume.category || "Unisex"===perfume.category) && (typeSort.length > 0 && mlSort.length > 0) && (typeSort.includes(perfume.type.toString()) && mlSort.includes(perfume.ml.toString())) ){
                            return  <ProductCard key={perfume._id} perfume={perfume} />
                        }else{
                            return null
                        }
                    })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Category