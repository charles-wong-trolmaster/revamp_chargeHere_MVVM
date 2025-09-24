import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import Drawer from "@/components/LocationDrawer";

interface StationDrawerContainerProps {}

const StationDrawerContainer: React.FC<StationDrawerContainerProps> = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();

  const stationDetailDrawer: DrawerLevel = {
    id: "station-detail",
    component: <div>Station Detail Content</div>, // Replace with actual component
  };

  const handleItemClick = () => {
    openSubDrawer(stationDetailDrawer);
  };

  return (
    <Drawer
      title="Station"
      onClose={closeCurrentDrawer}
      onItemClick={handleItemClick}
    />
  );
};

export default StationDrawerContainer;
