import NavBar from "@/components/NavBar";
import { setDirection } from "@/redux/features/navbar/navBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const NavbarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.navBar.direction);
  const items = useAppSelector((state) => state.navBar.items);
  const selectedIndex = useAppSelector((state) => state.navBar.selectedIndex);
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

export default NavbarContainer;
