import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";
import CircularProgress from "@/components/CircularProgress";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const OnGoingResultList: React.FC<SessionSettingsContentProps> = () => {
  const { openChild } = useDrawer();

  return (
    <>
      <DrawerCloseButton />
      <h3>On Going</h3>

      <div
        style={{
          gap: "20px",
          padding: "20px",
          backgroundColor: "#111",
        }}
      >
        {/* Timer (green) */}

        {/* Battery/Power (green) */}
        <CircularProgress mode="power" value={99} secondaryText="125 kW" />

        {/* Time Mode - with total duration for progress calculation */}
        <CircularProgress
          mode="time"
          value={180} // 3 minutes left
          totalDuration={1800} // 2 hours total
        />

        {/* Time Mode - countdown only (no progress arc) */}
        <CircularProgress mode="time" value={5400} />
      </div>
      <button onClick={() => openChild("onGoingDetail")}>
        On Going Detail
      </button>
    </>
  );
};

export default OnGoingResultList;
