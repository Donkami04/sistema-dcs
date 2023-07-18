import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Dcs } from './components/Dcs/Dcs';
import { Switches } from './components/Dcs-switches/DcsSwitches';
import { Ups } from './components/Ups/Ups';
import { Vpn } from './components/Vpn/Vpn';
import { Mesh } from './components/Mesh/Mesh';
import './app.css';

function App() {
  const titleDCS = 'Concentradora';
  const titleVpn = 'Monitoreo VPN';
  const titleHome = 'Sistema de monitoreo';

  const location = useLocation();

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000); // 5 minutos en milisegundos

    return () => {
      clearInterval(refreshInterval); // Limpiar el intervalo al desmontar el componente
    };
  }, []);

  return (
    <div className="MainContainer">
      <Routes location={location}>
        <Route path="/monitoreo/home" element={<Home />} />
        <Route path="/monitoreo/candelaria/clients" element={<Dcs title={titleDCS} />} />
        <Route path="/monitoreo/candelaria/switches" element={<Switches title={titleDCS} />} />
        <Route path="/monitoreo/ups" element={<Ups />} />
        <Route path="/monitoreo/candelaria/mesh" element={<Mesh />} />
        <Route path="/monitoreo/vpn" element={<Vpn title={titleVpn} />} />
      </Routes>
    </div>
  );
}

export default App;
