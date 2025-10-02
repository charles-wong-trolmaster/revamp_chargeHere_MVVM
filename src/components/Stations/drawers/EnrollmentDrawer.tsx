import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Enrollment from "../contents/Enrollment";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EnrollmentDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Enrollment drawerId={id} />
    </Drawer>
  );
};

export default EnrollmentDrawer;
