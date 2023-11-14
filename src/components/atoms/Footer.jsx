import React from 'react';
import logo from '../../assets/images/LogoBreastplate.png'
import facebook from '../../assets/images/Facebook.png'
import instagram from '../../assets/images/Instagram.png'
import x from '../../assets/images/TwitterX.png'
import "../../assets/styles/Footer.css"

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo de la empresa" />
        </div>
        <div>
          <p className="footer-text">© 2023 SkySoft</p>
        </div>
        <div className="footer-social">
          <div>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img className='icon1' src={facebook} alt="Facebook" />
            </a>
          </div>
          <div>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img className='icon2' src={instagram} alt="Instagram" />
            </a>
          </div>
          <div>
            <a href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZXMifQ%3D%3D%22%7D" target="_blank" rel="noopener noreferrer">
              <img className='icon3' src={x} alt="Link X" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
