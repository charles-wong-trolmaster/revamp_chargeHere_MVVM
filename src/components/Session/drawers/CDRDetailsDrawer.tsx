import Drawer from "@/components/DrawerStack/Drawer";
import React from "react";
import CDRDetails from "../contents/CDRDetails";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const CDRDetailsDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <CDRDetails drawerId={id} />
    </Drawer>
  );
};

export default CDRDetailsDrawer;
