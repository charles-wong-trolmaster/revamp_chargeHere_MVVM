import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const StationMaintenanceContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "stationMaintenance",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Station Maintenance</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openDrawer("stationLocationEditGallery")}>
        Location Edit Gallery
      </button>
    </>
  );
};

export default StationMaintenanceContent;
