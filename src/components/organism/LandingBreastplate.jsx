import { useNavigate } from 'react-router-dom';
import React from 'react';
import product from "../../assets/images/Product.png"
import exercise from "../../assets/images/Exercise.png";
import pulse from "../../assets/images/Pulse.png";
import temperature from "../../assets/images/Temperature.png"
import calories from "../../assets/images/Calories.png";
import Running from "../../assets/images/running.png";
import Login from "../../assets/images/UserLogin.png";
import "../../assets/styles/LandingPage.css";
import Navbar from '../atoms/Navbar';
import Footer from '../atoms/Footer';


function projectBreastplate() {

  const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/FormBreastplate"); 
    };
 
  return (
    <>
     <Navbar/>     
     <div>
        <div className='radonm-data'> 
          <div>
            <p className='text-information'>Sabías que correr a un ritmo moderado durante 30 minutos puede quemar alrededor de 240 a 300 calorías, dependiendo de factores como el peso corporal y el metabolismo individual. </p>
            <p className='text-information-black'>"Así que la próxima vez que salgas a correr, estarás haciendo un gran trabajo tanto para tu estado físico como para tu gasto calórico"</p>
          </div>
          
            <div>
              <img className='running' src={Running}/>
            </div>
        </div>
      <div className='div-product'>
          <div>
            <img  className="img-product" src={product} />
          </div>
          <div className='div-information'>
            <p className='ask'>¿QUE ES BREASTPLATE?</p>
            <p className='answer'>Es una herramienta de alta calidad con la capacidad de medir datos vitales en tiempo real que son controlados, distribuidos de manera que los datos puedan ser visualizados de manera facil para nuestros usuarios.</p>
          </div>
      </div>
          <div className='div-container-text'>
            <p><span class="highlight">BREASTPLATE</span> capaz de medir tu rendimiento físico</p>
          </div>
            <div className='div-specs-container'>
                <div>
                  <img src={exercise} alt="specs1"/>
                  <h4>Velocidad</h4>
                  <p>Velocidad en tiempo real</p>
                </div>
                <div>
                  <img src={temperature} alt="specs2"/>
                  <h4>Temperatura</h4>
                  <p>Temperatura corporal al momento</p>
                </div>  
                <div>
                  <img src={pulse} alt="specs3"/>
                  <h4>Ritmo Cardiaco</h4>
                  <p>Ritmo cardiaco al instante</p>
                </div>
                <div>
                  <img src={calories} alt="specs5"/>
                  <h4>Calorías</h4>
                  <p>Calorías quemadas durante el uso</p>
                </div>
            </div>
            <div className='redirectLogin'>
              <div>
                <img className="userlogin" src={Login}/>
              </div>
              <div className='div-login'>
                <div><p className='text-login'>Que esperas para ser parte de breastplate</p></div>
                <div><button className='btn-login-user' onClick={handleNavigation}>Iniciar sesión</button></div>
              </div>
            </div>
          <Footer/>
      </div>
    </>
     );
}

export default projectBreastplate;