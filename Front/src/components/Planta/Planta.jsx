import { Link } from "react-router-dom"
import "./planta.css";

export function Planta() {
  return (
    <div className="main-container">
      <section className="planta">
        <h2 className="nombre">Concentradora Candelaria</h2>
        <div className="kpi-container">
          <ul>
            <li>Overall : 100%</li>
            <li>Disponibilidad : 100%</li>
            <li>Infraestructura Solución : 100%</li>
            <li>Infraestructura General : 100%</li>
            <li>Estado del sistema : Sin Errores</li>
          </ul>
        </div>
          <p className="link">Ir al Sistema</p>
      </section>
    </div>
  );
}