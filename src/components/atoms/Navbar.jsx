import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import Logo from "../../assets/images/LogoBreastplate.png";
import UserContext from '../../contexts/UserContext';
import "../../assets/styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const { isUser, setUser } = useContext(UserContext);
    

    const handleNavigation = () => {
        navigate("/FormBreastplate"); 
    };

    const handlerClick = () =>{
        navigate("/Home");
    }

    return ( 
        <>
        {isUser ? (<>
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
        </>) : (<>
        </>)}
        <div>
            <div className="div-container-navbar">
                <div className="logo">
                    <div><img className='img-logo' src={Logo}/></div>
                    <div><p className='name-logo'>Breastplate</p></div>
                </div>
                <div>
                    <button className='btn-login' onClick={handlerClick}>Mis datos</button>
                </div>
            </div>
        </div>
        </>
     );
}

export default Navbar;