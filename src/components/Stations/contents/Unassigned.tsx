import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const Unassigned: React.FC<SessionSettingsContentProps> = () => {
  const { openChild } = useDrawer();
  return (
    <>
      <DrawerCloseButton />
      <h3>Unassigned</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openChild("stationLocation")}>
        Location Selector
      </button>
    </>
  );
};

export default Unassigned;
