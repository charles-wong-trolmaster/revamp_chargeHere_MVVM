import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import LocationDetailDrawerContainer from "./LocationDetailDrawerContainer";
import LocationDrawer from "@/components/LocationDrawer";
import { Location } from "@/interfaces/index";
import useLocationItems from "@/hooks/useLocationItems";

const LocationDrawerContainer = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();
  const {
    locationItems: items,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useLocationItems();

  const onScrollToBottom = () => {
    console.log("scrolled to bottom");
  };

  const locationDetailDrawer: DrawerLevel = {
    id: "location-detail",
    component: <LocationDetailDrawerContainer />,
  };

  const handleItemClick = (item: Location) => {
    console.log(item);
    openSubDrawer(locationDetailDrawer);
  };

  return (
    <LocationDrawer
      title="Location"
      isFetching={isFetchingNextPage}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      handleScroll={onScrollToBottom}
      onScrollToBottom={onScrollToBottom}
      items={items}
      onClose={closeCurrentDrawer}
      onItemClick={handleItemClick}
    />
  );
};

export default LocationDrawerContainer;
