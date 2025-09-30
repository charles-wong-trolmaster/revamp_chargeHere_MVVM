import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationGalleryContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationGallery",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location Gallery</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
      <button onClick={() => openDrawer("locationEditGallery")}>
        Location Edit Gallery
      </button>
    </>
  );
};

export default LocationGalleryContent;
