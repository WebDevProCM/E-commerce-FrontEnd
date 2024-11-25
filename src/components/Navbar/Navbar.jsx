import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoCartOutline } from "react-icons/io5";
import {motion} from "framer-motion"
import { logoutUser } from "../../store/authActions";
import classes from './Navbar.module.css'

const Navbar = () =>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuth = useSelector((state) => state.auth.isAuthenicated);
    const cart = useSelector((state) => state.cart.quantity);
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
    <nav className={`${classes.navbar} navbar navbar-expand-lg`}>
        <div className={`${classes["container-fluid"]} container-fluid`}>
            <div className={`${classes["navbar-brand"]} navbar-brand`}>TrueElegance</div>
            <button className={`${classes["navbar-toggler"]} navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`navbar-toggler-icon`}></span>
            </button>
            <div className={`collapse navbar-collapse`} id="navbarTogglerDemo02">
            <ul className={`${classes["navbar-nav"]} navbar-nav me-auto mb-2 mb-lg-0`}>
                <NavLink to="/" className={({ isActive  }) => (isActive  ? classes.active : "")}>
                    <motion.li whileHover={{scale: 1.1}} className={`${classes["nav-item"]} nav-item}`}>
                        Home
                    </motion.li>
                </NavLink >
                    {/* <Link to="/" className="nav-link" onClick={() =>{setClicked("home")}}>Home{clicked==="home"?<hr className="active-link"></hr>: ""} </Link> */}
                <NavLink to="/mens" className={({ isActive  }) => (isActive  ? classes.active : "")}>
                    <motion.li whileHover={{scale: 1.1}} className={`${classes["nav-item"]} nav-item`}>Mens</motion.li>
                </NavLink>
                <NavLink to="/womens" className={({ isActive  }) => (isActive  ? classes.active : "")}>
                    <motion.li whileHover={{scale: 1.1}} className={`${classes["nav-item"]} nav-item`}>Womens</motion.li>
                </NavLink>
            </ul>
            <div className={`${classes["nav-actions"]} nav-actions`}>
                <motion.button whileHover={{scale: 1.1}} onClick={() =>{checkAuth()}} className={classes["cart-count"]}>
                    {/* <span className="material-symbols-outlined">shopping_cart</span> */}
                    <IoCartOutline size={30}/>
                    <span>{cart}</span>
                </motion.button>
                
                {user?
                <div className={`${classes["dropdown"]} dropdown`}>
                    <button 
                    className={`${classes["dropdown-toggle"]} btn dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false"
    
                    >
                        <motion.p
                        whileHover={{scale: 1.1}}
                        >
                            {user.name}
                        </motion.p>
                    </button>
                    <ul className={`${classes["dropdown-menu"]} dropdown-menu`}>
                        <li><Link className={`${classes["dropdown-item"]} dropdown-item`} to={"/profile"}>Profile</Link></li>
                        <li><Link className={`${classes["dropdown-item"]} dropdown-item`} to={"/orders"}>My orders</Link></li>
                        <li><button className={`${classes["dropdown-item"]} dropdown-item`} onClick={logoutHandler}>Log Out</button></li>
                    </ul>
                </div>
                    : 
                <NavLink to='login' className={({ isActive  }) => (isActive  ? classes.active : "")}> 
                    <motion.p whileHover={{scale: 1.1}}>Sign in</motion.p> 
                </NavLink>  
                }
            </div>
            </div>
        </div>
    </nav>
 )
}

export default Navbar