import React, { useState } from "react";

export interface IconButtonProps {
  isSelected?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
  onHover?: () => void;
  onUnHover?: () => void;
  onClick?: () => void;
  icon: string;
  name: string;
  showName?: boolean;
  style?: string;
}

const IconButton = (props: IconButtonProps) => {
  const {
    onClick,
    icon,
    name,
    showName = false,
    isSelected,
    showTooltip = true,
    tooltipText,
    onHover,
    onUnHover,
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onUnHover) {
      onUnHover();
    }
  };

  return (
    <div className="uk-position-relative">
      <button
        className="uk-button uk-button-default uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-padding-small uk-text-center"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          borderColor: isSelected ? "#32d296" : undefined,
          borderWidth: "2px",
          borderStyle: "solid",
          transition: "all 0.2s ease",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <img src={icon} width="20" height="20" />

        {showName && (
          <span className="uk-text-small uk-text-bold uk-display-block uk-margin-small-top">
            {name}
          </span>
        )}
      </button>

      {showTooltip && tooltipText && (
        <div
          className="uk-position-absolute uk-background-dark uk-text-white uk-padding-small uk-border-rounded uk-text-small"
          style={{
            top: "50%",
            right: "calc(100% + 10px)",
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            backgroundColor: "black",
          }}
        >
          {tooltipText}
          <div
            className="uk-position-absolute"
            style={{
              top: "50%",
              left: "100%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "5px solid #222",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default IconButton;
