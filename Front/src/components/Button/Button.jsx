import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

export function Button(props) {

  return (
    <Link to={`/concentradora/dcs/${props.urlRedirect}`} className="button-interfaz">
      {props.buttonTag}
    </Link>
  );

}
