import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationContent from "./components/StationContent";
import StationDetailDrawer from "./StationDetailDrawer";

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
      <StationDetailDrawer id="stationDetail" />
    </Drawer>
  );
};

export default StationDrawer;
