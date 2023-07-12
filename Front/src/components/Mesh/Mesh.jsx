import React, { useEffect, useState } from "react";
import { getMesh } from "../../utils/Api-candelaria/api";
import { Navbar } from "../Navbar/Navbar";
import { Status_System } from "../Status_System/Status_System";
import { Helmet } from 'react-helmet';
import "./mesh.css";

export function Mesh() {
  const [dataMesh, setDataMesh] = useState([]);
  const tableToShow = "mesh";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meshData = await getMesh();
        setDataMesh(meshData);
      } catch (error) {
        console.error("Error al obtener el listado de Ups:", error);
        return error;
      }
    };
    fetchData();
    console.log(dataMesh);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Mesh</title>
      </Helmet>
      <Navbar title={"Equipos Mesh Criticos"} />
      <Status_System tableToShow={tableToShow} />
      <main className="mesh-table-container">
        <table className="mesh-table">
          <thead>
            <tr>
              <th>IP Host</th>
              <th>Device</th>
              <th>Ping (PRTG) Avg 30 Minutos</th>
              <th>Niveles AP (WLC)</th>
              <th>Conectado a</th>
              <th>Dispatch</th>
            </tr>
          </thead>
          <tbody>
            {dataMesh &&
              dataMesh.map((device) => {
                let colorNivelSenal = "";
                let colorNivelSnr = "";
                let colorPacketLoss = "";
                const nivelSenal = Math.abs(parseInt(device.nivel_senal));

                if (nivelSenal >= 80) {
                  colorNivelSenal = "kpi-red";
                } else if (nivelSenal > 69 && nivelSenal <= 79) {
                  colorNivelSenal = "kpi-yellow";
                }

                if (device.snr !== "Not Found" || device.snr !== "N/A") {
                  const nivelSnr = device.snr;
                  if (nivelSnr <= 11) {
                    colorNivelSnr = "kpi-red";
                  } else if (nivelSnr > 11 && nivelSnr <= 19) {
                    colorNivelSnr = "kpi-yellow";
                  }
                }

                if (device.packet_loss !== "Not Found") {
                  let packetLoss = device.packet_loss;
                  packetLoss = parseInt(packetLoss, 10);
                  if (packetLoss > 2 && packetLoss < 5) {
                    colorPacketLoss = "kpi-yellow";
                  } else if (packetLoss >= 5) {
                    colorPacketLoss = "kpi-red";
                  }
                }

                return (
                  <tr key={device.id}>
                    <td>{device.ip}</td>
                    <td>{device.device}</td>
                    <td className="block-cell">
                      <p>
                        <span>Ping Avg: </span>
                        {device.ping_avg}
                      </p>
                      <p>
                        <span>Minimo: </span>
                        {device.minimo}
                      </p>
                      <p>
                        <span>Maximo: </span>
                        {device.maximo}
                      </p>
                      <p>
                        <span>Packet Loss: </span>
                        <span className={`mesh-valor ${colorPacketLoss}`}>
                        {device.packet_loss}
                        </span>
                      </p>
                      <p>
                        <span>LastValue: </span>
                        {device.lastvalue}
                      </p>
                      <p>
                        <span>LastUp: </span>
                        {device.lastup}
                      </p>
                      <p>
                        <span>LastDown: </span>
                        {device.lastdown}
                      </p>
                    </td>
                    <td className="block-cell">
                      <p>
                        <span>Nivel Señal: </span>
                        <span className={`mesh-valor ${colorNivelSenal}`}>
                          {device.nivel_senal}
                        </span>
                      </p>
                      <p>
                        <span>Ruido: </span>
                        {device.ruido_senal}
                      </p>
                      <p>
                        <span>Tiempo Conexión: </span>
                        {device.tiempo_conexion}
                      </p>
                    </td>
                    <td className="block-cell">
                      <p>
                        <span>Conectado a: </span>
                        {device.conectado_a}
                      </p>
                      <p>
                        <span>Nivel de SNR: </span>
                        <span className={`mesh-valor ${colorNivelSnr}`}>
                          {device.snr}
                        </span>
                      </p>
                    </td>
                    <td className="block-cell">
                      <p>
                        <span>Status Dispatch: </span>
                        {device.status_dispatch}
                      </p>
                      <p>
                        <span>Operador: </span>
                        {device.operador}
                      </p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
}