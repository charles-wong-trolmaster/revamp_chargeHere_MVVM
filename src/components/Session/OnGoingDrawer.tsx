import React from "react";
import Drawer from "../DrawerStack/Drawer";
import OnGoingContent from "./components/OnGoingContent";
import OnGoingDetailDrawer from "./OnGoingDetailDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const OnGoingDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <OnGoingContent drawerId={id} />
      <OnGoingDetailDrawer id="onGoingDetail" />
    </Drawer>
  );
};

export default OnGoingDrawer;
