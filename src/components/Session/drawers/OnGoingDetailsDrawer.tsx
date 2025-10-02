import React from "react";
import OnGoingDetails from "../contents/OnGoingDetails";
import Drawer from "@/components/DrawerStack/Drawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const OnGoingDetailsDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <OnGoingDetails drawerId={id} />
    </Drawer>
  );
};

export default OnGoingDetailsDrawer;
