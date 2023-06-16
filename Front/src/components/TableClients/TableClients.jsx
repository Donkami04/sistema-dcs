import React, { useEffect, useState } from "react";
import { getClients } from "../../utils/Api-candelaria/api";
import { PRTG_URL, CISCO_URL } from "../../utils/Api-candelaria/api";
import "./TableClients.css";

export function TableClients() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDownPaused, setFilterDownPaused] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsList = await getClients();
        setClients(clientsList);
      } catch (error) {
        console.error("Error al obtener el listado de Clientes:", error);
        return error;
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (e) => {
    setFilterDownPaused(e.target.checked);
  };

  const filteredClients = clients.filter((client) => {
    const searchValues = Object.values(client)
      .map((value) => value.toString().toLowerCase())
      .join(" ");
    const hasDownPaused =
      searchValues.includes("down") || searchValues.includes("paused");
    return !filterDownPaused || (filterDownPaused && hasDownPaused);
  });

  const filteredSearchClients = filteredClients.filter((client) =>
    Object.values(client)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const renderTableBody = () => {
    if (filteredSearchClients.length === 0) {
      return (
        <tr>
          <td className="no-match" colSpan="11" style={{ fontSize: "13px" }}>
            No hay elementos
          </td>
        </tr>
      );
    }

    return filteredSearchClients.map((client) => (
      <tr key={client.ip+client.id}>
        <td>{client.name} {client.group}</td>
        <td>{client.description}</td>
        <td>{client.ip}</td>
        <td>
          <a href={`${PRTG_URL}${client.id_prtg}`} target="_blank">
            {client.status_prtg}
          </a>
        </td>
        <td>{client.lastup_prtg}</td>
        <td>{client.lastdown_prtg}</td>
        <td>{client.device_ip_cisco}</td>
        <td
          className={
            client.status_device_cisco.includes("Up")
              ? "kpi-green"
              : client.status_device_cisco.includes("Down")
              ? "kpi-red"
              : client.status_device_cisco.includes("Paused")
              ? "kpi-yellow"
              : ""
          }
        >
          {client.device_cisco}
        </td>

        <td>
          <a href={`${CISCO_URL}${client.ip}&forceLoad=true`} target="_blank">
            {client.port_cisco}
          </a>
        </td>
        <td>{client.status_cisco}</td>
        <td>{client.reachability_cisco}</td>
      </tr>
    ));
  };

  const renderRowCount = () => {
    const rowCount = filteredSearchClients.length;
    return (
      <div className="row-count" style={{ fontSize: "0.8rem" }}>
        Total de elementos: {rowCount}
      </div>
    );
  };
  
  return (
    <div className="table-container">
      <input
        className="filtro"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar..."
      />

      <label>
        <input
          className="checkbox-filter"
          type="checkbox"
          checked={filterDownPaused}
          onChange={handleCheckboxChange}
        />
        Down / Paused
      </label>

      <table>
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>DESCRIPCIÓN</th>
            <th>IP</th>
            <th>
              ESTADO
              <br />
              (PRTG)
            </th>
            <th>
              LAST UP
              <br />
              (PRTG)
            </th>
            <th>
              LAST DOWN
              <br />
              (PRTG)
            </th>
            <th>
              DEVICE IP ADDRESS
              <br />
              (CISCO)
            </th>
            <th>
              DEVICE NAME
              <br />
              (CISCO)
            </th>
            <th>
              PUERTO
              <br />
              (CISCO)
            </th>
            <th>
              ESTADO
              <br />
              (CISCO)
            </th>
            <th>
              REACHABILITY
              <br />
              (CISCO)
            </th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>

      {renderRowCount()}
    </div>
  );
}
