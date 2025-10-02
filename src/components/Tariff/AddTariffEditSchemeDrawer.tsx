import React from "react";
import Drawer from "../DrawerStack/Drawer";
import AddTariffEditSchemeContent from "./components/AddTariffEditSchemeContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const AddTariffEditSchemeDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <AddTariffEditSchemeContent drawerId={id} />
    </Drawer>
  );
};

export default AddTariffEditSchemeDrawer;
