import { NavBarState } from "@/redux/features/navbar/navBarSlice";
import React, { useState } from "react";
import IconButton, { IconButtonProps } from "./IconButton";

interface NavbarProps extends NavBarState {
  onSelect: (selectedItem: IconButtonProps, index: number) => void;
}

const NavBar = (props: NavbarProps) => {
  const { direction, items, selectedIndex, onSelect } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <div className="uk-flex uk-background-muted uk-padding-small">
      <ul
        className={`uk-iconnav ${
          direction === "horizontal" ? "" : "uk-iconnav-vertical"
        }`}
      >
        {(items as IconButtonProps[]).map(
          (item: IconButtonProps, index: number) => (
            <li key={index}>
              <IconButton
                showTooltip={item.showTooltip}
                tooltipText={item.tooltipText}
                isSelected={selectedIndex === index}
                icon={item.icon}
                name={item.name}
                showName={direction === "horizontal"}
                onClick={() => {
                  if (!isSelected) {
                    setIsSelected(true);
                  }
                  onSelect(item, index);
                  // if (item.onClick) {
                  //   item.onClick();
                  // }
                }}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default NavBar;
