//this route is not available

import React from 'react'
import classes from "./css/admin.module.css"
import { toast, ToastContainer } from 'react-toastify';
import { Form, NavLink, Outlet, redirect, useActionData } from 'react-router-dom';
import apiClient from '../utilis/apiClient';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaRegUserCircle } from "react-icons/fa";

function Admin() {
    const actionData = useActionData();
    //displaying error if user has provided invalid credentials
    if(actionData?.error){
        toast.error(actionData.error);
    }

  return (
    <div>
        <ToastContainer autoClose={2000}/>
        {/* <nav className={`navbar bg-body-tertiary`}>
            <div className={`container-fluid`}>
                <section className={`navbar-brand ${classes["admin-nav"]}`}>
                <img src="/images/perfume.png" alt="Logo" width="30" height="24" className={`d-inline-block align-text-top`} />
                    TrueElegance Admin Panel
                </section>
                <Form className={classes.adminLogoutForm} method='post'>
                    <button className="btn btn-outline-danger btn-sm admin-nav" type="submit">LOGOUT</button>
                </Form>
            </div>
        </nav> */}


        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand className="me-0">
                    <section className={`navbar-brand me-0 ${classes["admin-nav"]}`}>
                    <img src="/images/perfume.png" alt="Logo" width="30" height="24" className={`d-inline-block align-text-top`} />
                        TrueElegance Admin Panel
                    </section>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mx-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} aria-current="page" to="/admin/orders">Orders</NavLink>
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} to="/admin/customers">Customers</NavLink>
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} to="/admin/products">Products</NavLink>
                    <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link"} to="/admin/reviews">Reviews</NavLink>

                </Nav>
                </Navbar.Collapse>
                <Dropdown align="end">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <FaRegUserCircle />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                    <Form className={classes.adminLogoutForm} method='post'>
                        <button className="btn btn-outline-danger btn-sm admin-nav" type="submit">LOGOUT</button>
                    </Form>
                    </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
        <Outlet />
    </div>
  )
}

export async function loader(){
    try{
        const response = await apiClient.post("/api/admin/logged", {status: "admin verify"});
        const data = response.data;
        if(!data){
            return redirect("/admin/login");
        }

        return data;
    }catch(error){
        if(error?.response?.data){
            return error.response.data
        }
        return {error: error}
    }
}

export async function action(){
    try{
        const response = await apiClient.post("/api/admin/logout", {msg: "logout"});

        const data = response.data;

        if(data.success){
            return redirect("/admin/login");
        }
        
        return data;
  
    }catch(error){
        console.log(error)
        if(error?.response?.data){
            return error.response.data
        }
        return {error: "something went wrong"}
    }
}

export default Admin