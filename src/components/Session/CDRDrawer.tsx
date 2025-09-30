import React from "react";
import Drawer from "../DrawerStack/Drawer";
import CDRContent from "./components/CDRContent";
import CDRDetailDrawer from "./CDRDetailDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const CDRDrawer: React.FC<SessionDrawerProps> = ({ id, widthMultiplier }) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <CDRContent drawerId={id} />
      <CDRDetailDrawer id="CDRDetail" />
    </Drawer>
  );
};

export default CDRDrawer;
