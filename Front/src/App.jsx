import { Routes, Route } from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Dcs} from "./components/Dcs/Dcs";
import {Switches} from "./components/Dcs-switches/DcsSwitches";
import "./app.css";

function App() {
  const titleDCS = 'Concentradora';
  const titleHome = 'Sistema de monitoreo';

  return (
    <div className="MainContainer">
      <Routes >
        <Route path="concentradora/dcs/home" element={<Home />} />
        <Route path="concentradora/dcs/clients" element={<Dcs title={titleDCS}/>} />
        <Route path="concentradora/dcs/switches" element={<Switches title={titleDCS}/>} />
      </Routes>
    </div>
  );
}

export default App;
