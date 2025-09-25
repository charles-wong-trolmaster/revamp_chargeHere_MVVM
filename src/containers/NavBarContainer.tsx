import { IconButtonProps } from "@/components/IconButton";
import NavBar from "@/components/NavBar";
import { setSelectedIndex } from "@/redux/features/navbar/navBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const NavbarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.navBar.direction);
  const items = useAppSelector((state) => state.navBar.items);
  const selectedIndex = useAppSelector((state) => state.navBar.selectedIndex);
  const onSelect = (selectedItem: IconButtonProps, index: number) => {
    dispatch(setSelectedIndex(index));
  };
  // dispatch(
  //   setDirection(direction === "horizontal" ? "vertical" : "horizontal")
  // );
  const dummyNavBarItems: IconButtonProps[] = [
    {
      name: "Location",
      icon: "/icons/home.svg",
      showTooltip: false,
    },
    {
      name: "Session",
      icon: "/icons/search.svg",
      showTooltip: false,
    },
    {
      name: "Station",
      icon: "/icons/settings.svg",
      showTooltip: false,
    },
    {
      name: "Tariff",
      icon: "/icons/profile.svg",
      showTooltip: false,
    },
    {
      name: "Settings",
      icon: "/icons/gear.svg",
      showTooltip: false,
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
