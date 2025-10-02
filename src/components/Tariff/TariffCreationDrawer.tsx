import React from "react";
import Drawer from "../DrawerStack/Drawer";
import AddTariffAddSchemeDrawer from "./AddTariffAddSchemeDrawer";
import AddTariffEditSchemeDrawer from "./AddTariffEditSchemeDrawer";
import TariffCreationContent from "./components/TariffCreationContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffCreationDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <TariffCreationContent drawerId={id} />
      <AddTariffEditSchemeDrawer id="addTariffEditScheme" />
      <AddTariffAddSchemeDrawer id="addTariffAddScheme" />
    </Drawer>
  );
};

export default TariffCreationDrawer;
