import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationEVSEContent from "./components/LocationEVSEContent";
import LocationEditEVSEDrawer from "./LocationEditEVSEDrawer";
interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationEVSEDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationEVSEContent drawerId={id} />
      <LocationEditEVSEDrawer id="locationEditEVSE" />
    </Drawer>
  );
};

export default LocationEVSEDrawer;
