import { NavBarState } from "@/redux/features/navbar/navBarSlice";
import React from "react";

interface NavbarProps extends NavBarState {
  onSelect: () => void;
}

const NavBar = (props: NavbarProps) => {
  const { direction, items, selectedIndex, onSelect } = props;

  return (
    <div
      className="uk-flex"
      style={{ flexDirection: direction === "horizontal" ? "row" : "column" }}
    >
      <div>{"direction: " + direction}</div>
      <div>{"items: " + items}</div>
      <div>{"selectedIndex: " + selectedIndex}</div>
      <button onClick={onSelect}>Change Direction</button>
    </div>
  );
};

export default NavBar;
