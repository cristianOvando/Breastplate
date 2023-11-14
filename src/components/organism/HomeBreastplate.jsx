import React, { useContext, useState, useEffect } from "react";
import NavbarHome from "../atoms/NavbarHome";
import perfilMale from "../../assets/images/man.png";
import TokenContext from "../../contexts/TokenContext";
import perfilGirl from "../../assets/images/girl.png";
import FrameworkContext from "../../contexts/FrameworkContext";
import "../../assets/styles/HomeBreastplate.css";

function Home() {
  const {token, setToken} = useContext(TokenContext);
  const {framework, setFramework} = useContext(FrameworkContext);
  let perfilImg;

if (framework.sex === "male") {
  perfilImg = perfilMale;
  // console.log("Perfil masculino seleccionado");
  // console.log(framework.sex);

} else {
  perfilImg = perfilGirl;
  // console.log("Perfil femenino seleccionado");
  // console.log(framework.sex);
}


  // useEffect(() =>{
  //   console.log("este es el token:",token);
  // }, [token])

  return (
    <>
      <NavbarHome />
      <div>
        <div className="grafic-dashboard">
          <div className="grafic1"></div>
          <div className="grafic2"></div>
          <div className="dashboard">
            <div>
              <p className="perfile">Perfil</p>
            </div>
            <div>
              <img className="img-perfil" src={perfilImg} alt="Perfil"/>
              <p className="username">
                {framework.username ? `${framework.username}` : "Usuario no autenticado"}
              </p>
            </div>
            <div className="perfil-data">
              <div>
                <p className="text-data">Calorias</p>
                <p>100 kcal</p>
              </div>
              <div>
                <p className="text-data">Ritmo cardiaco</p>
                <p>100 ppm</p>
              </div>
              <div>
                <p className="text-data">Velocidad</p>
                <p>10 km/h</p>
              </div>
            </div>
            <div className="perfil-data">
              <div>
                <p className="text-data">Temperatura</p>
                <p>10 °C</p>
              </div>
              <div>
                <p className="text-data">Oxigenación en sangre</p>
                <p>95 SP02</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
