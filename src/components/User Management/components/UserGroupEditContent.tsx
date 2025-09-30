import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const UserGroupEditContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "userGroupEdit",
}) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>User Group Edit</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default UserGroupEditContent;
