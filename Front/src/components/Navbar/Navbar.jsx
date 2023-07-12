import React from "react";
import { Link } from 'react-router-dom';
import "./navbar.css";

// const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

// let envi;
// if (ENVIRONMENT === "local") {
//   envi = "localhost";
// } else if (ENVIRONMENT === "development") {
//   envi = "10.224.116.78";
// } else if (ENVIRONMENT === "production") {
//   envi = "10.224.116.14";
// }

export function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/concentradora/dcs/home">
          <img src="/candelaria.png" alt="Logo" />
        </Link>
      </div>
        <Link to="/concentradora/dcs/home" className="home-link" style={{color:"white"}}>Home</Link>
      <h1 className="main-title">{props.title}</h1>
    </nav>
  );
}

