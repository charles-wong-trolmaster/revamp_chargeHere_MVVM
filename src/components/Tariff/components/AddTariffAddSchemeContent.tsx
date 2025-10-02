import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const AddTariffAddSchemeContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "addTariffAddScheme",
}) => {
  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Add Scheme</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default AddTariffAddSchemeContent;
