import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationUnconfiguredContent from "./components/StationUnconfiguredContent";
import StationEditConnectorDrawer from "./StationEditConnectorDrawer";
import StationUnassignedContent from "./components/StationUnassignedContent";
import StationLocationDrawer from "./StationLocationDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationUnassignedDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationUnassignedContent drawerId={id} />
      <StationLocationDrawer id="stationLocation" />
    </Drawer>
  );
};

export default StationUnassignedDrawer;
