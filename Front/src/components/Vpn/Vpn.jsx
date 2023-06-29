import React, {useState, useEffect} from "react";
import { Navbar } from '../Navbar/Navbar'
import { SectionVpn } from './SectionVpn/SectionVpn'
import { getVpn } from "../../utils/Api-candelaria/api"
import { Status_System } from "../Status_System/Status_System"
import "./vpn.css"

export function Vpn({title}) {
  const tableToShow = "vpn";
  const [vpn1Users, setVpn1Users] = useState([]);
  const [vpn2Users, setVpn2Users] = useState([]);
  const [vpn3Users, setVpn3Users] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vpnData = await getVpn();
        setVpn1Users(vpnData.vpn_1);
        setVpn2Users(vpnData.vpn_2);
        setVpn3Users(vpnData.vpn_3);

      } catch (error) {
        console.error("Error al obtener el listado de Ups:", error);
        return error;
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <Navbar title={title} />
      <Status_System tableToShow={tableToShow} />
      <main className='sections-container'>
      <SectionVpn vpnNum={1} usersNumber={vpn1Users.number} users={vpn1Users.users} />
      <SectionVpn vpnNum={2} usersNumber={vpn2Users.number} users={vpn2Users.users}/>
      <SectionVpn vpnNum={3} usersNumber={vpn3Users.number} users={vpn3Users.users}/>
      </main>
    </div>
  )
}