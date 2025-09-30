import React, { useState } from "react";

export interface IconButtonProps {
  id?: string;
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
  // SubButton props
  subIconButton?: React.ReactNode;
  showSubButton?: boolean;
  subButtonPosition?: "top" | "bottom" | "left" | "right";
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
    subIconButton,
    showSubButton = false,
    subButtonPosition = "top",
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

  const getSubButtonPositionStyles = () => {
    const offset = "8px";

    switch (subButtonPosition) {
      case "top":
        return {
          bottom: `calc(100% + ${offset})`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          top: `calc(100% + ${offset})`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          right: `calc(100% + ${offset})`,
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          left: `calc(100% + ${offset})`,
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return {
          bottom: `calc(100% + ${offset})`,
          left: "50%",
          transform: "translateX(-50%)",
        };
    }
  };

  return (
    <div className="uk-position-relative">
      {/* Main Button */}
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

      {showSubButton && (
        <div
          className="uk-position-absolute uk-flex uk-flex-middle uk-flex-center uk-padding-small"
          // onClick={handleSubButtonClick}
          // onMouseEnter={() => setIsSubButtonHovered(true)}
          // onMouseLeave={() => setIsSubButtonHovered(false)}
          style={{
            fontSize: "11px",
            borderRadius: "6px",
            zIndex: 10,
            // transform: isSubButtonHovered ? "scale(1.05)" : "scale(1)",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            ...getSubButtonPositionStyles(),
          }}
        >
          {subIconButton}
        </div>
      )}

      {/* Main Tooltip */}
      {showTooltip && tooltipText && isHovered && (
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
