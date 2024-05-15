import React from "react";
import './css/items.css'
import ProductSlides from "../components/productSlides/ProductSlides";
import ProductDescription from "../components/productDescription/ProductDescription";
import ProductReview from "../components/productReview/ProductReview";
import allPerfumes from '../components/assets/perfumes.json'
import { useParams } from "react-router-dom";

const Product = () =>{
    const {itemId} = useParams();
    const perfume = allPerfumes.filter((item) =>{
        return item.id == itemId
    })
    return(
        <div className="product">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
            </nav>
            <div className="product-body">
                <ProductSlides className="slides" title={perfume[0].title}/>
                
                <ProductDescription classNamed="details" title={perfume[0].title}
                description={perfume[0].description}
                price={perfume[0].price}
                oldprice=''
                category={perfume[0].category}
                />
             </div>
             <ProductReview/>
        </div>
    )
}

export default Product