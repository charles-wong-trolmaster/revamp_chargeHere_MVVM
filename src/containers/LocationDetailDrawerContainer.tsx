import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import LocationDetailDrawer from "@/components/LocationDetailDrawer";

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
    <LocationDetailDrawer
      title="Location Detail"
      onClose={closeCurrentDrawer}
      onItemClick={handleItemClick}
    />
  );
};

export default LocationDetailDrawerContainer;
