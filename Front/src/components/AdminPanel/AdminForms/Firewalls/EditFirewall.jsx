import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const EditFirewall = () => {
  const [ip, setIp] = useState("");
  const [id, setId] = useState(0);
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
  const [showEditFields, setShowEditFields] = useState(false);

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleGetFirewallInfo = async () => {
    if (ip.trim() === "") {
      setMensaje("Por favor, ingrese un IP de firewall válido.");
      setShowEditFields(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_API_URL}/firewalls/${ip}`);

      const firewallData = response?.data?.data;
      const message = response?.data?.message;
      const currentId = response?.data?.data.id;

      if (firewallData) {
        setDataFirewall(firewallData);
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

  const handleEditFirewall = async (event) => {
    event.preventDefault();

    try {
      // Crear una copia de los datos del firewalle sin el campo "id"
      const firewallDataWithoutId = { ...dataFirewall };
      delete firewallDataWithoutId.id;

      const response = await axios.put(
        `${BASE_API_URL}/firewalls/edit/${id}`,
        firewallDataWithoutId
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
        <h2 className="form-title">Editar Firewall - Canales Internet</h2>
        <div>
          <label className="form-label" htmlFor="ip">
            Buscar por IP:
          </label>
          <input
            className="form-input"
            type="text"
            id="ip"
            value={ip}
            onChange={handleIpChange}
          />
          <button
            className="form-button search-button"
            onClick={handleGetFirewallInfo}
          >
            Buscar
          </button>
          <hr className="form-divider" />
        </div>
        {showEditFields && (
          <form onSubmit={handleEditFirewall}>
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
                onChange={(e) =>
                  setDataFirewall({ ...dataFirewall, ip: e.target.value })
                }
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
                onChange={(e) =>
                  setDataFirewall({ ...dataFirewall, name: e.target.value })
                }
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
                onChange={(e) =>
                  setDataFirewall({ ...dataFirewall, channel: e.target.value })
                }
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
                onChange={(e) =>
                  setDataFirewall({ ...dataFirewall, link: e.target.value })
                }
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
                onChange={(e) =>
                  setDataFirewall({ ...dataFirewall, vdom: e.target.value })
                }
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
                onChange={(e) =>
                  setDataFirewall({ ...dataFirewall, gateway: e.target.value })
                }
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
                onChange={(e) =>
                  setDataFirewall({
                    ...dataFirewall,
                    ubication: e.target.value,
                  })
                }
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
