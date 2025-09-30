import React from "react";
import Drawer from "../DrawerStack/Drawer";
import StationEnrollmentContent from "./components/StationEnrollmentContent";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const StationEnrollmentDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationEnrollmentContent drawerId={id} />
    </Drawer>
  );
};

export default StationEnrollmentDrawer;
