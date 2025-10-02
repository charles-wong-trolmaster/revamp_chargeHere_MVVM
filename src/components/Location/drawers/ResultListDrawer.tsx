import React, { useCallback } from "react";
import Drawer from "../../DrawerStack/Drawer";
import ResultList from "../contents/ResultList";
import DetailsDrawer from "./DetailsDrawer";
import { useCreateOneLocationMutation } from "@/redux/rtk-query/endpoints/admin/locations";
import { useAppDispatch } from "@/redux/store";
import useLocationItems from "@/hooks/useLocationItems";
import { setSelectedLocationId } from "@/redux/features/location/locationSlice";
import { Location } from "@/interfaces";
import { useDrawer } from "@/hooks/useDrawer";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const ResultListDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  const dispatch = useAppDispatch();
  const { openChild } = useDrawer();
  const {
    locationItems: items,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useLocationItems();

  // Memoize the scroll handler
  const onScrollToBottom = useCallback(() => {
    console.log("scrolled to bottom");
  }, []);

  // Memoize the item click handler
  const handleItemClick = (item: Location) => {
    if (item.id) {
      dispatch(setSelectedLocationId(item.id));
    }
    openChild("detail");
  };

  // Memoize the close handler
  const handleClose = useCallback(() => {
    console.log("closing");
  }, []);

  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <ResultList
        title="Location"
        isFetching={isFetchingNextPage}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        handleScroll={onScrollToBottom}
        onScrollToBottom={onScrollToBottom}
        items={items}
        onClose={handleClose}
        onItemClick={handleItemClick}
      />
      <DetailsDrawer id="detail" />
    </Drawer>
  );
};

export default ResultListDrawer;
