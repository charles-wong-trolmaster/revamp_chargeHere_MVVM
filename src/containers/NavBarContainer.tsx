import NavBar from "@/components/NavBar";
import {
  NavBarItem,
  setSelectedIndex,
} from "@/redux/features/navbar/navBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const NavbarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.navBar.direction);
  const items = useAppSelector((state) => state.navBar.items);
  const selectedIndex = useAppSelector((state) => state.navBar.selectedIndex);
  const onSelect = (selectedItem: NavBarItem, index: number) => {
    dispatch(setSelectedIndex(index));
  };
  // dispatch(
  //   setDirection(direction === "horizontal" ? "vertical" : "horizontal")
  // );
  const dummyNavBarItems: NavBarItem[] = [
    {
      id: "location",
      name: "Location",
      icon: "/icons/home.svg",
    },
    {
      id: "session",
      name: "Session",
      icon: "/icons/search.svg",
    },
    {
      id: "station",
      name: "Station",
      icon: "/icons/settings.svg",
    },
    {
      id: "tariff",
      name: "Tariff",
      icon: "/icons/profile.svg",
    },
    {
      id: "settings",
      name: "Settings",
      icon: "/icons/gear.svg",
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

export default NavbarContainer;
