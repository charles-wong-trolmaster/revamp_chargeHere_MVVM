import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationEditGalleryContent from "./components/LocationEditGalleryContent";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationEditGalleryDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationEditGalleryContent drawerId={id} />
    </Drawer>
  );
};

export default LocationEditGalleryDrawer;
