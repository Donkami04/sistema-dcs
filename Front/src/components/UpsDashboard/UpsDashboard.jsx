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
      if (ups.status_prtg === 2) {
        enLinea++;
      } else if (ups.status_prtg === 3) {
        usandoBateria++;
      } else {
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
          <SectionDash>
            <h2>Estados</h2>
            <table className="kpi-table ups-table">
              <tbody>
                <tr>
                  <td>En línea</td>
                  <td>{enLineaCount}</td>
                </tr>
                <tr>
                  <td>Usando batería</td>
                  <td>{usandoBateriaCount}</td>
                </tr>
                <tr>
                  <td>Otro</td>
                  <td>{otroCount}</td>
                </tr>
              </tbody>
            </table>
          </SectionDash>
        </main>
      </div>
    </>
  );
}
