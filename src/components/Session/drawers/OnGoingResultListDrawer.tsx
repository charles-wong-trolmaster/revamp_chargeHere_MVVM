import React from "react";
import OnGoingDetailsDrawer from "./OnGoingDetailsDrawer";
import Drawer from "@/components/DrawerStack/Drawer";
import OnGoingResultList from "../contents/OnGoingResultList";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const OnGoingResultListDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <OnGoingResultList drawerId={id} />
      <OnGoingDetailsDrawer id="onGoingDetail" />
    </Drawer>
  );
};

export default OnGoingResultListDrawer;
