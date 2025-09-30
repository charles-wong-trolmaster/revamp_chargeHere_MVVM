import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationEditEVSEContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationEditEVSE",
}) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location Edit EVSE</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
    </>
  );
};

export default LocationEditEVSEContent;
