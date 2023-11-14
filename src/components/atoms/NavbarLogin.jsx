import { useNavigate } from 'react-router-dom';
import React from 'react';
import Breturn from "../../assets/images/return.png" 
import "../../assets/styles/NavbarLogin.css";

function Navbar() {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/"); 
    };

    return ( 
        <>
        <div>
            <div>
              <img className='button-return' onClick={handleNavigation} src={Breturn}/>
          </div>
        </div>
        </>
     );
}

export default Navbar;