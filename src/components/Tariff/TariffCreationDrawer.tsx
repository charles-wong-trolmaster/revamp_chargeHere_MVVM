import React from "react";
import Drawer from "../DrawerStack/Drawer";
import TariffCreationContent from "./components/TariffCreationContent";
import TariffCreationDetailDrawer from "./TariffCreationDetailDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffCreationDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <TariffCreationContent drawerId={id} />
      <TariffCreationDetailDrawer id={"tariffCreationDetail"} />
    </Drawer>
  );
};

export default TariffCreationDrawer;
