import React from "react";
import Drawer from "../DrawerStack/Drawer";
import OnGoingDetailContent from "./components/OnGoingDetailContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const OnGoingDetailDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <OnGoingDetailContent drawerId={id} />
    </Drawer>
  );
};

export default OnGoingDetailDrawer;
