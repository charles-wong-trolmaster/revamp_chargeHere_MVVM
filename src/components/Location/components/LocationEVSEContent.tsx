import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationEVSEContent: React.FC<LocationSettingsContentProps> = () => {
  const { openChild } = useDrawer();

  return (
    <>
      <DrawerCloseButton />
      <h3>Location EVSE</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
      <button onClick={() => openChild("locationEditEVSE")}>
        Location Edit EVSE
      </button>
    </>
  );
};

export default LocationEVSEContent;
