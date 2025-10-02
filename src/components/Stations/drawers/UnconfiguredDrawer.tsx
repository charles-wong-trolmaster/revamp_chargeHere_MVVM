import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Unconfigured from "../contents/Unconfigured";
import EditConnectorDrawer from "./EditConnectorDrawer";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const UnconfiguredDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Unconfigured drawerId={id} />
      <EditConnectorDrawer id="stationEditConnector" />
    </Drawer>
  );
};

export default UnconfiguredDrawer;
