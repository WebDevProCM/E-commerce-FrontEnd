import React from "react";
import { useLoaderData} from "react-router-dom";
import axios from "axios";
import './css/items.css'
import ProductSlides from "../components/productSlides/ProductSlides";
import ProductDescription from "../components/productDescription/ProductDescription";
import ProductReview from "../components/productReview/ProductReview";


const Product = () =>{
    const perfume = useLoaderData();

    return(
        <div className="product">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item active" aria-current="page">{perfume.category}</li>
                    <li className="breadcrumb-item active" aria-current="page">{perfume.name}</li>
                </ol>
            </nav>
            <div className="product-body">
                <ProductSlides className="slides" title={perfume.name}/>
                
                <ProductDescription classNamed="details" perfume={perfume}
                />
             </div>
             <ProductReview id={perfume._id}/>
        </div>
    )
}

export default Product

export async function loader(data){
    try{
        const itemId = data.params.itemId;
        const response = await axios.get(`http://localhost:3000/api/product/${itemId}`,{withCredentials: true});
        const item = response.data;
        if(item.error){
            throw new Error(item.error);
        }
        return item;
    }catch(error){
        throw new Error(error);
    }
}