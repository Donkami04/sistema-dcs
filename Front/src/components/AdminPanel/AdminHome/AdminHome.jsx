import { FaAlipay, FaBeer } from "react-icons/fa";
import { Navbar } from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./adminhome.css";

export const AdminHome = () => {
  const iconos = [<FaBeer />, <FaAlipay />];
  const linksTables = ["/admin/clients", "/admin/ups"];
  const titles = ["Clientes", "UPS"];

  return (
    <>
      <Navbar />
      <div className="contenedor">
        {iconos.map((icono, index) => (
          <div key={index} className="icono-contenedor">
            <Link to={linksTables[index]}>
              {icono}
              <h2>{titles[index]}</h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
