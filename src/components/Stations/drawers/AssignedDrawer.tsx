import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Assigned from "../contents/Assigned";
import MaintenanceDrawer from "./MaintenanceDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const AssignedDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Assigned drawerId={id} />
      <MaintenanceDrawer id="stationMaintenance" />
    </Drawer>
  );
};

export default AssignedDrawer;
