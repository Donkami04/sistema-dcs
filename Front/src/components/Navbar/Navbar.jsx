import React from "react";
import "./navbar.css";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

let envi;
if (ENVIRONMENT === "local") {
  envi = "localhost";
} else if (ENVIRONMENT === "development") {
  envi = "10.224.116.78";
} else if (ENVIRONMENT === "production") {
  envi = "10.224.116.14";
}

export function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="http://10.224.116.78:4000/concentradora/dcs/home">
          <img src="/candelaria.png" alt="Logo" />
        </a>
      </div>
        <p className="home-link" ><a href="http://10.224.116.78:4000/concentradora/dcs/home" style={{color:"white"}}>Home</a></p>
      <h1 className="main-title">{props.title}</h1>
    </nav>
  );
}
