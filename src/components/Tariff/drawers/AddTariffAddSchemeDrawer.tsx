import React from "react";
import AddTariffAddScheme from "../contents/AddTariffAddScheme";
import Drawer from "@/components/DrawerStack/Drawer";

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
      <AddTariffAddScheme drawerId={id} />
    </Drawer>
  );
};

export default AddTariffAddSchemeDrawer;
