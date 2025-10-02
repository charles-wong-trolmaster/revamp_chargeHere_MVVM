import Drawer from "@/components/DrawerStack/Drawer";
import React from "react";
import EditTariffAddScheme from "../contents/EditTariffAddScheme";

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
      <EditTariffAddScheme drawerId={id} />
    </Drawer>
  );
};

export default EditTariffAddSchemeDrawer;
