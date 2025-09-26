import {
  Bound,
  setBound,
  setSelectedIndex,
} from "@/redux/features/map/mapSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Map from "@/components/Map";
import React from "react";
import useLocationItems from "@/hooks/useLocationItems";

const MapContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const bound = useAppSelector((state) => state.map.bound);
  const { locationItems: items } = useLocationItems();
  const selectedIndex = useAppSelector((state) => state.map.selectedIndex);
  const selectedStyle = useAppSelector((state) => state.map.selectedStyle);

  const onSelect = (index: number) => {
    dispatch(setSelectedIndex(index));
  };

  const onUnclusterClick = (uncluster: {
    id: string;
    coordinate: { lat: number; lng: number };
  }) => {
    console.log(uncluster);
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
