import React from "react";
import Drawer from "../DrawerStack/Drawer";
import TariffCreationDetailContent from "./components/TariffCreationDetailContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffCreationDetailDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <TariffCreationDetailContent drawerId={id} />
    </Drawer>
  );
};

export default TariffCreationDetailDrawer;
