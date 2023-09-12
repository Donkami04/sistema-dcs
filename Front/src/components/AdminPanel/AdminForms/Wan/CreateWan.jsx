import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css"

export const CreateWan = () => {
  const [ip, setIp] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_API_URL}/wan/new`,
        {
          ip,
        }
      );
      setMensaje(response.data.message);
      setIp("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
        // Ahora puedes trabajar con el mensaje de error, por ejemplo, mostrarlo en la interfaz de usuario o tomar decisiones basadas en él.
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error desconocido: ", error);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Registrar WAN</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="ip">IP:</label>
            <input
              className="form-input"
              type="text"
              id="ip"
              value={ip}
              onChange={handleIpChange}
            />
          </div>
          <div>
            <button className="form-button" type="submit">
              Enviar
            </button>
          </div>
        </form>
        <p className="form-message">{mensaje}</p>
      </div>
    </>
  );
};
