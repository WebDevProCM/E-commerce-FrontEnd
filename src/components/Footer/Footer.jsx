import React, { memo } from "react";
import { Link } from "react-router-dom";
import './Footer.css'
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

const Footer = memo(function Footer(){
    return(
        <div className="footer-main">
            <div className="footer">
                <div className="contact-us">
                    <div className="title">
                        <h3>TrueElegance</h3>
                        <p>True elegance lives within heart</p>
                    </div>
                    <div className="marketing">
                        <p>Enter your email to subscribe our Newsletter</p>
                        <input type="text" name="email" id="email" placeholder="Enter your email address"/>
                        <button type="submit" className="btn btn-outline-dark">Submit</button>
                    </div>
                    <div className="follow-us">
                        <p>Follow Us</p>
                        <div className="social-link">
                            <Link to="/"><CiInstagram size={27}/></Link>
                            <Link to="/"><CiFacebook size={27}/></Link>
                            <Link to="/"><CiTwitter size={27}/></Link>
                        </div>
                    </div>
                    <div className="call-us">
                        <p style={{fontWeight: "bold"}}>Call Us</p>
                        <p>+00 00 000 000</p>
                    </div>
                </div>
                <div className="copyright">
                    <span className="material-symbols-outlined">copyright</span><p>All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
})

export default Footer