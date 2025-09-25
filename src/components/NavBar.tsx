import { NavBarItem, NavBarState } from "@/redux/features/navbar/navBarSlice";
import React from "react";
import IconButton from "./IconButton";

interface NavbarProps extends NavBarState {
  onSelect: (selectedItem: NavBarItem, index: number) => void;
}

const NavBar = (props: NavbarProps) => {
  const { direction, items, selectedIndex, onSelect } = props;

  return (
    <div className="uk-flex uk-background-muted uk-padding-small">
      <ul
        className={`uk-iconnav ${
          direction === "horizontal" ? "" : "uk-iconnav-vertical"
        }`}
      >
        {(items as NavBarItem[]).map((item: NavBarItem, index: number) => (
          <li key={item.id || index}>
            <IconButton
              icon={item.icon}
              name={item.name}
              showName={direction === "horizontal"}
              onClick={() => {
                onSelect(item, index);
                // if (item.onClick) {
                //   item.onClick();
                // }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
