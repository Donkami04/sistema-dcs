 import React from "react";
import './navbar.css'

export function Navbar(props) {


  return (
    <nav className="navbar">
      <div className="logo">
        <img src="../../src/assets/candelaria.png" alt="Logo" />
      </div>
        <h1 className="main-title">{props.title}</h1>
    </nav>
  );
}

// import { useState, useEffect } from "react";
// import './navbar.css'

// export function Navbar(props) {
//   const [logoSrc, setLogoSrc] = useState("../../src/assets/candelaria.png");

//   useEffect(() => {
//     const handleResize = () => {
//       const newLogoSrc = window.innerWidth <= 935 ? "../../public/can.png" : "../../src/assets/candelaria.png";
//       setLogoSrc(newLogoSrc);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img src={logoSrc} alt="Logo" />
//       </div>
//       <h1 className="main-title">{props.title}</h1>
//     </nav>
//   );
// }
