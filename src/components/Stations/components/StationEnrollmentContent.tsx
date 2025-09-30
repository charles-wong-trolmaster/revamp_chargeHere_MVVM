import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const StationEnrollmentContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "stationEnrollment",
}) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Station Enrollment</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default StationEnrollmentContent;
