import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import './Category.css';
import Item from '../ProductItem/Item'


const Category = (props) =>{
    const allPerfumes = useLoaderData();

    const [typeSort, setTypeSort] = useState([]);
    const [mlSort, setMlSort] = useState([]);

    const typeClickHandler = (e) =>{
        if(e.target.checked){
            return setTypeSort((exstingSort) => [e.target.value, ...exstingSort])
        }
        if(!e.target.checked){
            let newSort = typeSort.filter((value) => value !== e.target.value);
            return setTypeSort(newSort);
        }
    }
    const mlClickHandler = (e) =>{
        if(e.target.checked){
            return setMlSort((exstingSort) => [e.target.value, ...exstingSort])
        }
        if(!e.target.checked){
            let newSort = mlSort.filter((value) => value !== e.target.value);
            return setMlSort(newSort);
        }
    }

    return ( 
        <div className="category">
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
            <div className="items">
                <div className="row">
                    {allPerfumes.map((perfume) =>{
                        if((typeSort.length < 1 && mlSort.length < 1) && (props.category===perfume.category || "Unisex"===perfume.category)){
                            return  <div className="col-lg-4 col-md-6 col-sm-12" key={perfume.prodId}>
                                        <Link to={`/item/${perfume.prodId}`}> <Item perfume={perfume}/> </Link>
                                    </div>
                        }else if((props.category===perfume.category || "Unisex"===perfume.category) && (typeSort.length > 0 && mlSort.length < 1) && typeSort.includes(perfume.type.toString()) ){
                            return  <div className="col-lg-4 col-md-6 col-sm-12" key={perfume.prodId}>
                                        <Link to={`/item/${perfume.prodId}`}> <Item perfume={perfume}/> </Link>
                                    </div>
                        }else if((props.category===perfume.category || "Unisex"===perfume.category) && (mlSort.length > 0 && typeSort.length < 1) && mlSort.includes(perfume.ml.toString()) ){
                            return  <div className="col-lg-4 col-md-6 col-sm-12" key={perfume.prodId}>
                                        <Link to={`/item/${perfume.prodId}`}> <Item perfume={perfume}/> </Link>
                                    </div>
                        }else if((props.category===perfume.category || "Unisex"===perfume.category) && (typeSort.length > 0 && mlSort.length > 0) && (typeSort.includes(perfume.type.toString()) && mlSort.includes(perfume.ml.toString())) ){
                            return  <div className="col-lg-4 col-md-6 col-sm-12" key={perfume.prodId}>
                                        <Link to={`/item/${perfume.prodId}`}> <Item perfume={perfume}/> </Link>
                                    </div>
                        }else{
                            return null
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Category