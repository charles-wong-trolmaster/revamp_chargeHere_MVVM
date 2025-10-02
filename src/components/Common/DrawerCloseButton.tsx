import { useDrawer } from "@/hooks/useDrawer";
import React from "react";

interface DrawerCloseButtonProps {
  className?: string;
}

const DrawerCloseButton: React.FC<DrawerCloseButtonProps> = ({
  className = "close",
}) => {
  const { closeCurrent, currentPath } = useDrawer();

  const handleClick = () => {
    console.log("🔴 DrawerCloseButton clicked with path:", currentPath);
    closeCurrent();
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      style={{
        background: "#dc3545",
        color: "white",
        border: "none",
        padding: "4px 8px",
        cursor: "pointer",
        borderRadius: "3px",
      }}
    >
      ×
    </button>
  );
};

export default DrawerCloseButton;
