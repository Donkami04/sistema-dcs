import React, { useState } from 'react';
import axios from 'axios';

export const UpsForm = () => {
  const [ip, setIp] = useState('');
  const [ubication, setUbication] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleUbicationChange = (event) => {
    setUbication(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/api/v1/candelaria/ups/new', {
        ip,
        ubication,
      });
      setMensaje(response.data.message);
      setIp('');
      setUbication('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
        // Ahora puedes trabajar con el mensaje de error, por ejemplo, mostrarlo en la interfaz de usuario o tomar decisiones basadas en él.
      } else {
        console.error("Error desconocido:", error);
        setMensaje('Error desconocido: ', error);
      }
    }
  }

  return (
    <div>
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ip">IP:</label>
          <input
            type="text"
            id="ip"
            value={ip}
            onChange={handleIpChange}
          />
        </div>
        <div>
          <label htmlFor="ubication">Ubicación:</label>
          <input
            type="text"
            id="ubication"
            value={ubication}
            onChange={handleUbicationChange}
          />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

