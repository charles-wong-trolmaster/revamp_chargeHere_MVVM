import React from "react";
import Drawer from "../DrawerStack/Drawer";
import TariffDetailContent from "./components/TariffDetailContent";
import TariffEditDrawer from "./TariffEditDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffDetailDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <TariffDetailContent drawerId={id} />
      <TariffEditDrawer id="tariffEdit" />
    </Drawer>
  );
};

export default TariffDetailDrawer;
