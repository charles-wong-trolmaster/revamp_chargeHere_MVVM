import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const TariffDetailContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "tariffDetail",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Tariff Detail</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openDrawer("tariffEdit")}>Tariff Edit</button>
    </>
  );
};

export default TariffDetailContent;
