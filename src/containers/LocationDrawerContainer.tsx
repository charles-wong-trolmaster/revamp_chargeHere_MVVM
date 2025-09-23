import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import Drawer from "@/components/Drawer";
import LocationDetailDrawerContainer from "./LocationDetailDrawerContainer";

interface LocationDrawerContainerProps {}

const LocationDrawerContainer: React.FC<LocationDrawerContainerProps> = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();

  const locationDetailDrawer: DrawerLevel = {
    id: "location-detail",
    component: <LocationDetailDrawerContainer />,
  };

  const handleItemClick = () => {
    openSubDrawer(locationDetailDrawer);
  };

  return (
    <Drawer
      title="Location"
      onClose={closeCurrentDrawer}
      onItemClick={handleItemClick}
    />
  );
};

export default LocationDrawerContainer;
