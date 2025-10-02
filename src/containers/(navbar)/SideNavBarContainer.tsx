import { IconButtonProps } from "@/components/IconButton";
import NavBar from "@/components/NavBar";
import { setSelectedStyle } from "@/redux/features/map/mapSlice";
import { getSelectedNavItem } from "@/redux/features/navbar/navBarSlice";
import {
  setLocationSubNavBar,
  setItems,
  LocationSubNavBarIconButtonProps,
  setHoveredIndex,
  setSelectedItemIndex,
  setSessionSubNavBar,
  setSettingsSubNavBar,
} from "@/redux/features/subNavBar/subNavBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const SideNavbarContainier: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedNavBarItem = useAppSelector(getSelectedNavItem);
  const direction = useAppSelector((state) => state.subNavBar.direction);
  const items = useAppSelector((state) => state.subNavBar.items);
  const locationSideNavbarSelectedIndex = useAppSelector(
    (state) => state.subNavBar.selectedItemIndex?.["location"]
  );
  const sessionSideNavbarSelectedIndex = useAppSelector(
    (state) => state.subNavBar.selectedItemIndex?.["session"]
  );
  const settingSideNavbarSelectedIndex = useAppSelector(
    (state) => state.subNavBar.selectedItemIndex?.["settings"]
  );

  // Modified onSelect to accept the selected item and dispatch the style
  const locationItemOnSelect = (
    selectedItem: LocationSubNavBarIconButtonProps,
    index: number
  ) => {
    dispatch(setSelectedItemIndex({ location: index }));
    if (selectedItem.mapboxStyle) {
      dispatch(setSelectedStyle(selectedItem.mapboxStyle));
    }
  };

  const sessionOnSelect = (selectedItem: IconButtonProps, index: number) => {
    dispatch(setSelectedItemIndex({ session: index }));
  };

  const settingsOnSelect = (selectedItem: IconButtonProps, index: number) => {
    dispatch(setSelectedItemIndex({ settings: index }));
  };

  const onSelect = (selectedItem: IconButtonProps, index: number) => {
    console.log(selectedItem);
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
    if (selectedNavBarItem && selectedNavBarItem.id === "location") {
      dispatch(setLocationSubNavBar());
    } else if (selectedNavBarItem && selectedNavBarItem.id === "session") {
      dispatch(setSessionSubNavBar());
    } else if (selectedNavBarItem && selectedNavBarItem.id === "settings") {
      dispatch(setSettingsSubNavBar());
    } else {
      dispatch(setItems([]));
    }
  }, [selectedNavBarItem, dispatch]);

  return (
    <NavBar
      direction={direction}
      onSelect={
        selectedNavBarItem && selectedNavBarItem.id === "location"
          ? locationItemOnSelect
          : selectedNavBarItem && selectedNavBarItem.id === "session"
          ? sessionOnSelect
          : selectedNavBarItem && selectedNavBarItem.id === "settings"
          ? settingsOnSelect
          : onSelect
      }
      items={items}
      onHover={onHover}
      onUnHover={onUnHover}
      selectedIndex={
        selectedNavBarItem && selectedNavBarItem.id === "location"
          ? locationSideNavbarSelectedIndex
          : selectedNavBarItem && selectedNavBarItem.id === "session"
          ? sessionSideNavbarSelectedIndex
          : selectedNavBarItem && selectedNavBarItem.id === "settings"
          ? settingSideNavbarSelectedIndex
          : undefined
      }
    />
  );
};

export default SideNavbarContainier;
