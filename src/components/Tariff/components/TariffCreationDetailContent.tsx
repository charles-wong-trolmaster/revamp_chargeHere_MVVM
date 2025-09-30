import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const TariffCreationDetailContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "tariffCreationDetail",
}) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Tariff Creation Detail</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default TariffCreationDetailContent;
