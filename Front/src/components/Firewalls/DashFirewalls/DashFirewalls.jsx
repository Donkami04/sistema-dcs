import { useState, useEffect } from "react";
import { getIndicators } from "../../../utils/Api-candelaria/api";
import "./dashfirewalls.css";

export function DashFirewalls() {
  const [fwIndicators, setFwIndicators] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFirewalls = await getIndicators();
        setFwIndicators(dataFirewalls);
      } catch (error) {
        console.error("Error al obtener el listado de firewalls:", error);
      }
    };

    // Llamar a fetchData solo una vez cuando el componente se monta
    fetchData();
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez

  // Verificar que fwIndicators no sea nulo antes de acceder a sus propiedades
  const numFwAlive = fwIndicators ? fwIndicators.firewalls.numFwAlive : 'cargando...';
  const numFwDown = fwIndicators ? fwIndicators.firewalls.numFwDown : 'cargando...';
  const numFwTotal = fwIndicators ? fwIndicators.firewalls.totalFw : 'cargando...';

  const currentTab = document.title; 
  const tableClassName = currentTab === "Home" ? "fw-dash-table-home" : "fw-dash-table";

  return (
    <>
      <table className={tableClassName}>
        <thead>
          <tr>
            <th className="kpi-green">ALIVE</th>
            <th className="kpi-red">DOWN</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{numFwAlive}</td>
            <td>{numFwDown}</td>
            <td>{numFwTotal}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
