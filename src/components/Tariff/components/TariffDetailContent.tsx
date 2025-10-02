import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const TariffDetailContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "tariffDetail",
}) => {
  const { openChild } = useDrawer();

  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Detail</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openChild("editTariffEditScheme")}>
        Edit Scheme Drawer
      </button>
      <button onClick={() => openChild("editTariffAddScheme")}>
        Add Scheme Drawer
      </button>
    </>
  );
};

export default TariffDetailContent;
