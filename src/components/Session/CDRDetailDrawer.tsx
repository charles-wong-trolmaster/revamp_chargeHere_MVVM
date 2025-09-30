import React from "react";
import Drawer from "../DrawerStack/Drawer";
import CDRDetailContent from "./components/CDRDetailContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const SessionDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <CDRDetailContent drawerId={id} />
    </Drawer>
  );
};

export default SessionDrawer;
