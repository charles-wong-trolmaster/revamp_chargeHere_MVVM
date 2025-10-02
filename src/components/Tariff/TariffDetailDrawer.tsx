import React from "react";
import Drawer from "../DrawerStack/Drawer";
import TariffDetailContent from "./components/TariffDetailContent";
import EditTariffEditSchemeDrawer from "./EditTariffEditSchemeDrawer";
import EditTariffAddSchemeDrawer from "./EditTariffAddSchemeDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffDetailDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <TariffDetailContent drawerId={id} />
      <EditTariffEditSchemeDrawer id="editTariffEditScheme" />
      <EditTariffAddSchemeDrawer id="editTariffAddScheme" />
    </Drawer>
  );
};

export default TariffDetailDrawer;
