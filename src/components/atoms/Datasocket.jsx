import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

function Datasocket() {
  const [temperatureState, setTemperature] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      const newSocket = io('http://localhost:3005');

      newSocket.on("nuevos-datos", (data) => {
          console.log('Datos recibidos desde el socket:', data);
          console.log(data);

          setTemperature(data);
      });

      setSocket(newSocket);

      return () => {
          newSocket.disconnect();
      };
  }, []);


  return (
    <>
      <p>{temperatureState}</p>
    </>
  );
}

export default Datasocket;
