import React, { useContext, useState, useEffect } from "react";
import io from 'socket.io-client';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format } from 'date-fns';
import NavbarHome from "../atoms/NavbarHome";
import perfilMale from "../../assets/images/man.png";
import Datasocket from "../atoms/Datasocket";
import TokenContext from "../../contexts/TokenContext";
import perfilGirl from "../../assets/images/girl.png";
import FrameworkContext from "../../contexts/FrameworkContext";
import "../../assets/styles/HomeBreastplate.css";

function Home() {
  const { framework } = useContext(FrameworkContext);
  const [temperaturaData, setTemperaturaData] = useState([]);
  const [ritmoCardiacoData, setRitmoCardiacoData] = useState([]);
  let perfilImg;

  if (framework.sex === "male") {
    perfilImg = perfilMale;
  } else {
    perfilImg = perfilGirl;
  }

  const [calories, setCalories] = useState(0);
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [averageTemperature, setAverageTemperature] = useState(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = Date.now();
      const temperatura = 36.5 + Math.random();
      const newCalories = calories + 0.5;

      setCurrentTemperature(temperatura);
      setCalories(newCalories);

      setTemperaturaData((prevData) => [
        ...prevData,
        { name: format(time, 'HH:mm:ss'), temperatura },
      ]);
    }, 15000);

    return () => clearInterval(intervalId);
  }, [calories]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = Date.now();
      const ritmoCardiaco = 70 + ((time / 60000) % 1) * 80;

      setRitmoCardiacoData((prevData) => [
        ...prevData,
        { name: format(time, 'HH:mm:ss'), ritmoCardiaco },
      ]);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect para calcular el promedio de temperatura cada 5 minutos
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (temperaturaData.length > 0) {
        const lastFiveMinutesData = temperaturaData.slice(-20); // Tomar los últimos 20 puntos (cada punto cada 15 segundos durante 5 minutos)
        const sum = lastFiveMinutesData.reduce((total, data) => total + data.temperatura, 0);
        const average = sum / lastFiveMinutesData.length;
        setAverageTemperature(average);
      }
    }, 300000); // 300000 milisegundos = 5 minutos

    return () => clearInterval(intervalId);
  }, [temperaturaData]);

  return (
    <>
      <NavbarHome />
      <div>
        <div className="grafic-dashboard">
          <div>
            <div className="div-grafic">
              <div>
              <BarChart width={560} height={350} data={temperaturaData}>
                  <XAxis
                    dataKey="name"
                    label={{ value: 'tiempo (s)', position: 'insideBottom', dy: 8, fontWeight: 'bold' }}
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
                  <Bar dataKey="temperatura" fill="#688DCE" />
                </BarChart>
              </div>
              <div>
              <LineChart width={560} height={350} data={ritmoCardiacoData}>
                  <XAxis
                    dataKey="name"
                    label={{ value: 'tiempo (min)', position: 'insideBottom', dy: 8, fontWeight: 'bold' }}
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
            <div className="card-data">
              <p className="porcent-text">Porcentaje de los últimos 30 minutos</p>
              <div className="card">
                <p>Temperatura </p>
                <p className="porcent">{`${averageTemperature.toFixed(1)}°C`}</p>
              </div>
              <div className="card">
                <p>Ritmo Cardiaco</p>
                <p className="porcent"></p>
              </div>
              <div className="card">
                <p>Calorías</p>
                <p className="porcent">{`${calories.toFixed(1)} kcal`}</p>
              </div>
            </div>
          </div>
            <div className="dashboard">
              <div>
                <p className="perfile">Perfil</p>
              </div>
              <div>
                <img className="img-perfil" src={perfilImg} alt="Perfil" />
                <p className="username">
                  {framework.username ? `${framework.username}` : "Usuario no autenticado"}
                </p>
              </div>
              <div className="perfil-data">
                <div>
                  <p className="text-data">Calorias</p>
                  <p>{calories.toFixed(1)} kcal</p>
                </div>
                <div>
                  <p className="text-data">Ritmo cardiaco</p>
                  <p>{`${ritmoCardiacoData.length > 0 ? ritmoCardiacoData[ritmoCardiacoData.length - 1].ritmoCardiaco.toFixed(0) : ''} BPM`}</p> 
                </div>
                <div>
                  <p className="text-data">Velocidad</p>
                  <p>10 km/h</p>
                </div>
                <div>
                  <p className="text-data">Temperatura</p>
                  <div className="datasocket">
                    <div><Datasocket/></div><div className="c">°C</div>
                  </div> 
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
