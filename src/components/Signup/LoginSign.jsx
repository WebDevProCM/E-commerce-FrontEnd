import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginSign.css'
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authActions";

const LoginSign = () =>{
    // const {setUser} = useContext(CurrentUserContext);
    const dispatch = useDispatch();
    let [signCheck, setSignCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const navigate =  useNavigate();

    const handleClick = (sign) =>{
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        if(!sign){
            return setSignCheck(true);
        }
        setSignCheck(false)
    }

    const formSubmitHandler = async (e) =>{
        try{
            e.preventDefault();
            if(signCheck){
                const url = `${process.env.REACT_APP_DOMAIN}/api/user`;
                if(signCheck && (password !== confirmPassword)){
                    return toast.error("Password and Confirm password are different")
                }

                const data = {name: name, email: email,password: password};

                const response = await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": true,      
                        "Access-Control-Allow-Headers": true, 
                        "Access-Control-Allow-Methods": true 
                    },
                    credentials: 'include',
                    withCredentials: true
                })

                const responseData = response.data;
                if(responseData.error){
                    return toast.error(responseData.error);
                }

                setSignCheck(false);
                return toast.success("Please Log In");
            }

            const data = {email: email,password: password};
            // setUser(responseData);
            dispatch(loginUser(data));
            navigate("/", window.scrollTo(0, 0))
        
        }catch(error){
            toast.error("Something went wrong!");
        }
    }
    return (
        <div className="login-body">
            <div className="login-left">
                <h5>True Elegance</h5>
                <p>Welcome!</p>
                <h4>{signCheck? "Sign Up" : "Login In"}</h4>
                <form onSubmit={formSubmitHandler}>
                    {signCheck ? (
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" 
                            placeholder="example" value={name} onChange={(e) =>{setName(e.target.value)}} required/>
                        </div>
                    ): ""}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" 
                            placeholder="example@gmail.com" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                        <div id="share" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" 
                            placeholder="example123" value={password} onChange={(e) =>{setPassword(e.target.value)}} required/>
                    </div>
                    {signCheck ? (
                    <div className="mb-3">
                        <label htmlFor="confirm" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm" name="confirm" 
                        placeholder="example123" value={confirmPassword} onChange={(e) =>{setConfirmPassword(e.target.value)}} required/>
                    </div>
                    ): ""}
                    <p className="create" onClick={() => handleClick(signCheck)}>{signCheck?"Have an account?" : "Create a account?"}</p>
                    <button type="submit" className="btn btn-light">{signCheck? "Sign Up " : "Log In"}</button>
                </form>
            </div>

            <div className="login-right">
                <img src={`/images/login image.png`} alt="shopping-cart" />
            </div>
        </div>
    )
}

export default LoginSign