import Drawer from "@/components/DrawerStack/Drawer";
import React from "react";
import EditUser from "../contents/EditUser";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EditUserDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <EditUser drawerId={id} />
    </Drawer>
  );
};

export default EditUserDrawer;
