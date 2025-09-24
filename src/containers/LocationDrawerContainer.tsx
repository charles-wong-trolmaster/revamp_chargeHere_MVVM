import React, { useCallback } from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import LocationDetailDrawerContainer from "./LocationDetailDrawerContainer";
import { useListManyLocationsByStatusInfiniteQuery } from "@/redux/rtk-query/endpoints/admin/locations";
import { useGetOneLocationQuery } from "@/redux/rtk-query/endpoints/admin/locations";
import LocationDrawer from "@/components/LocationDrawer";
import { Location } from "@/interfaces/index";
import LocationDetailDrawer from "@/components/LocationDetailDrawer";

interface LocationDrawerContainerProps {}

const LocationDrawerContainer: React.FC<LocationDrawerContainerProps> = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();

  const {
    data: activeLocationsData,
    isLoading: activeLocationsQueryIsLoading,
    isError: activeLocationsQueryIsError,
    isFetching: activeLocationsQueryIsFetching,
    hasNextPage: activeLocationsQueryHasNextPage,
    fetchNextPage: activeLocationsQueryFetchNextPage,
  } = useListManyLocationsByStatusInfiniteQuery({
    status: "ACTIVE",
  });

  const activeLocations: Location[] =
    activeLocationsData?.pages
      ?.flatMap((page) => page.data || page)
      ?.map((location: Location) => ({
        ...location,
        derivedStatus: "ACTIVE" as const,
      })) || [];

  const onScrollToBottom = () => {
    if (activeLocationsQueryHasNextPage && !activeLocationsQueryIsFetching) {
      activeLocationsQueryFetchNextPage();
    }
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
      isFetching={activeLocationsQueryIsFetching}
      isLoading={activeLocationsQueryIsLoading}
      hasNextPage={activeLocationsQueryHasNextPage}
      handleScroll={onScrollToBottom}
      onScrollToBottom={onScrollToBottom}
      items={activeLocations}
      onClose={closeCurrentDrawer}
      onItemClick={handleItemClick}
    />
  );
};

export default LocationDrawerContainer;
