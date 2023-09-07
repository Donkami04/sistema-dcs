import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Dcs } from "./components/Dcs/Dcs";
import { Switches } from "./components/Dcs-switches/DcsSwitches";
import { Ups } from "./components/Ups/Ups";
import { Vpn } from "./components/Vpn/Vpn";
import { Mesh } from "./components/Mesh/Mesh";
import { Devices } from "./components/Devices/Devices";
import { Helmet } from "react-helmet";
import { Firewalls } from "./components/Firewalls/Firewalls";
import { Wan } from "./components/Wan/Wan";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./app.css";

function getPageTitle(pathname) {
  switch (pathname) {
    case "/monitoreo/candelaria/clients":
      return "Clientes Candelaria";
    case "/monitoreo/candelaria/switches":
      return "Switches Candelaria";
    case "/monitoreo/vpn":
      return "VPN";
    case "/monitoreo/home":
      return "Home";
    case "/monitoreo/ups":
      return "UPS";
    case "/monitoreo/candelaria/mesh":
      return "Mesh Candelaria";
    case "/monitoreo/devices":
      return "Dispositivos";
    case "/monitoreo/firewalls":
      return "Firewalls";
    case "/monitoreo/wan":
      return "WAN";
    default:
      return "Sistema de Monitoreo";
  }
}

function App() {
  const location = useLocation();
  const [inactive, setInactive] = useState(false);
  const [timerActive, setTimerActive] = useState(true); // Estado para controlar el temporizador
  let refreshInterval;

  // Función para detener o reanudar el temporizador
  const toggleTimer = () => {
    setTimerActive(!timerActive);
    setInactive(false); // Reiniciar inactividad al reanudar el temporizador
  };

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title = pageTitle;

    let activityTimeout;

    if (timerActive) {
      activityTimeout = setTimeout(() => {
        setInactive(true);
      }, 3000);
    }

    return () => {
      clearInterval(refreshInterval);
      clearTimeout(activityTimeout);
    };
  }, [location.pathname, timerActive]);

  useEffect(() => {
    if (inactive && timerActive) {
      refreshInterval = setInterval(() => {
        window.location.reload();
      }, 3000);
    }

    return () => {
      clearInterval(refreshInterval);
    };
  }, [inactive, timerActive]);

  return (
    <div className="MainContainer">
      <Helmet>
        <title>{getPageTitle(location.pathname)}</title>
      </Helmet>
      <Routes location={location}>
        <Route path="/monitoreo/home" element={<Home />} />
        <Route path="/monitoreo/candelaria/clients" element={<Dcs />} />
        <Route path="/monitoreo/candelaria/switches" element={<Switches />} />
        <Route path="/monitoreo/ups" element={<Ups />} />
        <Route path="/monitoreo/candelaria/mesh" element={<Mesh />} />
        <Route path="/monitoreo/vpn" element={<Vpn />} />
        <Route path="/monitoreo/devices" element={<Devices />} />
        <Route path="/monitoreo/firewalls" element={<Firewalls />} />
        <Route path="/monitoreo/wan" element={<Wan />} />
      </Routes>
      <div className="refresh-button-container">
        <button className="refresh-button" onClick={toggleTimer} title={timerActive ? 'Pausar Autorefresco de la página' : 'Activar Autorefresco de la página'}>
          {timerActive ? (
            <FontAwesomeIcon icon={faPause} /> // Icono de Pause
          ) : (
            <FontAwesomeIcon icon={faPlay} /> // Icono de Play
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
