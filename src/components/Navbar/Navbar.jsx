import React from "react";
import { toast } from "react-toastify";
import './Navbar.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import {motion} from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authActions";

const Navbar = () =>{
    // const {user, setUser, cartCount, setCartCount} = useContext(CurrentUserContext);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuth = useSelector((state) => state.auth.isAuthenicated);
    const cart = useSelector((state) => state.cart.quantity);
    // const {cartCount, setCartCount} = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const logoutHandler = async () =>{
        dispatch(logoutUser());
        return navigate("/", window.scrollTo(0, 0));
    }
    const checkAuth = async () =>{
        if(!isAuth){
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
                    <motion.li whileHover={{scale: 1.1}} className="nav-item">Home</motion.li>
                </NavLink>
                    {/* <Link to="/" className="nav-link" onClick={() =>{setClicked("home")}}>Home{clicked==="home"?<hr className="active-link"></hr>: ""} </Link> */}
                <NavLink to="/mens" >
                    <motion.li whileHover={{scale: 1.1}} className="nav-item">Mens</motion.li>
                </NavLink>
                <NavLink to="/womens" >
                    <motion.li whileHover={{scale: 1.1}} className="nav-item">Womens</motion.li>
                </NavLink>
            </ul>
            <div className="nav-actions">
                <motion.button whileHover={{scale: 1.1}} onClick={() =>{checkAuth()}} className="cart-count">
                    {/* <span className="material-symbols-outlined">shopping_cart</span> */}
                    <IoCartOutline size={30}/>
                    <span>{cart}</span>
                </motion.button>
                
                {user?
                <div className="dropdown">
                    <button 
                    className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
    
                    >
                        <motion.p
                        whileHover={{scale: 1.1}}
                        >
                            {user.name}
                        </motion.p>
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={"/profile"}>Profile</Link></li>
                        <li><Link className="dropdown-item" to={"/orders"}>My orders</Link></li>
                        <li><button className="dropdown-item" onClick={logoutHandler}>Log Out</button></li>
                    </ul>
                </div>
                    : 
                <NavLink to='login'> <motion.p whileHover={{scale: 1.1}}>Sign in</motion.p> </NavLink> 
                /* {clicked==="sign"?<hr className="active-link"></hr>: ""} */   
                }
            </div>
            </div>
        </div>
    </nav>
 )
}

export default Navbar