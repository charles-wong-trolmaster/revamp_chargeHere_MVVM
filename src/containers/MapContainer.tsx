import { setSelectedIndex } from "@/redux/features/map/mapSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Map from "@/components/Map";
import React from "react";

const MapContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const bound = useAppSelector((state) => state.map.bound);
  const items = useAppSelector((state) => state.map.items);
  const selectedIndex = useAppSelector((state) => state.map.selectedIndex);
  const onSelect = (index: number) => {
    dispatch(setSelectedIndex(index));
  };

  return (
    <Map
      onSelect={onSelect}
      items={items}
      selectedIndex={selectedIndex}
      bound={bound}
    />
  );
};

export default MapContainer;
