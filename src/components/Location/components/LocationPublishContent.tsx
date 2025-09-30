import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationPublishContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationPublish",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location Publish</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
      <button onClick={() => openDrawer("locationUserGroup")}>
        User Group
      </button>
    </>
  );
};

export default LocationPublishContent;
