import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import SessionDrawer from "@/components/SessionDrawer";

const SessionDrawerContainer = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();

  const sessionDetailDrawer: DrawerLevel = {
    id: "session-detail",
    component: <div>Session Detail Content</div>, // Replace with actual component
  };

  return (
    <SessionDrawer title="Session" items={[]} onClose={closeCurrentDrawer} />
  );
};

export default SessionDrawerContainer;
