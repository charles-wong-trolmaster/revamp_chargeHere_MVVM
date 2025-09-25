import { IconButtonProps } from "@/components/IconButton";
import NavBar from "@/components/NavBar";
import {
  setSelectedIndex,
  setSelectedStyle,
} from "@/redux/features/subNavBar/subNavBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const SideNavbarContainier: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.subNavBar.direction);
  const items = useAppSelector((state) => state.subNavBar.items);
  const selectedIndex = useAppSelector(
    (state) => state.subNavBar.selectedIndex
  );
  const selectedStyle = useAppSelector(
    (state) => state.subNavBar.selectedStyle
  );

  const onSelect = (selectedItem: IconButtonProps, index: number) => {
    console.log("selected:", selectedItem.style);
    if (selectedItem.style) {
      dispatch(setSelectedStyle(selectedItem.style));
      dispatch(setSelectedIndex(index));
    }
  };

  const dummyNavBarItems: IconButtonProps[] = [
    {
      name: "Active",
      icon: "/icons/home.svg",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      onClick: () => console.log("Active clicked"),
      showTooltip: true,
      tooltipText: "Active",
    },
    {
      name: "Upcoming",
      icon: "/icons/search.svg",
      style: "mapbox://styles/mapbox/satellite-v9",
      onClick: () => console.log("Upcoming clicked"),
      showTooltip: true,
      tooltipText: "Upcoming",
    },
    {
      name: "Removed",
      icon: "/icons/settings.svg",
      style: "mapbox://styles/mapbox/dark-v11",
      onClick: () => console.log("Removed clicked"),
      showTooltip: true,
      tooltipText: "Removed",
    },
  ];

  return (
    <NavBar
      direction={direction}
      onSelect={onSelect}
      items={dummyNavBarItems}
      selectedIndex={selectedIndex}
    />
  );
};

export default SideNavbarContainier;
