import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css";

export const CreateFirewall = () => {
  const [dataFirewall, setDataFirewall] = useState({
    name: "",
    channel: "",
    ip: "",
    link: "",
    vdom: "",
    gateway: "",
    ubication: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataFirewall({
      ...dataFirewall,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_API_URL}/firewalls/new`,
        dataFirewall
      );
      setMensaje(response.data.message);
      setDataFirewall({
        name: "",
        channel: "",
        ip: "",
        link: "",
        vdom: "",
        gateway: "",
        ubication: "",
      });


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
        setMensaje("Error desconocido: ", error);
      }
    }
  };

  return (
      <div className="form-container">
        <h2 className="form-title">Registrar Firewall - Canal Internet</h2>
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
              value={dataFirewall.ip}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="name">
              Nombre:
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              name="name"
              value={dataFirewall.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="channel">
              Canal:
            </label>
            <input
              className="form-input"
              type="text"
              id="channel"
              name="channel"
              value={dataFirewall.channel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="link">
              Enlace:
            </label>
            <input
              className="form-input"
              type="text"
              id="link"
              name="link"
              value={dataFirewall.link}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="vdom">
              VDOM:
            </label>
            <input
              className="form-input"
              placeholder="N/A, root, Villa, Comunitario"
              type="text"
              id="vdom"
              name="vdom"
              value={dataFirewall.vdom}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="gateway">
              Gateway:
            </label>
            <input
              className="form-input"
              type="text"
              id="gateway"
              name="gateway"
              value={dataFirewall.gateway}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="ubication">
              Ubicación:
            </label>
            <input
              className="form-input"
              placeholder="corporate, community"
              type="text"
              id="ubication"
              name="ubication"
              value={dataFirewall.ubication}
              onChange={handleInputChange}
            />
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
