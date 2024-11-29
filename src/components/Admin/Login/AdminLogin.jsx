import { Form, redirect, useActionData } from "react-router-dom";
import classes from "./adminLogin.module.css"
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import apiClient from "../../../utilis/apiClient";

function AdminLogin() {
    const data = useActionData();

    useEffect(() =>{
        if(data?.error){
            toast.error(data.error);
        }
    }, [data]);

  return (
    <div className={classes.adminLogin}>
        <ToastContainer autoClose={2000}/>
        <div className={classes.adminLoginBox}>
            <h1>Admin Loginpage</h1>
            <Form method="post" encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name='email' type="email" id='email' className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name='password' type="password" id='password' className="form-control" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </Form>
        </div>
    </div>
  )
}

export async function action({request}){
    try{
        const formData = await request.formData();
        const dataObject = Object.fromEntries(formData);
        const response = await apiClient.post("/api/admin/login", dataObject);
    
        const data = response.data;
        if(data.error){
            return data;
        }
    
        return redirect("/admin/orders");

    }catch(error){
        if(error?.response?.data){
            return error?.response?.data
        }
        return error;
    }

}

export async function loader(){
    try{
        const response = await apiClient.post("/api/admin/logged", {status: "admin verify"});
        const data = response.data;
        if(data){
            return redirect("/admin/orders");
        }
    
        return data;
    }catch(error){
        if(error?.response?.data){
            return error.response.data
        }
        return error
    }
}

export default AdminLogin