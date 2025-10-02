import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationPlannedContent from "./components/StationPlannedContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationPlannedDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationPlannedContent drawerId={id} />
    </Drawer>
  );
};

export default StationPlannedDrawer;
