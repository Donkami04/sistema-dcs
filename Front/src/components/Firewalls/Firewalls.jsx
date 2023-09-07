import { getFirewalls } from "../../utils/Api-candelaria/api";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Status_System } from "../Status_System/Status_System";
import { DashFirewalls } from "./DashFirewalls/DashFirewalls";
import "./firewalls.css";

export function Firewalls() {
  const [firewalls, setFirewalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDownPaused, setFilterDownPaused] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firewallsList = await getFirewalls();
        setFirewalls(firewallsList);
      } catch (error) {
        console.error("Error al obtener el listado de firewalls:", error);
        return error;
      }
    };
    fetchData();
  }, []);

  const renderTableBody = () => {
    if (firewalls.length === 0) {
      return (
        <tr>
          <td className="no-match" colSpan="14" style={{ fontSize: "13px" }}>
            No hay elementos
          </td>
        </tr>
      );
    }

    return firewalls.map((fw) => (
      <tr key={fw.id}>
        <td>{fw.fw}</td>
        <td>{fw.canal}</td>
        <td>{fw.state}</td>
        <td
          className={
            fw.packet_loss === "Not Found"
              ? ""
              : parseFloat(fw.packet_loss) > 5
              ? "kpi-red"
              : parseFloat(fw.packet_loss) >= 2 &&
                parseFloat(fw.packet_loss) <= 5
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.packet_loss === "Not Found" ? "Not Found" : fw.packet_loss + "%"}
        </td>
        <td
          className={
            fw.latency === "Not Found"
              ? ""
              : parseFloat(fw.latency) > 100
              ? "kpi-red"
              : parseFloat(fw.latency) >= 50 && parseFloat(fw.latency) <= 100
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.latency === "Not Found" ? "Not Found" : fw.latency + " ms"}
        </td>
        <td
        className={
          fw.jitter === "Not Found"
            ? ""
            : parseFloat(fw.jitter) > 30
            ? "kpi-red"
            : parseFloat(fw.jitter) >= 10 && parseFloat(fw.jitter) <= 30
            ? "kpi-yellow"
            : ""
        }
      >
        {fw.jitter === "Not Found" ? "Not Found" : fw.jitter + " ms"}
      </td>
        <td>{fw.failed_before}</td>
      </tr>
    ));
  };

  const renderRowCount = () => {
    const rowCount = firewalls.length;
    return (
      <div className="row-count" style={{ fontSize: "0.8rem" }}>
        Total de elementos: {rowCount}
      </div>
    );
  };

  return (
    <>
      <Navbar title={"Firewalls - Canales Internet"} />
      <Status_System tableToShow={"fw"} />
      <DashFirewalls />
      <div className="firewalls-container">
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>CANAL</th>
              <th>ESTADO</th>
              <th>PERDIDAS</th>
              <th>LATENCIA</th>
              <th>JITTER</th>
              <th>FALLO 24Hrs</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
        {renderRowCount()}
      </div>
    </>
  );
}
