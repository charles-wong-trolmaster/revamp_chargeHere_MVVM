import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationGalleryContent from "./components/LocationGalleryContent";
import LocationEditGalleryDrawer from "./LocationEditGalleryDrawer";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationGalleryDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationGalleryContent drawerId={id} />
      <LocationEditGalleryDrawer id="locationEditGallery" />
    </Drawer>
  );
};

export default LocationGalleryDrawer;
