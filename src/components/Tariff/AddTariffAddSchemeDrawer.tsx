import React from "react";
import Drawer from "../DrawerStack/Drawer";
import AddTariffAddSchemeContent from "./components/AddTariffAddSchemeContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const AddTariffAddSchemeDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <AddTariffAddSchemeContent drawerId={id} />
    </Drawer>
  );
};

export default AddTariffAddSchemeDrawer;
