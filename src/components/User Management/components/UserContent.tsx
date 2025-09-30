import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const UserContent: React.FC<SessionSettingsContentProps> = ({
  drawerId = "user",
}) => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>User Group</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
      <button onClick={() => openDrawer("userEdit")}>User Edit</button>
    </>
  );
};

export default UserContent;
