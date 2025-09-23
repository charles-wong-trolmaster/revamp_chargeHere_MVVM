import { NavBarItem, NavBarState } from "@/redux/features/navbar/navBarSlice";
import React from "react";
import IconButton from "./IconButton";

interface NavbarProps extends NavBarState {
  onSelect: (index: number) => void;
}

const NavBar = (props: NavbarProps) => {
  const { direction, items, selectedIndex, onSelect } = props;

  return (
    <div
      className="uk-flex uk-background-muted uk-padding-small"
      style={{ flexDirection: direction === "horizontal" ? "row" : "column" }}
    >
      <div 
        className={`uk-flex ${direction === "horizontal" ? "uk-flex-row" : "uk-flex-column"} uk-flex-gap-small`}
      >
        {(items as NavBarItem[]).map((item: NavBarItem, index: number) => (
          <IconButton
            key={item.id || index}
            icon={item.icon}
            name={item.name}
            showName={direction === "horizontal"}
            onClick={() => {
              onSelect(index);
              if (item.onClick) {
                item.onClick();
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NavBar;