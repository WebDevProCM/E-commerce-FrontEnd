import React from "react";
import { useLoaderData} from "react-router-dom";
import axios from "axios";
import './css/items.css'
import ProductSlides from "../components/ProductSlides/ProductSlides";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import ProductReview from "../components/ProductReview/ProductReview";


const Product = () =>{
    const perfume = useLoaderData();

    return(
        <div className="product" style={{maxWidth:"1500px" , margin:"0 auto"}}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item active" aria-current="page">{perfume.category}</li>
                    <li className="breadcrumb-item active" aria-current="page">{perfume.name}</li>
                </ol>
            </nav>
            <div className="product-body">
                <ProductSlides className="slides" title={perfume.name} image={perfume.image}/>
                
                <ProductDescription classNamed="details" perfume={perfume}
                />
             </div>
             <ProductReview id={perfume._id}/>
        </div>
    )
}

export default Product

export async function loader({request, params}){
    try{
        const itemId = params.itemId;
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/product/${itemId}`,{
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,      
                "Access-Control-Allow-Headers": true, 
                "Access-Control-Allow-Methods": true 
            },
            credentials: 'include',
            withCredentials: true});
        const item = response.data;
        if(item.error){
            throw new Error(item.error);
        }
        return item;
    }catch(error){
        throw new Error(error);
    }
}