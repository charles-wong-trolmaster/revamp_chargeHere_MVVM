import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Station from "../contents/ResultList";
import PlannedDrawer from "./PlannedDrawer";
import StationUnconfiguredDrawer from "./UnconfiguredDrawer";
import AssignedDrawer from "./AssignedDrawer";
import UnassignedDrawer from "./UnassignedDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const ResultListDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Station drawerId={id} />
      <PlannedDrawer id="stationPlanned" />
      <AssignedDrawer id="stationAssigned" />
      <StationUnconfiguredDrawer id="stationUnconfigured" />
      <UnassignedDrawer id="stationUnassigned" />
    </Drawer>
  );
};

export default ResultListDrawer;
