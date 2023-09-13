import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const CreateDevice = () => {
  const [dataDevice, setDataDevice] = useState({
    ip: "",
    type_device: "",
    site: "",
    dpto: "",
    red: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataDevice({
      ...dataDevice,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_API_URL}/devices/new`,
        dataDevice
      );
      setDataDevice({
        ip: "",
        type_device: "",
        site: "",
        dpto: "",
        red: "",
      });
      setMensaje(response.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error desconocido: " + error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registrar Dispositivo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label" htmlFor="ip">
            IP:
          </label>
          <input
            className="form-input"
            type="text"
            id="ip"
            name="ip"
            value={dataDevice.ip}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="type_device">
            Tipo de Dispositivo:
          </label>
          <input
            className="form-input"
            type="text"
            id="type_device"
            name="type_device"
            value={dataDevice.type_device}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="site">
            Sitio:
          </label>
          <input
            className="form-input"
            type="text"
            id="site"
            name="site"
            value={dataDevice.site}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="dpto">
            Departamento:
          </label>
          <input
            className="form-input"
            type="text"
            id="dpto"
            name="dpto"
            value={dataDevice.dpto}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="red">
            Red:
          </label>
          <select
            className="form-select"
            id="red"
            name="red"
            value={dataDevice.red}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="IT">IT</option>
            <option value="OT">OT</option>
          </select>
        </div>
        <div>
          <button type="submit" className="form-button">
            Enviar
          </button>
        </div>
      </form>
      <p className="form-message">{mensaje}</p>
    </div>
  );
};
