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
        <Route path="concentradora/dcs/home" element={<Home />} />
        <Route path="concentradora/dcs/clients" element={<Dcs title={titleDCS}/>} />
        <Route path="concentradora/dcs/switches" element={<Switches title={titleDCS}/>} />
        <Route path="concentradora/dcs/ups" element={<Ups />} />
        <Route path="concentradora/dcs/mesh" element={<Mesh />} />
        <Route path="candelaria/vpn" element={<Vpn title={titleVpn}/>} />
      </Routes>
    </div>
  );
}

export default App;
