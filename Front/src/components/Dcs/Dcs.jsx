import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Status_System } from "../Status_System/Status_System";
import { Button } from "../Button/Button";
import { Dashboard } from "../Dashboard/Dashboard";
import { TableClients } from "../TableClients/TableClients";
import { Hamburmenu } from "../Hamburmenu/Hamburmenu";
// import { AsideMenu } from "../AsideMenu/AsideMenu";

export function Dcs(props) {
  const buttonTag = "Switches";
  const urlRedirect = 'switches';
  const clientsTable = "dcs";

  return (
    <>
      <Navbar title={props.title} />
      <Status_System tableToShow={clientsTable} />
      <Button buttonTag={buttonTag} urlRedirect={urlRedirect} />
      <Dashboard />
      <TableClients />
      <Hamburmenu
        buttonTag={buttonTag}
        urlRedirect={urlRedirect}
      />
    </>
  );
}
