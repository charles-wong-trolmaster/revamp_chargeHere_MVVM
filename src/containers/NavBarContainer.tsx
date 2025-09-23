import NavBar from "@/components/NavBar";
import {
  NavBarItem,
  setDirection,
  setSelectedIndex,
} from "@/redux/features/navbar/navBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const NavbarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.navBar.direction);
  const items = useAppSelector((state) => state.navBar.items);
  const selectedIndex = useAppSelector((state) => state.navBar.selectedIndex);
  const onSelect = (index: number) => {
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
      onClick: () => console.log("Location clicked"),
    },
    {
      id: "session",
      name: "Session",
      icon: "/icons/search.svg",
      onClick: () => console.log("Session clicked"),
    },
    {
      id: "station",
      name: "Station",
      icon: "/icons/settings.svg",
      onClick: () => console.log("Station clicked"),
    },
    {
      id: "tariff",
      name: "Tariff",
      icon: "/icons/profile.svg",
      onClick: () => console.log("Tariff clicked"),
    },
    {
      id: "settings",
      name: "Settings",
      icon: "/icons/gear.svg",
      onClick: () => console.log("Settings clicked"),
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
