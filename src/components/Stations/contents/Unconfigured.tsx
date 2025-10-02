import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const Unconfigured: React.FC<SessionSettingsContentProps> = () => {
  const { openChild } = useDrawer();
  return (
    <>
      <DrawerCloseButton />
      <h3>Unconfigured</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openChild("stationEditConnector")}>
        Edit Connector
      </button>
    </>
  );
};

export default Unconfigured;
