import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import LocationDetailDrawerContainer from "./LocationDetailContainer";
import LocationDrawer from "@/components/LocationDrawer";
import { Location } from "@/interfaces/index";
import useLocationItems from "@/hooks/useLocationItems";
import { useAppDispatch } from "@/redux/store";
import { setSelectedLocationId } from "@/redux/features/location/locationSlice";

const LocationResultContainer = () => {
  const dispatch = useAppDispatch();
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
    if (item.id) {
      dispatch(setSelectedLocationId(item.id));
    }
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

export default LocationResultContainer;
