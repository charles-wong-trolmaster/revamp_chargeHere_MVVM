import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import LocationSelector from "../contents/LocationSelector";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationSelectorDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationSelector drawerId={id} />
    </Drawer>
  );
};

export default LocationSelectorDrawer;
