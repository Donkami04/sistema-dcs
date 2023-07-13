import { Routes, Route } from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Dcs} from "./components/Dcs/Dcs";
import {Switches} from "./components/Dcs-switches/DcsSwitches";
import {Ups} from "./components/Ups/Ups";
import { Vpn } from "./components/Vpn/Vpn"
import { Mesh } from "./components/Mesh/Mesh"
import "./app.css";

function App() {
  const titleDCS = 'Concentradora';
  const titleVpn = 'Monitoreo VPN';
  const titleHome = 'Sistema de monitoreo';

  return (
    <div className="MainContainer">
      <Routes >
        <Route path="monitoreo/home" element={<Home />} />
        <Route path="monitoreo/candelaria/clients" element={<Dcs title={titleDCS}/>} />
        <Route path="monitoreo/candelaria/switches" element={<Switches title={titleDCS}/>} />
        <Route path="monitoreo/ups" element={<Ups />} />
        <Route path="monitoreo/candelaria/mesh" element={<Mesh />} />
        <Route path="monitoreo/vpn" element={<Vpn title={titleVpn}/>} />
      </Routes>
    </div>
  );
}

export default App;
