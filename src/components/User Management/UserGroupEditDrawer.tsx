import React from "react";
import Drawer from "../DrawerStack/Drawer";
import UserGroupEditContent from "./components/UserGroupEditContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const UserGroupEditDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <UserGroupEditContent drawerId={id} />
    </Drawer>
  );
};

export default UserGroupEditDrawer;
