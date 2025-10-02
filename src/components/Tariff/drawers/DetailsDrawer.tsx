import React from "react";
import EditTariffEditSchemeDrawer from "./EditTariffEditSchemeDrawer";
import EditTariffAddSchemeDrawer from "./EditTariffAddSchemeDrawer";
import Drawer from "@/components/DrawerStack/Drawer";
import Details from "../contents/Details";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const DetailsDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Details drawerId={id} />
      <EditTariffEditSchemeDrawer id="editTariffEditScheme" />
      <EditTariffAddSchemeDrawer id="editTariffAddScheme" />
    </Drawer>
  );
};

export default DetailsDrawer;
