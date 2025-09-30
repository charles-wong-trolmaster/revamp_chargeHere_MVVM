import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationEVSEContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationEVSE",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location EVSE</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
      <button onClick={() => openDrawer("locationEditEVSE")}>
        Location Edit EVSE
      </button>
    </>
  );
};

export default LocationEVSEContent;
