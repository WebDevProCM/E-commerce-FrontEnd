import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import './category.css';
import Item from '../productItem/item'
import allPerfumes from '../assets/perfumes.json'


const Category = (props) =>{
    return ( 
        <div className="category">
            <div className="sort-section">
                <h4>SORT-</h4>
                <div className="sort">
                    <label htmlFor="sortCheck">500ML</label>
                    <input type="checkbox" name="500" id="sortCheck"/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">250ML</label>
                    <input type="checkbox" name="250" id="sortCheck"/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">100ML</label>
                    <input type="checkbox" name="100" id="sortCheck"/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">50ML</label>
                    <input type="checkbox" name="50" id="sortCheck"/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Eau de Cologne</label>
                    <input type="checkbox" name="Cologne" id="sortCheck"/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Parfum</label>
                    <input type="checkbox" name="Parfum" id="sortCheck"/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Eau de Toilette</label>
                    <input type="checkbox" name="Toilette" id="sortCheck"/>
                </div>
                <div className="sort">
                    <label htmlFor="sortCheck">Eau Fraiche</label>
                    <input type="checkbox" name="Fraiche" id="sortCheck"/>
                </div>

            </div>
            <div className="items">
                <div className="row">
                    {allPerfumes.map((item) =>{
                        if(props.category===item.category){
                            return  <div className="col-lg-4 col-md-6 col-sm-12" key={Math.random()}>
                                        <Link to={`/item/${item.id}`}> <Item title={item.title} category={item.category} price={item.price}/> </Link>
                                    </div>
                        }else{
                            return null
                        }
                    })}
                    {/* <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div>
                    <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div>
                    <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div>
                    <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div>
                    <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div>
                    <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div>
                    <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div>
                    <div className="col-lg-4 col-md-6 col-sm-12"><Link to='/item'> <Item/> </Link></div> */}
                </div>
            </div>
        </div>
    )
}

export default Category