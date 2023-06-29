import { Routes, Route } from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Dcs} from "./components/Dcs/Dcs";
import {Switches} from "./components/Dcs-switches/DcsSwitches";
import {Ups} from "./components/Ups/Ups";
import "./app.css";

function App() {
  const titleDCS = 'Desaladora';
  const titleUps = 'Monitoreo UPS';
  const titleHome = 'Sistema de monitoreo';

  return (
    <div className="MainContainer">
      <Routes >
        <Route path="concentradora/dcs/home" element={<Home />} />
        <Route path="concentradora/dcs/clients" element={<Dcs title={titleDCS}/>} />
        <Route path="concentradora/dcs/switches" element={<Switches title={titleDCS}/>} />
        <Route path="concentradora/dcs/ups" element={<Ups title={titleDCS} />} />
      </Routes>
    </div>
  );
}

export default App;
