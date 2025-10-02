import React from "react";
import Drawer from "../DrawerStack/Drawer";
import EditTariffAddSchemeContent from "./components/EditTariffAddSchemeContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EditTariffAddSchemeDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <EditTariffAddSchemeContent drawerId={id} />
    </Drawer>
  );
};

export default EditTariffAddSchemeDrawer;
