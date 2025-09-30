import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationDetailContent from "./components/StationDetailContent";
import StationMaintenanceDrawer from "./StationMaintenanceDrawer";
import StationEditConnectorDrawer from "./StationEditConnectorDrawer";
import StationLocationDrawer from "./StationLocationDrawer";

interface SessionSecurityDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationDetailDrawer: React.FC<SessionSecurityDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationDetailContent drawerId={id} />
      <StationMaintenanceDrawer id={"stationMaintenance"} />
      <StationEditConnectorDrawer id={"stationEditConnector"} />
      <StationLocationDrawer id={"stationLocation"} />
    </Drawer>
  );
};

export default StationDetailDrawer;
