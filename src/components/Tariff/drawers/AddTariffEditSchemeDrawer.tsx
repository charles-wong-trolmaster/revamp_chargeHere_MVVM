import Drawer from "@/components/DrawerStack/Drawer";
import React from "react";
import AddTariffEditScheme from "../contents/AddTariffEditScheme";

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
      <AddTariffEditScheme drawerId={id} />
    </Drawer>
  );
};

export default AddTariffEditSchemeDrawer;
