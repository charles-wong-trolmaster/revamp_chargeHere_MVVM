// components/MultiLevelDrawer/DrawerPanel.tsx
import React from "react";
import type { DrawerLevel } from "@/containers/DrawersContainer";

interface DrawerPanelProps {
  level: DrawerLevel;
  levelIndex: number;
  isOpen: boolean;
  width: number;
  spacing: number;
  height: number;
  isLast: boolean;
}

const DrawerPanel: React.FC<DrawerPanelProps> = ({
  level,
  levelIndex,
  isOpen,
  width,
  spacing,
  height,
  isLast,
}) => {
  const panelStyle: React.CSSProperties = {
    width: isOpen ? `${width}px` : "0px",
    marginRight: isOpen && !isLast ? `${spacing}px` : "0px",
    height: `${height - 20}px`, // Account for container padding
  };

  return (
    <div
      className={`drawer-panel ${isOpen ? "open" : "closed"} ${
        level.className || ""
      }`}
      style={panelStyle}
    >
      <div className="drawer-content">
        {level.title && <h4 className="drawer-title">{level.title}</h4>}
        <div className="drawer-component">{level.component}</div>
      </div>
    </div>
  );
};

export default DrawerPanel;
