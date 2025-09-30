import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationEditEVSEContent from "./components/LocationEditEVSEContent";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationEditEVSEContent drawerId={id} />
    </Drawer>
  );
};

export default LocationDrawer;
