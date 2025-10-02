import React from "react";
import UserGroupEditDrawer from "./EditUserGroupDrawer";
import Drawer from "@/components/DrawerStack/Drawer";
import UserGroupResultList from "../contents/UserGroupResultList";
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
      <UserGroupResultList drawerId={id} />
      <UserGroupEditDrawer id={"userGroupEdit"} />
    </Drawer>
  );
};

export default UserGroupDrawer;
