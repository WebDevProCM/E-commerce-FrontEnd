import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import './category.css';
import Item from '../productItem/item'
// import allPerfumes from '../assets/perfumes.json'


const Category = (props) =>{
    const allPerfumes = useLoaderData();

    const [sort, setSort] = useState([]);

    const clickHandler = (e) =>{
        if(e.target.checked){
            return setSort((exstingSort) => [e.target.value, ...exstingSort])
        }
        if(!e.target.checked){
            let newSort = sort.filter((value) => value == !e.target.value);
            return setSort(newSort);
        }
    }

    return ( 
        <div className="category">
            <div className="sort-section">
                <h4>SORT-</h4>
                <div className="sort">
                    <label htmlFor="sortCheck">500ML</label>
                    <input type="checkbox" name="500" id="sortCheck" value='500' onChange={clickHandler}/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">250ML</label>
                    <input type="checkbox" name="250" id="sortCheck" value='250' onChange={clickHandler}/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">100ML</label>
                    <input type="checkbox" name="100" id="sortCheck" value='100' onChange={clickHandler}/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">50ML</label>
                    <input type="checkbox" name="50" id="sortCheck" value='50' onChange={clickHandler}/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Eau de Cologne</label>
                    <input type="checkbox" name="Cologne" id="sortCheck" value='eau de cologne' onClick={clickHandler}/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Parfum</label>
                    <input type="checkbox" name="Parfum" id="sortCheck"  value='parfume' onClick={clickHandler}/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Eau de Toilette</label>
                    <input type="checkbox" name="Toilette" id="sortCheck" value='eau de toilette'  onClick={clickHandler}/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Eau Fraiche</label>
                    <input type="checkbox" name="Fraiche" id="sortCheck" value='eau fraiche'  onClick={clickHandler}/>
                </div>

            </div>
            <div className="items">
                <div className="row">
                    {allPerfumes.map((perfume) =>{
                        if(sort.length < 1 && props.category===perfume.category){
                            return  <div className="col-lg-4 col-md-6 col-sm-12" key={perfume.prodId}>
                                        <Link to={`/item/${perfume.prodId}`}> <Item title={perfume.name} category={perfume.category} price={perfume.price} image='item1'/> </Link>
                                    </div>
                        }else if(props.category===perfume.category && (sort.includes(perfume.ml.toString()) || sort.includes(perfume.type))){
                            return  <div className="col-lg-4 col-md-6 col-sm-12" key={perfume.prodId}>
                                        <Link to={`/item/${perfume.prodId}`}> <Item title={perfume.name} category={perfume.category} price={perfume.price} image='item1'/> </Link>
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