import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Planned from "../contents/Planned";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const PlannedDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Planned drawerId={id} />
    </Drawer>
  );
};

export default PlannedDrawer;
