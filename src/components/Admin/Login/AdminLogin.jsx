import { Form, redirect, useActionData } from "react-router-dom";
import "./adminLogin.css"
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

function AdminLogin() {
    const data = useActionData();

    useEffect(() =>{
        if(data?.error){
            toast.error(data.error);
        }
    }, [data]);

  return (
    <div className='adminLogin'>
        <ToastContainer autoClose={2000}/>
        <div className='adminLoginBox'>
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
    
        const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/admin/login`, dataObject, {
            withCredentials: true
        })
    
        const data = response.data;
        if(data.error){
            return data;
        }
    
        return redirect("/admin/orders");

    }catch(error){
        return error;
    }

}

export async function loader(){
    try{
        const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/admin/logged`, {status: "admin verify"}, {
            withCredentials: true
        })
        const data = response.data;
        if(data){
            return redirect("/admin/orders");
        }
    
        return data;
    }catch(error){
        return {error: error}
    }
}

export default AdminLogin