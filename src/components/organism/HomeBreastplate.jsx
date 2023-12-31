import React, { useContext, useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format } from 'date-fns';
import io from 'socket.io-client';
import NavbarHome from "../atoms/NavbarHome";
import perfilMale from "../../assets/images/man.png";
import perfilGirl from "../../assets/images/girl.png";
import FrameworkContext from "../../contexts/FrameworkContext";
import "../../assets/styles/HomeBreastplate.css";

function Home() {
  const { framework } = useContext(FrameworkContext);
  const [temperaturaData, setTemperaturaData] = useState([]);
  const [ritmoCardiacoData, setRitmoCardiacoData] = useState([]);
  let perfilImg;

  const [calories, setCalories] = useState(0);
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [oxygenation, setOxygenation] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [temperatureState, setTemperature] = useState(null);
  const [lastTemperature, setLastTemperature] = useState(null);
  const [socket, setSocket] = useState(null);
  

  if (framework.sex === "male") {
    perfilImg = perfilMale;
  } else {
    perfilImg = perfilGirl;
  }


  useEffect(() => {
    const newSocket = io('http://192.168.0.26:3000');
  
    newSocket.on("nuevos-datos", (data) => {
      console.log("Datos recibidos:", data);
  
      const currentTime = new Date();
  
      if (!isNaN(currentTime.getTime())) {

        const temperaturaDataItem = {
          name: format(currentTime, 'HH:mm:ss'),
          temperatura: data.temperature,
        };
  
        setTemperaturaData((prevData) => [
          ...prevData,
          temperaturaDataItem,
        ]);
  
        setTemperature(data);
  
        const heartRateDataItem = {
          name: format(currentTime, 'HH:mm:ss'),
          ritmoCardiaco: data.heartRate,
        };
  
        setRitmoCardiacoData((prevData) => [
          ...prevData,
          heartRateDataItem,
        ]);

        setSpeed(data.speed);
  
        setCalories((prevCalories) => prevCalories + data.calories);
  
        setOxygenation(data.oxygenation);
      } else {
        console.error("currentTime is not a valid Date object");
      }
    });
  
    setSocket(newSocket);
  
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  
  return (
    <>
      <NavbarHome />
      <div>
        <div className="grafic-dashboard">
          <div>
            <div className="div-grafic">
              <div>
              <BarChart className="BarChart" width={540} height={350} data={temperaturaData}>
                  <XAxis
                    dataKey="name"
                    label={{ value: 'tiempo (s)', position: 'insideBottom', dy: 8, fontWeight: 'bold' }}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    label={{ value: 'Temperatura (°C)', position: 'insideLeft', angle: -90, dy: 50, dx: 7, fontWeight: 'bold' }}
                    tick={{ fontSize: 10 }}
                    domain={[35, 40]}
                    ticks={[35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40]}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar dataKey="temperatura" fill="#688DCE" />
                </BarChart>
              </div>
              <div>
              <LineChart width={540} height={340} data={ritmoCardiacoData}>
                  <XAxis
                    dataKey="name"
                    label={{ value: 'tiempo (s)', position: 'insideBottom', dy: 8, fontWeight: 'bold' }}
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
              <p className="porcent-text">Promedio de los datos en los últimos 10 minutos</p>
              <div className="card">
                <p className="title">Temperatura </p>
                <p className="porcent">{currentTemperature.toFixed(1)} °C</p>
              </div>
              <div className="card">
                <p className="title">Ritmo Cardiaco</p>
                <p className="porcent">{`${ritmoCardiacoData.length > 0 ? ritmoCardiacoData[ritmoCardiacoData.length - 1].ritmoCardiaco.toFixed(0) : ''} BPM`}</p>
              </div>
              <div className="card">
                <p className="title">Calorías</p>
                <p className="porcent">{calories.toFixed(1)} kcal</p>
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
                <p className="porcent">{calories.toFixed(1)} kcal</p>
              </div>
              <div>
                <p className="text-data">Ritmo cardiaco</p>
                <p className="porcent">{`${ritmoCardiacoData.length > 0 ? ritmoCardiacoData[ritmoCardiacoData.length - 1].ritmoCardiaco.toFixed(0) : ''} BPM`}</p>
              </div>
              <div>
                <p className="text-data">Velocidad</p>
                <p className="porcent">{speed} km/h</p>
              </div>
              <div>
                <p className="text-data">Temperatura</p>
                <div>
                  <p className="porcent">{lastTemperature ? `${lastTemperature.toFixed(1)}` : ''} °C</p>
                </div>
              </div>
              <div>
                <p className="text-data">Oxigenación en sangre</p>
                <p className="porcent">{`${oxygenation}%`} SP02</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
