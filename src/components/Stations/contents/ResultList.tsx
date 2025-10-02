import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const ResultList: React.FC<SessionSettingsContentProps> = () => {
  const { openChild } = useDrawer();

  return (
    <>
      <DrawerCloseButton />
      <h3>Station</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openChild("stationPlanned")}>Planned</button>
      <button onClick={() => openChild("stationAssigned")}>Assigned</button>
      <button onClick={() => openChild("stationUnconfigured")}>
        Unconfigured
      </button>
      <button onClick={() => openChild("stationUnassigned")}>Unassigned</button>
    </>
  );
};

export default ResultList;
