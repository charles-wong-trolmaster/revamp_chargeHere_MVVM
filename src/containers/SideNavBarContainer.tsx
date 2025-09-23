import NavBar from "@/components/NavBar";
import { NavBarItem } from "@/redux/features/navbar/navBarSlice";
import { setDirection } from "@/redux/features/subNavBar/subNavBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const SideNavbarContainier: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.subNavBar.direction);
  const items = useAppSelector((state) => state.subNavBar.items);
  const selectedIndex = useAppSelector(
    (state) => state.subNavBar.selectedIndex
  );
  const onSelect = () => console.log("selected");
  // dispatch(
  //   setDirection(direction === "horizontal" ? "vertical" : "horizontal")
  // );
  const dummyNavBarItems: NavBarItem[] = [
    {
      id: "active",
      name: "Active",
      icon: "/icons/home.svg",
      onClick: () => console.log("Active clicked"),
    },
    {
      id: "upcoming",
      name: "Upcoming",
      icon: "/icons/search.svg",
      onClick: () => console.log("Upcoming clicked"),
    },
    {
      id: "removed",
      name: "Removed",
      icon: "/icons/settings.svg",
      onClick: () => console.log("Rmoved clicked"),
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
