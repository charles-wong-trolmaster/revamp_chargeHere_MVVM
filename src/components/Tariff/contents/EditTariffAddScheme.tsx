import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import SchemeDetailForm from "@/components/SchemeDetailForm";
import { Scheme } from "@/entities";

interface SessionSettingsContentProps {
  displayMode?: boolean;
  // scheme?: Scheme;
  onSave?: (scheme: Scheme) => void;
  onDelete?: () => void;
  onClose?: () => void;
  onReset?: () => void;
}

const EditTariffAddScheme = (props: SessionSettingsContentProps) => {
  const {
    displayMode = false,
    // scheme,
    onSave,
    onDelete,
    onClose,
    onReset,
  } = props;
  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Add Scheme</h3>
      <SchemeDetailForm
        displayMode={displayMode}
        // scheme={scheme}
        onSave={onSave}
        onDelete={onDelete}
        onClose={onClose}
        onReset={onReset}
      />

      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default EditTariffAddScheme;
