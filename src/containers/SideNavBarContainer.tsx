import { IconButtonProps } from "@/components/IconButton";
import NavBar from "@/components/NavBar";
import { setSelectedStyle } from "@/redux/features/map/mapSlice";
import { getSelectedItem } from "@/redux/features/navbar/navBarSlice";
import {
  setLocationSubNavBar,
  setItems,
  LocationSubNavBarIconButtonProps,
  setHoveredIndex,
  setSelectedIndex,
} from "@/redux/features/subNavBar/subNavBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const SideNavbarContainier: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedNavBarItem = useAppSelector(getSelectedItem);
  const direction = useAppSelector((state) => state.subNavBar.direction);
  const items = useAppSelector((state) => state.subNavBar.items);
  const selectedIndex = useAppSelector(
    (state) => state.subNavBar.selectedIndex
  );
  // Modified onSelect to accept the selected item and dispatch the style
  const locationItemOnSelect = (
    selectedItem: LocationSubNavBarIconButtonProps,
    index: number
  ) => {
    dispatch(setSelectedIndex(index));
    if (selectedItem.mapboxStyle) {
      dispatch(setSelectedStyle(selectedItem.mapboxStyle));
    }
  };

  const onSelect = (selectedItem: IconButtonProps, index: number) => {
    dispatch(setSelectedIndex(index));
    if (selectedItem.style) {
      dispatch(setSelectedStyle(selectedItem.style));
    }
  };

  const onHover = (
    selectedItem: IconButtonProps | LocationSubNavBarIconButtonProps,
    index: number
  ) => {
    // Properly clone the array and objects inside it
    const clonedItems = items.map((item, i) => ({
      ...item,
      showTooltip: i === index,
    }));
    dispatch(setHoveredIndex(index));
    dispatch(setItems(clonedItems));

    if (selectedItem.onHover) {
      selectedItem.onHover();
    }
  };

  const onUnHover = () => {
    // Properly clone the array and objects inside it
    const clonedItems = items.map((item) => ({
      ...item,
      showTooltip: false,
    }));

    dispatch(setHoveredIndex(undefined));
    dispatch(setItems(clonedItems));
  };

  useEffect(() => {
    if (selectedNavBarItem && selectedNavBarItem.name === "Location") {
      dispatch(setLocationSubNavBar());
    } else {
      dispatch(setItems([]));
      dispatch(setSelectedIndex(undefined));
    }
  }, [selectedNavBarItem, dispatch]);

  return (
    <NavBar
      direction={direction}
      onSelect={
        selectedNavBarItem && selectedNavBarItem.name === "Location"
          ? locationItemOnSelect
          : onSelect
      }
      items={items}
      onHover={onHover}
      onUnHover={onUnHover}
      selectedIndex={selectedIndex}
    />
  );
};

export default SideNavbarContainier;
