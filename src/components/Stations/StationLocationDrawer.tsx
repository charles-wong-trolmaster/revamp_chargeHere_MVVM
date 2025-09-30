import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationLocationContent from "./components/StationLocationContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationLocationDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationLocationContent drawerId={id} />
    </Drawer>
  );
};

export default StationLocationDrawer;
