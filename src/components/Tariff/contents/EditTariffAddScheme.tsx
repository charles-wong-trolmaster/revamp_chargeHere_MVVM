import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import SchemeDetailForm from "@/components/SchemeDetailForm";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const EditTariffAddScheme: React.FC<SessionSettingsContentProps> = () => {
  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Add Scheme</h3>
      <SchemeDetailForm />

      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default EditTariffAddScheme;
