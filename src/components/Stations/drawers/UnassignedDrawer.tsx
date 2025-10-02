import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import StationUnassignedContent from "../contents/Unassigned";
import LocationSelectorDrawer from "./LocationSelectorDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const UnassignedDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationUnassignedContent drawerId={id} />
      <LocationSelectorDrawer id="stationLocation" />
    </Drawer>
  );
};

export default UnassignedDrawer;
