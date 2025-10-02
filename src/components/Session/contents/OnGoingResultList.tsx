import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const OnGoingResultList: React.FC<SessionSettingsContentProps> = () => {
  const { openChild } = useDrawer();

  return (
    <>
      <DrawerCloseButton />
      <h3>On Going</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openChild("onGoingDetail")}>
        On Going Detail
      </button>
    </>
  );
};

export default OnGoingResultList;
