import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const StationLocationContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "stationLocation",
}) => {
  return (
    <>
      <DrawerCloseButton />
      <h3>Station Location</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default StationLocationContent;
