import { SectionDash } from "../SectionDash/SectionDash";
// import '../Dashboard/dashboard.css'
import './upsdashboard.css'

export function UpsDashboard() {
  return (
    <div className="ups-section">
      <main className="main-section">
        <SectionDash>
          <h2>Estados</h2>
          <table className="kpi-table">
            <tr>
              <td>En linea</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Usando bateria</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Apagado</td>
              <td>1</td>
            </tr>

          </table>
        </SectionDash>
      </main>
    </div>
  );
}
