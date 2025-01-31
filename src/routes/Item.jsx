import React from "react";
import { useLoaderData} from "react-router-dom";
import classes from './css/itemPage.module.css'
import ProductSlides from "../components/ProductSlides/ProductSlides";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import ProductReview from "../components/ProductReview/ProductReview";
import apiClient from "../utilis/apiClient";


const Product = () =>{
    const perfume = useLoaderData();

    return(
        <div className={`${classes.product}`} style={{maxWidth:"1500px" , margin:"0 auto"}}>
            <nav aria-label="breadcrumb">
                <ol className={`breadcrumb`}>
                    <li className={`breadcrumb-item`}>Home</li>
                    <li className={`breadcrumb-item active`} aria-current="page">{perfume.category}</li>
                    <li className={`breadcrumb-item active`} aria-current="page">{perfume.name}</li>
                </ol>
            </nav>
            <section className={classes['product-body']}>
                <ProductSlides title={perfume.name} image={perfume.image}/>
                
                <ProductDescription perfume={perfume}/>
            </section>
            <ProductReview id={perfume._id}/>
        </div>
    )
}

export default Product

export async function loader({params}){
    try{
        const itemId = params.itemId;
        const response = await apiClient.get(`/api/product/${itemId}`);
        const item = response.data;
        if(item.error){
            throw new Error(item.error);
        }
        return item;
    }catch(error){
        if(error?.response?.data){
            throw new Error(error.response.data.error);
        }
        throw new Error(error);
    }
}