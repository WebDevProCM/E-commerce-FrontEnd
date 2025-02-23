import React from 'react'
import classes from "./css/Orders.module.css"
import AllOrders from '../components/Orders/AllOrders'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import apiClient from '../utilis/apiClient'

function Orders() {
  const authState = useSelector((state) => state.auth);
  const orders = useLoaderData();
  const navigate = useNavigate();

  //checking user authenticated status
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
    const response = await apiClient.get("/api/order");

    const data = response.data;
    if(data.error){
        throw new Error(data.error);
    }
    return data;

  }catch(error){
    if(error?.response?.data){
      throw new Error(error.response.data.error);
    }
    throw new Error(error);
  }
}