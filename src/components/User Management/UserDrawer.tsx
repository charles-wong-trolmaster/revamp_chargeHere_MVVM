import React from "react";
import Drawer from "../DrawerStack/Drawer";
import UserContent from "./components/UserContent";
import UserEditDrawer from "./UserEditDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const UserDrawer: React.FC<SessionDrawerProps> = ({ id, widthMultiplier }) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <UserContent drawerId={id} />
      <UserEditDrawer id={"userEdit"} />
    </Drawer>
  );
};

export default UserDrawer;
