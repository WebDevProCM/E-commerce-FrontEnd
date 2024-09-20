import React from 'react'
import "./css/admin.css"
import { toast, ToastContainer } from 'react-toastify';
import { Form, NavLink, Outlet, redirect, useActionData } from 'react-router-dom';
import axios from 'axios';

function Admin() {
    const actionData = useActionData();
    if(actionData?.error){
        toast.error(actionData.error);
    }

  return (
    <div>
        <ToastContainer autoClose={2000}/>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <section className="navbar-brand admin-nav">
                <img src="/images/perfume.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    TrueElegance Admin Panel
                </section>
                <Form className='adminLogoutForm' method='post'>
                    <button className="btn btn-outline-danger btn-sm admin-nav" type="submit">LOGOUT</button>
                </Form>
            </div>
        </nav>
        <div className='adminNav'>
            <ul className="nav nav-tabs admin-nav" style={{justifyContent: "center"}}>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} aria-current="page" to="/admin/orders">Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} to="/admin/customers">Customers</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} to="/admin/products">Products</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} to="/admin/reviews">Reviews</NavLink>
                </li>
            </ul>
        </div>
        <Outlet />
    </div>
  )
}

export async function loader(){
    try{
        const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/admin/logged`, {status: "admin verify"}, {
            withCredentials: true
        })
        const data = response.data;
        if(!data){
            return redirect("/admin/login");
        }

        return data;
    }catch(error){
        return {error: error}
    }
}

export async function action(){
    try{
        const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/admin/logout`, {msg: "logout"},{
            withCredentials: true
        })

        const data = response.data;
        if(data.error){
            return data
        }

        if(data.success){
            return redirect("/admin/login");
        }
        
        return data;
  
    }catch(error){
        console.log(error)
        return {error: "something went wrong"}
    }
}

export default Admin