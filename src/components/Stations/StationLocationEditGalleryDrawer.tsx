import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationLocationEditGalleryContent from "./components/StationLocationEditGalleryContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationLocationEditGalleryDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationLocationEditGalleryContent drawerId={id} />
    </Drawer>
  );
};

export default StationLocationEditGalleryDrawer;
