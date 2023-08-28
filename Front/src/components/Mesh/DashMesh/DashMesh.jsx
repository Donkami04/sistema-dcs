import { useEffect, useState } from "react";
import { getIndicators } from "../../../utils/Api-candelaria/api";
import "./dashmesh.css";

export function DashMesh() {
  const [indicatorsMesh, setIndicatorsMesh] = useState(null); // Initialize with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const indicators = await getIndicators();
        setIndicatorsMesh(indicators.mesh); // Assuming indicators.mesh is the correct property
      } catch (error) {
        console.error("Error al obtener el listado de indicadores MESH:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="dash-mesh">
        <table>
          <thead>
            <tr>
              <th>DISPOSITIVO</th>
              <th>OPERANDO</th>
              <th className="kpi-mesh-green">OK</th>
              <th className="kpi-mesh-yellow">WARNING</th>
              <th className="kpi-mesh-red">FALLAS</th>
            </tr>
          </thead>
          <tbody>
            {indicatorsMesh ? (
              <>
                <tr>
                  <td>PALAS</td>
                  <td>{indicatorsMesh.palasStatus2}/{indicatorsMesh.palasTotales}</td>
                  <td>{indicatorsMesh.palasOk}</td>
                  <td>{indicatorsMesh.palasWarnings}</td>
                  <td>{indicatorsMesh.palasFailed}</td>
                </tr>
                <tr>
                  <td>CAEX</td>
                  <td>{indicatorsMesh.caexStatus2}/{indicatorsMesh.caexTotales}</td>
                  <td>{indicatorsMesh.caexOk}</td>
                  <td>{indicatorsMesh.caexWarnings}</td>
                  <td>{indicatorsMesh.caexFailed}</td>
                </tr>
                <tr>
                  <td>TOTAL</td>
                  <td>{indicatorsMesh.palasStatus2 + indicatorsMesh.caexStatus2}/{indicatorsMesh.caexTotales + indicatorsMesh.palasTotales}</td>
                  <td>{indicatorsMesh.palasOk + indicatorsMesh.caexOk}</td>
                  <td>{indicatorsMesh.palasWarnings + indicatorsMesh.caexWarnings}</td>
                  <td>{indicatorsMesh.palasFailed + indicatorsMesh.caexFailed}</td>
                </tr>
              </>
            ) : (
              <tr>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
