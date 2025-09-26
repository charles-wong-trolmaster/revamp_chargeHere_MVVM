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
    console.log("qqq map click", coordinate);
  };

  const onBoundChange = (bound: Bound) => {
    console.log("qqq bound", bound);

    dispatch(setBound(bound));
  };

  return (
    <Map
      onUnclusterClick={onUnclusterClick}
      onClusterClick={onClusterClick}
      onMapClick={onMapClick}
      items={items}
      selectedIndex={selectedIndex}
      selectedStyle={selectedStyle}
      onBoundChange={onBoundChange}
    />
  );
};

export default MapContainer;
