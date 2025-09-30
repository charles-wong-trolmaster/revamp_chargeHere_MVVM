import React from "react";
import Drawer from "../DrawerStack/Drawer";
import UserEditContent from "./components/UserEditContent";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const UserEditDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <UserEditContent drawerId={id} />
    </Drawer>
  );
};

export default UserEditDrawer;
