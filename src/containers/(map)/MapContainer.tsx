import { Bound, setBound } from "@/redux/features/map/mapSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Map from "@/components/Map";
import React from "react";
import useLocationItems from "@/hooks/useLocationItems";
import { getSelectedNavItem } from "@/redux/features/navbar/navBarSlice";
import { setSelectedLocationId } from "@/redux/features/location/locationSlice";

const MapContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { locationItems: items } = useLocationItems();
  const selectedNavBarItem = useAppSelector(getSelectedNavItem);
  const selectedIndex = useAppSelector((state) => state.map.selectedIndex);
  const selectedStyle = useAppSelector((state) => state.map.selectedStyle);
  const boundOnChangeDelay = useAppSelector(
    (state) => state.map.boundOnChangeDelay
  );

  const onUnclusterClick = (uncluster: {
    id: string;
    coordinate: { lat: number; lng: number };
  }) => {
    if (selectedNavBarItem?.name === "Location") {
      dispatch(setSelectedLocationId(uncluster.id));
    }
  };
  const onClusterClick = (coordinate: { lat: number; lng: number }) => {
    console.log(coordinate);
  };
  const onMapClick = (coordinate: { lat: number; lng: number }) => {
    console.log(coordinate);
  };

  const onBoundChange = (bound: Bound) => {
    console.log(bound);

    dispatch(setBound(bound));
  };

  const handleSelectedId = () => {};

  return (
    <Map
      onUnclusterClick={onUnclusterClick}
      onClusterClick={onClusterClick}
      onMapClick={onMapClick}
      items={items}
      selectedIndex={selectedIndex}
      selectedStyle={selectedStyle}
      onBoundChange={onBoundChange}
      boundFetchingTime={boundOnChangeDelay ?? 3000}
    />
  );
};

export default MapContainer;
