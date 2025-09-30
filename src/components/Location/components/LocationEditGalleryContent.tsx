import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationEditGalleryContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationEditGallery",
}) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location Edit Gallery</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
    </>
  );
};

export default LocationEditGalleryContent;
