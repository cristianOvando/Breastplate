import { useNavigate } from 'react-router-dom';
import React from 'react';
import Logo from "../../assets/images/LogoBreastplate.png";
import "../../assets/styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/FormBreastplate"); 
    };

    return ( 
        <>
        <div>
            <div className="div-container-navbar">
                <div className="logo">
                    <div><img className='img-logo' src={Logo}/></div>
                    <div><p className='name-logo'>Breastplate</p></div>
                </div>
                <div>
                <button className='btn-login' onClick={handleNavigation}>Iniciar sesión</button>
                </div>
            </div>
        </div>
        </>
     );
}

export default Navbar;