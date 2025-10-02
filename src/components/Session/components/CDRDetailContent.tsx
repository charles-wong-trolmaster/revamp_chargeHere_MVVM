import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const CDRDetailContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "CDRDetail",
}) => {
  return (
    <>
      <DrawerCloseButton />
      <h3>CDR Detail</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default CDRDetailContent;
