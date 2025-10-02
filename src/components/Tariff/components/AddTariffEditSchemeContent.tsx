import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const AddTariffEditSchemeContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "addTariffEditScheme",
}) => {
  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Edit Scheme</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default AddTariffEditSchemeContent;
