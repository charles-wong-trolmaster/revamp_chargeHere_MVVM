import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const StationDetailContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "stationDetail",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Station Detail</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openDrawer("stationMaintenance")}>
        Station Maintenance
      </button>
      <button onClick={() => openDrawer("stationEditConnector")}>
        Station edit connector
      </button>
      <button onClick={() => openDrawer("stationLocation")}>location</button>
    </>
  );
};

export default StationDetailContent;
