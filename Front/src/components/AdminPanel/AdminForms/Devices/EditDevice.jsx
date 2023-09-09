import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css";

export const EditDevice = () => {
  const [ip, setIp] = useState("");
  const [id, setId] = useState(0)
  const [dataDevice, setDataDevice] = useState({
    ip: "",
    type_device: "",
    site: "",
    dpto: "",
    red: ""
  
  });
  const [mensaje, setMensaje] = useState("");
  const [showEditFields, setShowEditFields] = useState(false);

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleGetDeviceInfo = async () => {
    if (ip.trim() === "") {
      setMensaje("Por favor, ingrese un IP de dispositivo válido.");
      setShowEditFields(false);
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_API_URL}/devices/${ip}`
      );

      const deviceData = response?.data?.data;
      const message = response?.data?.message;
      const currentId = response?.data?.data.id;

      if (deviceData) {
        setDataDevice(deviceData);
        setMensaje("");
        setShowEditFields(true);
        setId(currentId);
      } else {
        setMensaje(message);
        setShowEditFields(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
        setShowEditFields(false);
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error al obtener información: " + error.message);
        setShowEditFields(false);
      }
    }
  };

  const handleEditDevice = async (event) => {
    event.preventDefault();
  
    try {
      // Crear una copia de los datos del dispositivo sin el campo "id"
      const deviceDataWithoutId = { ...dataDevice };
      delete deviceDataWithoutId.id;
  
      const response = await axios.put(
        `${BASE_API_URL}/devices/edit/${id}`,
        deviceDataWithoutId
      );
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
        setMensaje("Error desconocido: " + error.message);
      }
    }
  };
  

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Editar Dispositivo</h2>
        <div>
          <label className="form-label" htmlFor="ip">Buscar por IP:</label>
          <input
            className="form-input"
            type="text"
            id="ip"
            value={ip}
            onChange={handleIpChange}
          />
          <button className="form-button search-button" onClick={handleGetDeviceInfo}>
            Buscar
          </button>
          <hr className="form-divider" /> 
        </div>
        {showEditFields && (
          <form onSubmit={handleEditDevice}>
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
                onChange={(e) => setDataDevice({ ...dataDevice, ip: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="type_device">
                Tipo de dispositivo:
              </label>
              <input
                className="form-input"
                type="text"
                id="type_device"
                name="type_device"
                value={dataDevice.type_device}
                onChange={(e) => setDataDevice({ ...dataDevice, type_device: e.target.value })}
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
                onChange={(e) => setDataDevice({ ...dataDevice, site: e.target.value })}
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
                onChange={(e) => setDataDevice({ ...dataDevice, dpto: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="red">
                Red:
              </label>
              <input
                className="form-input"
                type="text"
                id="red"
                name="red"
                value={dataDevice.red}
                onChange={(e) => setDataDevice({ ...dataDevice, red: e.target.value })}
              />
            </div>
            <div>
              <button className="form-button" type="submit">
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
        <p className="form-message">{mensaje}</p>
      </div>
    </>
  );
};
