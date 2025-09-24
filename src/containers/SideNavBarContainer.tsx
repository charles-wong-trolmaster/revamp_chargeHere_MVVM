import NavBar from "@/components/NavBar";
import { NavBarItem } from "@/redux/features/navbar/navBarSlice";
import { setDirection } from "@/redux/features/subNavBar/subNavbarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const SideNavbarContainier: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.subNavBar.direction);
  const items = useAppSelector((state) => state.subNavBar.items);
  const selectedIndex = useAppSelector(
    (state) => state.subNavBar.selectedIndex
  );
  const selectedStyle = useAppSelector((state) => state.subNavBar.selectedStyle);

  // Modified onSelect to accept the selected item and dispatch the style
  const onSelect = (selectedItem: NavBarItem) => {
    console.log('selected:', selectedItem);
    // Dispatch the style - you'll need to create an action for this
    // dispatch(setMapboxStyle(selectedItem.style));

  };

  const dummyNavBarItems: NavBarItem[] = [
    {
      id: "active",
      name: "Active",
      icon: "/icons/home.svg",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      onClick: () => console.log("Active clicked")
    },
    {
      id: "upcoming",
      name: "Upcoming", 
      icon: "/icons/search.svg",
      style: "mapbox://styles/mapbox/satellite-v9",
      onClick: () => console.log("Upcoming clicked")
    },
    {
      id: "removed",
      name: "Removed",
      icon: "/icons/settings.svg",
      style: "mapbox://styles/mapbox/dark-v11", 
      onClick: () => console.log("Removed clicked")
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