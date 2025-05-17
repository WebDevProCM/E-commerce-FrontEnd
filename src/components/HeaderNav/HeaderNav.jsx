import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoCartOutline } from "react-icons/io5";
import {motion} from "framer-motion"
import { logoutUser } from "../../store/authActions";
import classes from './HeaderNav.module.css'
import { Dropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const HeaderNav = () =>{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const isAuth = useSelector((state) => state.auth.isAuthenicated);
    const cart = useSelector((state) => state.cart.quantity);
    const navigate = useNavigate();

    const checkAuth = async () =>{
        if(!isAuth){
            return toast.error("Please Log In");
        }
        return navigate("/cart")
    }

    const logoutHandler = async () =>{
        setLoading(true)
        dispatch(logoutUser());
        setLoading(false);
        return navigate("/", window.scrollTo(0, 0));
    }
 return(
    <Navbar collapseOnSelect expand="lg" className={`${classes.navbar}`}>
        <Container className={`${classes["container-fluid"]}`}>
            <Navbar.Brand className={`${classes["navbar-brand"]}`}>TrueElegance</Navbar.Brand>
            <Navbar.Toggle 
            as="div" 
            className={`${classes["navbar-toggler"]}`} 
            aria-controls="responsive-navbar-nav"
            >
            <span className={`navbar-toggler-icon`}></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={`${classes["navbar-nav"]} navbar-nav me-auto mb-2 mb-lg-0`}>
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
            </Nav>
            <div className={`${classes["nav-actions"]} nav-actions`}>
                <motion.button whileHover={{scale: 1.1}} onClick={() =>{checkAuth()}} className={classes["cart-count"]}>
                    {/* <span className="material-symbols-outlined">shopping_cart</span> */}
                    <IoCartOutline size={30}/>
                    <span>{cart}</span>
                </motion.button>
                
                {user?
                <Dropdown className={`${classes["dropdown"]}`}>
                    <Dropdown.Toggle 
                    as="div"
                    className={`${classes["dropdown-toggle"]}`} 
                    type="button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-autoclose-true dropdown-custom-components"
                    >
                        <motion.p
                        whileHover={{scale: 1.1}}
                        >
                            {user.name}
                        </motion.p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="div" className={`${classes["dropdown-menu"]}`}>
                        <Dropdown.Item><Link className={`${classes["dropdown-item"]} dropdown-item`} to={"/profile"}>Profile</Link></Dropdown.Item>
                        <Dropdown.Item><Link className={`${classes["dropdown-item"]} dropdown-item`} to={"/orders"}>My orders</Link></Dropdown.Item>
                        <Dropdown.Item>
                            <button className={`${classes["dropdown-item"]} dropdown-item`} disabled={loading} onClick={logoutHandler}>
                                Log Out
                                {loading && <div className="spinner-border spinner-border-sm text-secondary ms-1" role="status" />}
                            </button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                    : 
                <NavLink to='login' className={({ isActive  }) => (isActive  ? classes.active : "")}> 
                    <motion.p whileHover={{scale: 1.1}}>Sign in</motion.p> 
                </NavLink>  
                }
            </div>
            </Navbar.Collapse>
        </Container>
    </Navbar>
 )
}

export default HeaderNav