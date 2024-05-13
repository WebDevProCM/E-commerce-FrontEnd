import React from "react";
import './footer.css'
import insta from '../assets/insta.png'
import facebook from '../assets/facebook.png'
import twitter from '../assets/twitter.png'

const Footer = () =>{
    return(
        <div className="footer">
            <div className="contact-us">
                <div className="title">
                    <h3>TrueElegance</h3>
                    <p>True elegance lives within heart</p>
                </div>
                <div className="marketing">
                    <p>Enter your email to subscribe our Newsletter</p>
                    <input type="text" name="email" id="email" placeholder="Enter your email address"/>
                    <button type="submit" class="btn btn-outline-dark">Submit</button>
                </div>
                <div className="follow-us">
                    <p>Follow Us</p>
                    <div className="social-link">
                        <img src={insta} alt="social link" style={{width:"12%"}}/>
                        <img src={facebook} alt="social link" style={{width:"11%"}}/>
                        <img src={twitter} alt="social link" style={{width:"9%"}}/>
                    </div>
                </div>
                <div className="call-us">
                    <p style={{fontWeight: "bold"}}>Call Us</p>
                    <p>+94 11 111 111</p>
                </div>
            </div>
            <div className="copyright">
                <span class="material-symbols-outlined">copyright</span><p>All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer