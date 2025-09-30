import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationCreationContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationCreation",
}) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location Creation</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
    </>
  );
};

export default LocationCreationContent;
