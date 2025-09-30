import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const StaitonEditConnectorContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "stationEditConnector",
}) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Station Edit Connector</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default StaitonEditConnectorContent;
