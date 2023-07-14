import "./upscard.css";

export function UpsCard({ ups }) {
  let statusText = "";
  let statusClassName = "";

  if (ups.status_ups === 3) {
    statusText = "Usando Bateria";
    statusClassName = "status-light yellow";
  } else if (ups.status_ups === 2) {
    statusText = "En linea";
    statusClassName = "status-light green";
  } else if (ups.status_ups !== 2 && ups.status_ups !==  3) {
    statusText = "Otro";
    statusClassName = "status-light red";
  }

  return (
    <div className="ups-card">
      <div className="ups-card-img">
        <img src="/ups.png" alt="imagens-ups" />
      </div>
      <div>
        <p className={statusClassName}></p>
        <p><span>IP UPS: </span><a href={`https://10.224.241.25/device.htm?id=${ups.id_ups}&tabid=1`} target='blank' >{ups.ip}</a></p>
        <p><span>Nombre: </span>{ups.name}</p>
        <p><span>Estado: </span>{statusText}</p>
        <p><span>Ubicación: </span>{ups.ubication}</p>
        <p><span>Uptime: </span>{ups.uptime}%</p>
      </div>
    </div>
  );  
}
