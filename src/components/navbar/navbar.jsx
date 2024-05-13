import React from "react";
import './navbar.css'

const Navbar = () =>{
 return(
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <div className="navbar-brand">TrueElegance</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <div className="nav-link" aria-current="page">Home</div>
                </li>
                <li className="nav-item">
                <div className="nav-link">Mens</div>
                </li>
                <li className="nav-item">
                <div className="nav-link" aria-disabled="true">Womens</div>
                </li>
            </ul>
            <div className="nav-actions">
                <span className="material-symbols-outlined">shopping_cart </span>
                <p>Sign in</p>
            </div>
            </div>
        </div>
    </nav>
 )
}

export default Navbar