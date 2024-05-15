import React, { useState } from "react";
import './loginSign.css'
import loginImage from '../assets/login image.png'

const LoginSign = () =>{
    let [signCheck, setSignCheck] = useState(false);
    const handleClick = (sign) =>{
        if(!sign){
            return setSignCheck(true);
        }
        setSignCheck(false)
    }
    return (
        <div className="login-body">
            <div className="login-left">
                <h5>Logo</h5>
                <p>Welcome!</p>
                <h4>{signCheck? "Sign Up" : "Login In"}</h4>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Fake@gmail.com"/>
                        <div id="share" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Fake123!"/>
                    </div>
                    {signCheck ? (
                    <div className="mb-3">
                        <label htmlFor="confirm" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm" name="confirm" placeholder="Fake123!"/>
                    </div>
                    ): ""}
                    <p className="create" onClick={() => handleClick(signCheck)}>{signCheck?"Have an account?" : "Create a account?"}</p>
                    <button type="submit" className="btn btn-light">{signCheck? "Sign Up " : "Log In"}</button>
                </form>
            </div>

            <div className="login-right">
                <img src={loginImage} alt="shopping-cart" />
            </div>
        </div>
    )
}

export default LoginSign