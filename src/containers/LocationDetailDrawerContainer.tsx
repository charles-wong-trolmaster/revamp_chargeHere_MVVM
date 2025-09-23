import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import Drawer from "@/components/Drawer";

interface LocationDetailDrawerContainerProps {}

const LocationDetailDrawerContainer: React.FC<
  LocationDetailDrawerContainerProps
> = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();

  const locationSubDetailDrawer: DrawerLevel = {
    id: "location-sub-detail",
    component: <div>Location Sub Detail Content</div>,
  };

  const handleItemClick = () => {
    openSubDrawer(locationSubDetailDrawer);
  };

  return (
    <Drawer
      title="Location Detail"
      onClose={closeCurrentDrawer}
      onItemClick={handleItemClick}
    />
  );
};

export default LocationDetailDrawerContainer;
