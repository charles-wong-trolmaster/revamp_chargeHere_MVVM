import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import Drawer from "@/components/Drawer";

interface SessionDrawerContainerProps {}

const SessionDrawerContainer: React.FC<SessionDrawerContainerProps> = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();

  const sessionDetailDrawer: DrawerLevel = {
    id: "session-detail",
    component: <div>Session Detail Content</div>, // Replace with actual component
  };

  const handleItemClick = () => {
    openSubDrawer(sessionDetailDrawer);
  };

  return (
    <Drawer
      title="Session"
      onClose={closeCurrentDrawer}
      onItemClick={handleItemClick}
    />
  );
};

export default SessionDrawerContainer;
