import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const OnGoingContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "onGoing",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>On Going</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openDrawer("onGoingDetail")}>
        On Going Detail
      </button>
    </>
  );
};

export default OnGoingContent;
