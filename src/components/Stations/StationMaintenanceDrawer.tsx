import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationMaintenanceContent from "./components/StationMaintenanceContent";
import StationLocationEditGalleryDrawer from "./StationLocationEditGalleryDrawer";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationMaintenanceDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationMaintenanceContent drawerId={id} />
      <StationLocationEditGalleryDrawer id={"stationLocationEditGallery"} />
    </Drawer>
  );
};

export default StationMaintenanceDrawer;
