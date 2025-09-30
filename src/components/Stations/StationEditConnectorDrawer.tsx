import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationEditConnectorContent from "./components/StationEditConnectorContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationEditConnectorDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationEditConnectorContent drawerId={id} />
    </Drawer>
  );
};

export default StationEditConnectorDrawer;
