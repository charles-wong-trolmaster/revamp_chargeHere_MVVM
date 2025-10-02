import Drawer from "@/components/DrawerStack/Drawer";
import React from "react";
import EditTariffEditScheme from "../contents/EditTariffEditScheme";

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
      <EditTariffEditScheme drawerId={id} />
    </Drawer>
  );
};

export default EditTariffEditSchemeDrawer;
