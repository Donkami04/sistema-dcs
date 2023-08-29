import { useEffect, useState } from "react";
import { getIndicators } from "../../../utils/Api-candelaria/api";
import "./devicesdash.css"

export function DevicesDash() {
  const [indicatorsDevices, setIndicatorsDevices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const indicators = await getIndicators();
        setIndicatorsDevices(indicators.devices);
      } catch (error) {
        console.error(
          "Error al obtener el listado de indicadores MESH:",
          error
        );
      }
    };
    fetchData();
  }, []);

    // Obtén el nombre de la pestaña del navegador
    const currentTab = document.title; 

    // Determina el nombre de la clase de la tabla basado en la pestaña actual
    const tableClassName = currentTab === "Home" ? "devices-dash-table-home" : "devices-dash-table";
  
  return (
    <>
      <table className={tableClassName}>
        <thead>
          <tr>
            <th>DISPOSITIVOS</th>
            <th className="kpi-green">UP</th>
            <th className="kpi-red">DOWN</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>CAMARAS</td>
                <td>{indicatorsDevices && indicatorsDevices.numCamerasUp}</td>
                <td>{indicatorsDevices && indicatorsDevices.numCamerasDown}</td>
                <td>{indicatorsDevices && indicatorsDevices.numTotalCameras}</td>
            </tr>
            <tr>
                <td>AP</td>
                <td>{indicatorsDevices && indicatorsDevices.numApUp}</td>
                <td>{indicatorsDevices && indicatorsDevices.numApDown}</td>
                <td>{indicatorsDevices && indicatorsDevices.numTotalAp}</td>
            </tr>
            <tr>
                <td>OTROS</td>
                <td>{indicatorsDevices && indicatorsDevices.numOthersUp}</td>
                <td>{indicatorsDevices && indicatorsDevices.numOthersDown}</td>
                <td>{indicatorsDevices && indicatorsDevices.numTotalOthers}</td>
            </tr>
        </tbody>
      </table>
    </>
  );
}
