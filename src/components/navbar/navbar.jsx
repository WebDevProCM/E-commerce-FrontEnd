import React, { useState } from "react";
import './navbar.css'
import { Link } from "react-router-dom";

const Navbar = () =>{
    let [clicked, setClicked] = useState("");
 return(
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <div className="navbar-brand">TrueElegance</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to='/'>
                    <li className="nav-item">
                    <div className="nav-link" onClick={() =>{setClicked("home")}}>Home{clicked==="home"?<hr className="active-link"></hr>: ""} </div>
                    </li>
                </Link>
                <Link to='/mens'>
                    <li className="nav-item">
                    <div className="nav-link" onClick={() =>{setClicked("mens")}}>Mens{clicked==="mens"?<hr className="active-link"></hr>: ""}</div>
                    </li>
                </Link>
                <Link to='/womens'>
                    <li className="nav-item">
                    <div className="nav-link" onClick={() =>{setClicked("womens")}}>Womens{clicked==="womens"?<hr className="active-link"></hr>: ""}</div>
                    </li>
                </Link>
            </ul>
            <div className="nav-actions">
                <Link to='/cart'><span className="material-symbols-outlined" onClick={() =>{setClicked("cart")}}>shopping_cart {clicked==="cart"?<hr className="active-link"></hr>: ""}</span></Link>
                <Link to='login'><p onClick={() =>{setClicked("sign")}}>Sign in{clicked==="sign"?<hr className="active-link"></hr>: ""}</p></Link>
            </div>
            </div>
        </div>
    </nav>
 )
}

export default Navbar