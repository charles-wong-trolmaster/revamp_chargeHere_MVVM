import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Publish from "../contents/Publish";
import UserGroupSelectorDrawer from "./UserGroupSelectorDrawer";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const PublishDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Publish drawerId={id} />
      <UserGroupSelectorDrawer id="locationUserGroup" />
    </Drawer>
  );
};

export default PublishDrawer;
