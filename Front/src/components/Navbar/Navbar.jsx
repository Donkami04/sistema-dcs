 import React from "react";
import './navbar.css'

export function Navbar(props) {


  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/candelaria.png" alt="Logo" />
      </div>
        <h1 className="main-title">{props.title}</h1>
    </nav>
  );
};