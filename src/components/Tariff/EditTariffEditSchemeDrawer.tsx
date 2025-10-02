import React from "react";
import Drawer from "../DrawerStack/Drawer";
import EditTariffEditSchemeContent from "./components/EditTariffEditSchemeContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EditTariffEditSchemeDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <EditTariffEditSchemeContent drawerId={id} />
    </Drawer>
  );
};

export default EditTariffEditSchemeDrawer;
