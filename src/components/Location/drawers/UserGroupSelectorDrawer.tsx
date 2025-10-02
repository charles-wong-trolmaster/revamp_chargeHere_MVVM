import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import UserGroupSelector from "../contents/UserGroupSelector";

interface LocationDrawerProps {
  id: string;
}

const UserGroupSelectorDrawer: React.FC<LocationDrawerProps> = ({ id }) => {
  return (
    <Drawer id={id}>
      <UserGroupSelector drawerId={id} />
    </Drawer>
  );
};

export default UserGroupSelectorDrawer;
