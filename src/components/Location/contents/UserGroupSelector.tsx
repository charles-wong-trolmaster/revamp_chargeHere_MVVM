import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const UserGroupSelector: React.FC<LocationSettingsContentProps> = () => {
  return (
    <>
      <DrawerCloseButton />
      <h3>Location User Group</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
    </>
  );
};

export default UserGroupSelector;
