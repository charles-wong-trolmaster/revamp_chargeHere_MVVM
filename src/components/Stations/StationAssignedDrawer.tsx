import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationPlannedContent from "./components/StationPlannedContent";
import StationAssignedContent from "./components/StationAssignedContent";
import StationMaintenanceDrawer from "./StationMaintenanceDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationAssignedDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationAssignedContent drawerId={id} />
      <StationMaintenanceDrawer id="stationMaintenance" />
    </Drawer>
  );
};

export default StationAssignedDrawer;
