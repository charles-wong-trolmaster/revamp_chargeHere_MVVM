import { NavBarState } from "@/redux/features/navbar/navBarSlice";
import React from "react";
import IconButton, { IconButtonProps } from "./IconButton";
import { LocationSubNavBarIconButtonProps } from "@/redux/features/subNavBar/subNavBarSlice";

interface NavbarProps extends NavBarState {
  onSelect?: (
    selectedItem: IconButtonProps | LocationSubNavBarIconButtonProps,
    index: number
  ) => void;
  onHover?: (hoveredItem: IconButtonProps, index: number) => void;
  onUnHover?: (unHoveredItem: IconButtonProps, index: number) => void;
  onSubButtonClick?: (item: IconButtonProps, index: number) => void;
}

const NavBar = (props: NavbarProps) => {
  const {
    direction,
    items,
    selectedIndex,
    onSelect,
    onHover,
    onUnHover,
    onSubButtonClick,
  } = props;

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
                onClick={() => onSelect && onSelect(item, index)}
                onHover={() => onHover && onHover(item, index)}
                onUnHover={() => onUnHover && onUnHover(item, index)}
                // Sub button props
                subButtonText={item.subButtonText}
                showSubButton={item.showSubButton}
                subButtonIcon={item.subButtonIcon}
                subButtonPosition={item.subButtonPosition}
                subButtonTooltip={item.subButtonTooltip}
                onSubButtonClick={() =>
                  onSubButtonClick && onSubButtonClick(item, index)
                }
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default NavBar;
