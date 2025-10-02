import React from "react";
import EditUserDrawer from "./EditUserDrawer";
import Drawer from "@/components/DrawerStack/Drawer";
import UserResultList from "../contents/UserResultList";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const UserResultListDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <UserResultList drawerId={id} />
      <EditUserDrawer id={"userEdit"} />
    </Drawer>
  );
};

export default UserResultListDrawer;
