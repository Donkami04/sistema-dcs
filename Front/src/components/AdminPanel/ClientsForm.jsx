import React, { useState } from 'react';
import axios from 'axios';

export const DataClientForm = () => {
  const [dataClient, setDataClient] = useState({
    group: '',
    name: '',
    importancia: '',
    clave: 0,
    description: '',
    ip: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataClient({
      ...dataClient,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/candelaria/clients/new', dataClient);
      setMensaje(response.data.message);
      setDataClient({
        group: '',
        name: '',
        importancia: '',
        clave: 0,
        description: '',
        ip: '',
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
      } else {
        console.error("Error desconocido:", error);
        setMensaje('Error desconocido: ', error);
      }
    }
  };

  return (
    <div>
      <h2>Formulario para Crear DataClient</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="ip">IP:</label>
          <input
            type="text"
            id="ip"
            name="ip"
            value={dataClient.ip}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="group">Grupo:</label>
          <input
            type="text"
            id="group"
            name="group"
            value={dataClient.group}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={dataClient.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="importancia">Importancia:</label>
          <input
            type="text"
            id="importancia"
            name="importancia"
            value={dataClient.importancia}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="clave">Clave:</label>
          <input
            type="number"
            id="clave"
            name="clave"
            value={dataClient.clave}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={dataClient.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Crear DataClient</button>
        </div>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};
