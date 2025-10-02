import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Maintenance from "../contents/Maintenance";

interface SessionHistoryDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const MaintenanceDrawer: React.FC<SessionHistoryDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Maintenance drawerId={id} />
    </Drawer>
  );
};

export default MaintenanceDrawer;
