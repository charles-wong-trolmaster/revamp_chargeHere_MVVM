import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationDetailContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationDetail",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location Detail</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
      <button onClick={() => openDrawer("locationGallery")}>
        Location Gallery Drawer
      </button>
      <button onClick={() => openDrawer("locationEdit")}>
        Location Edit Drawer
      </button>
      <button onClick={() => openDrawer("locationEVSE")}>
        Location EVSE Drawer
      </button>
      <button onClick={() => openDrawer("locationPublish")}>
        Location Publish Drawer
      </button>
    </>
  );
};

export default LocationDetailContent;
