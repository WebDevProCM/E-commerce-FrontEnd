import React from 'react'
import classes from "./adminOrders.module.css";

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
                <img src={product.image} alt='product'/> :
                <img src={`/images/${product.image}.jpg`} alt='product'/>
            }
            
        </div>
    </div>
  )
}

export default OrderDetails