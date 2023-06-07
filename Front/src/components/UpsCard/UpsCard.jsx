import "./upscard.css";

export function UpsCard({ ups }) {
  let statusText = "";
  let statusClassName = "";

  if (ups.status_prtg === 1) {
    statusText = "Usando Bateria";
    statusClassName = "status-light yellow";
  } else if (ups.status_prtg === 2) {
    statusText = "En linea";
    statusClassName = "status-light green";
  } else if (ups.status_prtg === 3) {
    statusText = "Apagado";
    statusClassName = "status-light red";
  }

  return (
    <div className="ups-card">
      <div className="ups-card-img">
        <img src="/ups.png" alt="imagens-ups" />
      </div>
      <div>
        <p className={statusClassName}></p>
        <p><span>IP UPS: </span>{ups.ip}</p>
        <p><span>Nombre: </span>{ups.name}</p>
        <p>
          <span>Estado PRTG: </span>
          {statusText}
        </p>
        <p><span>IP Switch: </span>{ups.switch}</p>
      </div>
    </div>
  );
}
