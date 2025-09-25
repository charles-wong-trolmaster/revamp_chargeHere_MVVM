import React from "react";

interface IconButtonProps {
  isSelected: boolean;
  isHovered: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
  onHover?: () => void;
  onClick?: () => void;
  icon: string;
  name?: string;
  showName?: boolean;
}

const IconButton = (props: IconButtonProps) => {
  const { onClick, icon, name, showName = false } = props;

  return (
    <button
      className="uk-button uk-button-default uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-padding-small uk-text-center"
      onClick={onClick}
    >
      <img src={icon} width="20" height="20" />

      {showName && (
        <span className="uk-text-small uk-text-bold uk-display-block uk-margin-small-top">
          {name}
        </span>
      )}
    </button>
  );
};

export default IconButton;
