import React from "react";
import "./navbar.css";

export function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="http://localhost:4000/concentradora/dcs/home">
          <img src="/candelaria.png" alt="Logo" />
        </a>
      </div>
      <h1 className="main-title">{props.title}</h1>
    </nav>
  );
}
