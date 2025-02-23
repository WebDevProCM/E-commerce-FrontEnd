import React from 'react'
import classes from "./adminOrders.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

function OrderDetails({product}) {
  return (
    <div className={classes.orderProducts}>
        <div className={classes.orderProductsDetails}>
            <p>PRODUCT ID: </p>
            <p>{product.prodId}</p>
        </div>
        <div className={classes.orderProductsDetails}>
            <p>NAME: </p>
            <p>{product.name}</p>
        </div>
        <div className={classes.orderProductsDetails}>
            <p>QUANTITY: </p>
            <p>{product.quantity}</p>
        </div>
        <div className={classes.orderProductsDetails}>
            <p>UNIT PRICE: </p>
            <p>${product.price}</p>
        </div>
        <div className={classes.orderProductsDetails}>
            <p>IMAGE: </p>
            {product.image.startsWith("https") ?
                <LazyLoadImage
                    src={product.image}
                    alt="product"
                    effect="opacity"
                    width="100%"
                    height="auto"
                />
                :
                <LazyLoadImage
                src={`/images/${product.image}.webp`}
                alt="product"
                effect="opacity"
                width="100%"
                height="auto"
                />
            }
            
        </div>
    </div>
  )
}

export default OrderDetails