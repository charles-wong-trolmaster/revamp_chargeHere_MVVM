import { IconButtonProps } from "@/components/IconButton";
import NavBar from "@/components/NavBar";
import {
  setHoveredIndex,
  setItems,
  setSelectedIndex,
} from "@/redux/features/navbar/navBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const NavbarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.navBar.direction);
  const selectedIndex = useAppSelector((state) => state.navBar.selectedIndex);
  const hoveredIndex = useAppSelector((state) => state.navBar.hoveredIndex);
  const items = useAppSelector((state) => state.navBar.items);

  const onSelect = (selectedItem: IconButtonProps, index: number) => {
    // Properly clone the array and objects inside it
    const clonedItems = items.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));
    dispatch(setSelectedIndex(index));
    dispatch(setItems(clonedItems));
    if (selectedItem.onClick) {
      selectedItem.onClick();
    }
  };

  const onHover = (selectedItem: IconButtonProps, index: number) => {
    dispatch(setHoveredIndex(index));
    if (selectedItem.onHover) {
      selectedItem.onHover();
    }
  };

  const onUnHover = () => {
    dispatch(setHoveredIndex(undefined));
  };

  return (
    <NavBar
      hoveredIndex={hoveredIndex}
      direction={direction}
      onSelect={onSelect}
      onHover={onHover}
      onUnHover={onUnHover}
      items={items}
      selectedIndex={selectedIndex}
    />
  );
};

export default NavbarContainer;
