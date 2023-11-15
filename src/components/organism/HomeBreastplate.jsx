import React, { useContext, useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import NavbarHome from "../atoms/NavbarHome";
import perfilMale from "../../assets/images/man.png";
import TokenContext from "../../contexts/TokenContext";
import perfilGirl from "../../assets/images/girl.png";
import FrameworkContext from "../../contexts/FrameworkContext";
import "../../assets/styles/HomeBreastplate.css";

function Home() {
  const {token, setToken} = useContext(TokenContext);
  const {framework, setFramework} = useContext(FrameworkContext);
  const [temperaturaData, setTemperaturaData] = useState([]);
  const [ritmoCardiacoData, setRitmoCardiacoData] = useState([]);
  let perfilImg;

if (framework.sex === "male") {
  perfilImg = perfilMale;
} else {
  perfilImg = perfilGirl;
}
useEffect(() => {
  const interval = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    const newTemperatura = Math.random() * 5 + 35; // Rango de 35 a 40 °C
    const newRitmoCardiaco = Math.random() * 170 + 60; // Rango de 60 a 230 bpm

    setTemperaturaData((prevData) => [
      ...prevData,
      { name: currentTime, temperatura: newTemperatura },
    ]);
    setRitmoCardiacoData((prevData) => [
      ...prevData,
      { name: currentTime, ritmoCardiaco: newRitmoCardiaco },
    ]);

    if (temperaturaData.length > 60) {
      setTemperaturaData(temperaturaData.slice(1));
      setRitmoCardiacoData(ritmoCardiacoData.slice(1));
    }
  }, 60000);

  return () => clearInterval(interval);
}, [temperaturaData, ritmoCardiacoData]);

  return (
    <>
      <NavbarHome />
      <div>
        <div className="grafic-dashboard">
        <div className="div-grafic">
          <div className="div-grafic-one">
            <BarChart width={560} height={350} data={temperaturaData}>
              <XAxis
                dataKey="name"
                label={{ value: 'Tiempo (t)', position: 'insideBottom', dy: 8, fontWeight: 'bold' }}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                label={{ value: 'Temperatura (°C)', position: 'insideLeft', angle: -90, dy: 50, dx: 7, fontWeight: 'bold' }}
                tick={{ fontSize: 11 }}
                domain={[35, 40]}
                ticks={[35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40]}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="temperatura" fill="#688DCE"/>
            </BarChart>
          </div>
          <div className="div-grafic-two">
            <LineChart width={560} height={350} data={ritmoCardiacoData}>
              <XAxis
                dataKey="name"
                label={{ value: 'Tiempo (t)', position: 'insideBottom', dy: 8, fontWeight: 'bold' }}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                label={{ value: 'BPM', position: 'insideLeft', angle: -90, dy: 22, dx: 7, fontWeight: 'bold' }}
                tick={{ fontSize: 11 }}
                domain={[60, 220]}
                ticks={[60, 80, 100, 120, 140, 160, 180, 200, 220]}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="ritmoCardiaco" stroke="#688DCE" />
            </LineChart>
          </div>
        </div>
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
