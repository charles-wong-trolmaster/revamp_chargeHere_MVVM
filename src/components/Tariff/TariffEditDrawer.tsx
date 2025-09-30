import React from "react";
import Drawer from "../DrawerStack/Drawer";
import TariffEditContent from "./components/TariffEditContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffEditDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <TariffEditContent drawerId={id} />
    </Drawer>
  );
};

export default TariffEditDrawer;
