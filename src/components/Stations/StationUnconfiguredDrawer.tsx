import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationUnconfiguredContent from "./components/StationUnconfiguredContent";
import StationEditConnectorDrawer from "./StationEditConnectorDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationConfiguredDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationUnconfiguredContent drawerId={id} />
      <StationEditConnectorDrawer id="stationEditConnector" />
    </Drawer>
  );
};

export default StationConfiguredDrawer;
