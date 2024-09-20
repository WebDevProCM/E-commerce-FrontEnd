import React from 'react'
import classes from "./css/Orders.module.css"
import AllOrders from '../components/Orders/AllOrders'
import { useLoaderData, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

// const orders = [
//   {ordId: 1, orderDate: "2024/05/06", deliveryDate: "2024/06/01", totalAmount: 10000, status: "dispatched", customer: "dave", paid: "yes", products: [
//     {prodId: 123, image: "asdsad", quantity: 5, name: "silver", price: 50, total: 250}
//   ]}
// ]


function Orders() {
  const authState = useSelector((state) => state.auth);
  const orders = useLoaderData();
  const navigate = useNavigate();

  if(!authState.isAuthenicated){
    return navigate("/");
  }

  return (
    <main>
      <h1>My Orders</h1>      
      <div className={classes.OrdersContainer}>
        {orders.map((order) =>{
          return (<AllOrders key={order.ordId} order={order} />)
        })}
      </div>
    </main>
  )
}

export default Orders

export async function loader(){
  try{
    const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/order`, {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,      
          "Access-Control-Allow-Headers": true, 
          "Access-Control-Allow-Methods": true 
      },
      credentials: 'include',
      withCredentials: true});

    const data = response.data;
    if(data.error){
        throw new Error(data.error);
    }
    return data;

  }catch(error){
    throw new Error(error);
  }
}