import { useState, useEffect } from "react";
import { SectionDash } from "../SectionDash/SectionDash";
import { Status_System } from "../Status_System/Status_System";
import "./upsdashboard.css";

export function UpsDashboard({ allUps }) {
  const tableToShow = "ups";
  const [enLineaCount, setEnLineaCount] = useState(0);
  const [usandoBateriaCount, setUsandoBateriaCount] = useState(0);
  const [otroCount, setOtroCount] = useState(0);

  useEffect(() => {
    let enLinea = 0;
    let usandoBateria = 0;
    let otro = 0;

    
    allUps.forEach((ups) => {
      if (ups.status_ups === 2 && ups.status_prtg && !ups.status_prtg.includes('Paused')) {
        enLinea++;
      } else if (ups.status_ups === 3 && ups.status_prtg && !ups.status_prtg.includes('Paused')) {
        usandoBateria++;
      } else if (ups.status_ups !== 3 && ups.status_ups !== 2 && ups.status_prtg && !ups.status_prtg.includes('Paused')){
        otro++;
      }
    });

    setEnLineaCount(enLinea);
    setUsandoBateriaCount(usandoBateria);
    setOtroCount(otro);

  }, [allUps]);

  return (
    <>
      <Status_System tableToShow={tableToShow} />
      <div className="ups-section">
        <main className="main-section">
            <h2>Estados</h2>
            <table className="kpi-table ups-table">
              <tbody>
                <tr>
                  <td><p className="light-indicator green-light"></p>En línea</td>
                  <td>{enLineaCount}</td>
                </tr>
                <tr>
                  <td><p className="light-indicator yellow-light"></p>Usando batería</td>
                  <td>{usandoBateriaCount}</td>
                </tr>
                <tr>
                  <td><p className="light-indicator red-light"></p>Otro</td>
                  <td>{otroCount}</td>
                </tr>
              </tbody>
            </table>
        </main>
      </div>
    </>
  );
}
