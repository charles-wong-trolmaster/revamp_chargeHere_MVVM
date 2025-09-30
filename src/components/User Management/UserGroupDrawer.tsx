import React from "react";
import Drawer from "../DrawerStack/Drawer";
import UserGroupEditDrawer from "./UserGroupEditDrawer";
import UserGroupContent from "./components/UserGroupContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const UserGroupDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <UserGroupContent drawerId={id} />
      <UserGroupEditDrawer id={"userGroupEdit"} />
    </Drawer>
  );
};

export default UserGroupDrawer;
