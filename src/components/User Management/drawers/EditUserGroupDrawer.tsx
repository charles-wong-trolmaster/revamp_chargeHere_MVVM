import Drawer from "@/components/DrawerStack/Drawer";
import React from "react";
import EditUserGroup from "../contents/EditUserGroup";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EditUserGroupDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <EditUserGroup drawerId={id} />
    </Drawer>
  );
};

export default EditUserGroupDrawer;
