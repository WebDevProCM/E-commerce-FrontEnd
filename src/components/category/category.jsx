import React from "react";
import './category.css';
import Item from '../productItem/item'

const Category = () =>{
    return (
        <div className="category-container">
            <div className="pages">
                <div className="pageNo">1</div>
                <div className="pageNo">2</div>
                <div className="pageNo">3</div>
            </div>
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
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                        <div className="col-lg-4 col-md-6 col-sm-12"><Item/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category