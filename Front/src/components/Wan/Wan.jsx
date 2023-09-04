import { getWan } from "../../utils/Api-candelaria/api";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Status_System } from "../Status_System/Status_System";
import "./wan.css";

export function Wan() {
  const [wan, setWan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wanList = await getWan();
        setWan(wanList);
        console.log(wan);
      } catch (error) {
        console.error("Error al obtener el listado de WAN:", error);
        return error;
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar title={"WAN"} />
      <Status_System tableToShow={"wan"} />
      <table className="wan-table">
        <thead>
          <tr>
            <th>IP</th>
            <th>SENSOR</th>
            <th>UPTIME(%) MES ANTERIOR</th>
            <th>UPTIME(s) MES ANTERIOR</th>
            <th>DOWNTIME(%) MES ANTERIOR</th>
            <th>DOWNTIME(s) MES ANTERIOR</th>
            <th>UPTIME(%) MES ACTUAL</th>
            <th>UPTIME(%) HOY</th>
          </tr>
        </thead>
        <tbody>
          {wan &&
            wan.map((wan) => (
              <tr key={wan.id}>
                <td>{wan.ip}</td>
                <td>{wan.sensor}</td>
                <td
                  className={
                    wan.last_uptime_percent >= 99.85 ? "kpi-green" : "kpi-red"
                  }
                >
                  {wan.last_uptime_percent} %
                </td>
                <td>{wan.last_uptime_days}</td>
                <td>{wan.last_down_percent} %</td>
                <td>{wan.last_down_days}</td>
                <td
                  className={
                    wan.current_uptime_percent >= 99.85 ? "kpi-green" : "kpi-red"
                  }
                >
                  {wan.current_uptime_percent} %
                </td>
                <td className={
                    wan.today_uptime_percent >= 99.85 ? "kpi-green" : "kpi-red"
                  }>{wan.today_uptime_percent} %</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
