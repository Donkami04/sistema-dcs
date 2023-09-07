import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Dcs } from './components/Dcs/Dcs';
import { Switches } from './components/Dcs-switches/DcsSwitches';
import { Ups } from './components/Ups/Ups';
import { Vpn } from './components/Vpn/Vpn';
import { Mesh } from './components/Mesh/Mesh';
import { Devices } from './components/Devices/Devices';
import { Helmet } from 'react-helmet';
import { Firewalls } from './components/Firewalls/Firewalls';
import { Wan } from "./components/Wan/Wan";
import './app.css';

function getPageTitle(pathname) {
  switch (pathname) {
    case '/monitoreo/candelaria/clients':
      return 'Clientes Candelaria';
    case '/monitoreo/candelaria/switches':
      return 'Switches Candelaria';
    case '/monitoreo/vpn':
      return 'VPN';
    case '/monitoreo/home':
      return 'Home';
    case '/monitoreo/ups':
      return 'UPS';
    case '/monitoreo/candelaria/mesh':
      return 'Mesh Candelaria';
    case '/monitoreo/devices':
      return 'Dispositivos';
    case '/monitoreo/firewalls':
      return 'Firewalls';
    case '/monitoreo/wan':
      return 'WAN';
    default:
      return 'Sistema de Monitoreo';
  }
}

function App() {
  const location = useLocation();
  const [inactive, setInactive] = useState(false);
  let refreshInterval;

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title = pageTitle;

    let activityTimeout = setTimeout(() => {
      setInactive(true);
    }, 5 * 60 * 1000);

    const resetActivity = () => {
      setInactive(false);
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        setInactive(true);
      }, 5 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetActivity);

    return () => {
      clearInterval(refreshInterval);
      clearTimeout(activityTimeout);
      window.removeEventListener('mousemove', resetActivity);
    };
  }, [location.pathname]);

  useEffect(() => {
    

    if (inactive) {
      refreshInterval = setInterval(() => {
        window.location.reload();
      }, 5 * 60 * 1000);
    }

    return () => {
      clearInterval(refreshInterval);
    };
  }, [inactive]);

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
    </div>
  );
}

export default App;
