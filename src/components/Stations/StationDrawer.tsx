import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationContent from "./components/StationContent";
import StationPlannedDrawer from "./StationPlannedDrawer";
import StationUnconfiguredDrawer from "./StationUnconfiguredDrawer";
import StationAssignedDrawer from "./StationAssignedDrawer";
import StationUnassignedDrawer from "./StationUnassignedDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationContent drawerId={id} />
      <StationPlannedDrawer id="stationPlanned" />
      <StationAssignedDrawer id="stationAssigned" />
      <StationUnconfiguredDrawer id="stationUnconfigured" />
      <StationUnassignedDrawer id="stationUnassigned" />
    </Drawer>
  );
};

export default StationDrawer;
