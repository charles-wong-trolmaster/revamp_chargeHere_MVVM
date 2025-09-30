import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationContent from "./components/LocationContent";
import LocationDetailDrawer from "./LocationDetailDrawer";
import { useCreateOneLocationMutation } from "@/redux/rtk-query/endpoints/admin/locations";
import { useDrawer } from "../DrawerStack/DrawerStack";
import { useAppDispatch } from "@/redux/store";
import useLocationItems from "@/hooks/useLocationItems";
import { setSelectedLocationId } from "@/redux/features/location/locationSlice";
import { Location } from "@/interfaces";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  const dispatch = useAppDispatch();
  const { openDrawer, closeDrawer } = useDrawer();
  const {
    locationItems: items,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useLocationItems();

  const onScrollToBottom = () => {
    console.log("scrolled to bottom");
  };

  const handleItemClick = (item: Location) => {
    if (item.id) {
      dispatch(setSelectedLocationId(item.id));
    }
    openDrawer("locationDetail");
  };
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationContent
        title="Location"
        isFetching={isFetchingNextPage}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        handleScroll={onScrollToBottom}
        onScrollToBottom={onScrollToBottom}
        items={items}
        onClose={() => closeDrawer(id)}
        onItemClick={handleItemClick}
      />
      <LocationDetailDrawer id="locationDetail" />
    </Drawer>
  );
};

export default LocationDrawer;
