import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "../../DrawerStack/DrawerStack";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const CDRContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "CDR",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>CDR Detail</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openDrawer("CDRDetail")}>CDR Detail</button>
    </>
  );
};

export default CDRContent;
