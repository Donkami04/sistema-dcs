import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

// const entornos = [
//   "http://localhost:4000/concentradora/dcs",
//   "http://10.224.116.78:4000/concentradora/dcs",
//   "http://10.224.116.14:4000/concentradora/dcs",
// ];

// const entorno = 'local'; //

// const selectEnv = () => {
//   if (entorno === 'local') {
//     return entornos[0];
//   } else if (entorno === 'desarrollo') {
//     return entornos[1];
//   } else if (entorno === 'produccion') {
//     return entornos[2];
//   }
// };

export function Button(props) {
  const pageRedirect = () => {
    if (props.buttonTag === "Clientes") {
      return "clients";
    } else {
      return "switches";
    }
  };

  return (
    <Link to={`/concentradora/dcs/${props.urlRedirect}`} className="button-interfaz">
      {props.buttonTag}
    </Link>
  );

  // return (
  //   <Link to={`${selectEnv()}/${pageRedirect()}`} className="button-interfaz">
  //     {props.buttonTag}
  //   </Link>
  // );
}
