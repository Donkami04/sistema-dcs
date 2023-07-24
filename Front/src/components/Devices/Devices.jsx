import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Status_System } from "../Status_System/Status_System";
import { getDevices } from "../../utils/Api-candelaria/api";
import { PRTG_URL, CISCO_URL_IT } from "../../utils/Api-candelaria/api";
import "./devices.css";

export function Devices() {
  const tableToShow = "devices";
  const title = "Dispositivos";
  const [devices, setDevices] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [filterDownPaused, setFilterDownPaused] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesList = await getDevices();
        setDevices(devicesList);
        setAllDevices(devicesList);
    
      } catch (error) {
        console.error(
          "DEVICES: Error al obtener el listado de Dispositivos: ",
          error
        );
        return error;
      }
    };
    fetchData();

  }, []);

  const [inputValue, setInputValue] = useState("");

  const filterDevices = (event) => {
    const keyword = event.target.value;
    const filteredData = allDevices.filter((obj) =>
      Object.values(obj).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setInputValue(keyword);
    setDevices(filteredData);
  };

  const renderRowCount = () => {
    const rowCount = devices.length;
    return (
      <div className="row-count" style={{ fontSize: "0.8rem" }}>
        Total de elementos: {rowCount}
      </div>
    );
  };

  const noElements = () => {
    if (devices.length === 0) {
      return (
        <tr>
          <td className="no-match" colSpan="14" style={{ fontSize: "13px" }}>
            No hay elementos
          </td>
        </tr>
      );
    }
    return null;
  };

  const handleCheckboxChange = (e) => {
    setFilterDownPaused(e.target.checked);
  };




  return (
    <>
      <Navbar title={title} />
      <Status_System tableToShow={tableToShow} />
      <input
        className="filtro filtro-devices"
        placeholder="Buscar..."
        type="text"
        value={inputValue}
        onChange={filterDevices}
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

      <div className="devices-container">
        <table>
          <thead>
            <tr>
              <th>HOST</th>
              <th>TYPE</th>
              <th>SITE</th>
              <th>DPTO</th>
              <th>PRTG DEVICE</th>
              <th>PRTG SENSOR</th>
              <th>PRTG STATUS</th>
              <th>PRTG LASTUP</th>
              <th>PRTG LASTDOWN</th>
              <th>CISCO IP</th>
              <th>CISCO SW NAME</th>
              <th>CISCO PUERTO</th>
              <th>CISCO ESTADO</th>
              <th>CISCO REACHABILITY</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              return (
                <tr key={device.id}>
                  <td>{device.host}</td>
                  <td>{device.type}</td>
                  <td>{device.site}</td>
                  <td>{device.dpto}</td>
                  <td>{device.prtg_name_device}</td>
                  <td>{device.prtg_sensorname}</td>
                  <td>
                    <a href={`${PRTG_URL}${device.prtg_id}`} target="_blank">
                      {device.prtg_status}
                    </a>
                  </td>
                  <td>{device.prtg_lastup}</td>
                  <td>{device.prtg_lastdown}</td>
                  <td>
                    {device.data_backup === "true"
                      ? `⚠️ ${device.cisco_device_ip}`
                      : device.cisco_device_ip}
                  </td>
                  <td
                    className={
                      device.cisco_status_device.includes("Up")
                        ? "kpi-green"
                        : device.cisco_status_device.includes("Down")
                        ? "kpi-red"
                        : device.cisco_status_device.includes("Paused")
                        ? "kpi-yellow"
                        : ""
                    }
                  >
                    {device.data_backup === "true"
                      ? `⚠️ ${device.cisco_device_name}`
                      : device.cisco_device_name}
                  </td>
                  <td>
                    <a
                      href={`${CISCO_URL_IT}${device.host}&forceLoad=true`}
                      target="_blank"
                    >
                      {device.data_backup === "true"
                        ? `⚠️ ${device.cisco_port}`
                        : device.cisco_port}
                    </a>
                  </td>
                  <td>
                    {device.data_backup === "true"
                      ? `⚠️ ${device.cisco_status}`
                      : device.cisco_status}
                  </td>
                  <td>
                    {device.data_backup === "true"
                        ? `⚠️ ${device.cisco_reachability}`
                        : device.cisco_reachability}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tbody>{noElements()}</tbody>
        </table>
        {renderRowCount()}
      </div>
    </>
  );
}
