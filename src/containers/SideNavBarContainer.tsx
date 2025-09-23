import NavBar from "@/components/NavBar";
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
  const onSelect = () =>
    dispatch(
      setDirection(direction === "horizontal" ? "vertical" : "horizontal")
    );

  return (
    <NavBar
      direction={direction}
      onSelect={onSelect}
      items={items}
      selectedIndex={selectedIndex}
    />
  );
};

export default SideNavbarContainier;
