import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationCreationContent from "./components/LocationCreationContent";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationCreationDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationCreationContent drawerId={id} />
    </Drawer>
  );
};

export default LocationCreationDrawer;
