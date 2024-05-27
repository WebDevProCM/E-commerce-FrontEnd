import React, {useContext} from "react";
import { toast } from "react-toastify";
import { CurrentUserContext } from "../../routes/Layout";
import './Navbar.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () =>{
    const {user, setUser, cartCount, setCartCount} = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const logoutHandler = async () =>{
        try{
            const url = "http://localhost:3000/user/logout";
            const value = {name: "smack"};
            const response = await axios.post(url, value, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            const data = response.data;
            if(data.error){
                return toast.error(data.error);
            }
            setUser(undefined);
            setCartCount(0);
            toast.success("Logged out successfully");
            return navigate("/");
        }catch(error){
            toast.error("Something went wrong!");
        }
    }
    const checkAuth = async () =>{
        if(!user){
            return toast.error("Please Log In");
        }
        return navigate("/cart")
    }

 return(
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <div className="navbar-brand">TrueElegance</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink to="/" >
                    <li className="nav-item">Home</li>
                </NavLink>
                    {/* <Link to="/" className="nav-link" onClick={() =>{setClicked("home")}}>Home{clicked==="home"?<hr className="active-link"></hr>: ""} </Link> */}
                <NavLink to="/mens" >
                    <li className="nav-item">Mens</li>
                </NavLink>
                <NavLink to="/womens" >
                    <li className="nav-item">Womens</li>
                </NavLink>
            </ul>
            <div className="nav-actions">
                <button onClick={() =>{checkAuth()}} className="cart-count">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <span>{cartCount}</span>
                </button>
                
                {user?
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <p>{user.name}</p>
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={"/profile"}>Profile</Link></li>
                        <li><button className="dropdown-item" onClick={logoutHandler}>Log Out</button></li>
                    </ul>
                </div>
                    : 
                <NavLink to='login'> <p>Sign in</p> </NavLink> 
                /* {clicked==="sign"?<hr className="active-link"></hr>: ""} */   
                }
            </div>
            </div>
        </div>
    </nav>
 )
}

export default Navbar