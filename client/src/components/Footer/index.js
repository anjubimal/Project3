import React from 'react'
import './style.css'

const Footer = () => {
    return (
        <div id="footer-div">
            <h3>Contact us:</h3>
            <div id="footer-contact-info">
                <span className="footer-contact">512-555-5555</span>
                <a href="mailto:example@example.com" id="footer-email"><span className="footer-contact">example@example.com</span></a>
            </div>
            
        </div>
    )
}

export default Footer
