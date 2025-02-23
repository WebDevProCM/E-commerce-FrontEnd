import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './loginSign.module.css'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authActions";
import apiClient from "../../utilis/apiClient";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const LoginSign = () =>{
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isAuthenicated);
    const [loading, setLoading] = useState(false);
    const navigate =  useNavigate();

    let [signCheck, setSignCheck] = useState(false);

    useEffect(() =>{
        if(isLogin){
            return navigate("/", window.scrollTo(0, 0));
        }
    }, [isLogin]);

    //toggle between login and signup form
    const handleClick = (sign) =>{
        if(!sign){
            return setSignCheck(true);
        }
        setSignCheck(false)
    }

    //handling form submission
    const formSubmitHandler = async (e) =>{
        setLoading(true);
        try{
            e.preventDefault();
            //getting form inputs elements values
            const fs = new FormData(e.target);
            const fsArray = fs.entries();
            const formFields = Object.fromEntries(fsArray);

            if(signCheck){
                const url = "/api/user";
                if(signCheck && (formFields.password !== formFields.confirm)){
                    return toast.error("Password and Confirm password are different")
                }

                const data = {name: formFields.name, email: formFields.email, password: formFields.password};

                const response = await apiClient.post(url, data);

                const responseData = response.data;
                if(responseData.error){
                    return toast.error(responseData.error);
                }

                e.target.reset();
                setLoading(false)
                setSignCheck(false);
                return toast.success("Please Log In");
            }

            const data = {email: formFields.email, password: formFields.password};
            setLoading(false)
            dispatch(loginUser(data));
        
        }catch(error){
            setLoading(false);
            if(error?.response?.data){
                return toast.error(error.response.data.error);
            }
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className={classes["login-body"]}>
            <div className={classes["login-left"]}>
                <h5>True Elegance</h5>
                <p>Welcome!</p>
                <h4>{signCheck? "Sign Up" : "Login In"}</h4>
                <form onSubmit={formSubmitHandler}>
                    {signCheck ? (
                        <div className={`mb-3`}>
                            <label htmlFor="name" className={`form-label`}>Name</label>
                            <input type="text" className={`form-control`} id="name" name="name" placeholder="example" required/>
                        </div>
                    ): ""}
                    <div className={`mb-3`}>
                        <label htmlFor="email" className={`form-label`}>Email address</label>
                        <input type="email" className={`form-control`} id="email" name="email" placeholder="example@gmail.com" required/>
                        <div id="share" className={`form-text`}>We'll never share your email with anyone else.</div>
                    </div>
                    <div className={`mb-3`}>
                        <label htmlFor="password" className={`form-label`}>Password</label>
                        <input type="password" className={`form-control`} id="password" name="password" placeholder="example123" required/>
                    </div>
                    {signCheck ? (
                    <div className={`mb-3`}>
                        <label htmlFor="confirm" className={`form-label`}>Confirm Password</label>
                        <input type="password" className={`form-control`} id="confirm" name="confirm" placeholder="example123" required/>
                    </div>
                    ): ""}
                    <p className={classes.create} onClick={() => handleClick(signCheck)}>{signCheck?"Have an account?" : "Create a account?"}</p>
                    <button type="submit" className={`btn btn-light`} disabled={loading}>
                        {signCheck? "Sign Up " : "Log In"}
                        {loading && <div className="spinner-border spinner-border-sm text-secondary ms-1" role="status" />}
                    </button>
                </form>
            </div>

            <div className={classes["login-right"]}>
                {/* <img src={`/images/login image.webp`} alt="shopping-cart" /> */}
                <LazyLoadImage
                    src={`/images/login image.webp`}
                    alt="shopping-cart"
                    effect="opacity"
                    width="100%"
                    height="auto"
                />
            </div>
        </div>
    )
}

export default LoginSign