import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const CDRContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "CDR",
}) => {
  const { openChild } = useDrawer();

  return (
    <>
      <DrawerCloseButton />
      <h3>CDR Detail</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openChild("CDRDetail")}>CDR Detail</button>
    </>
  );
};

export default CDRContent;
