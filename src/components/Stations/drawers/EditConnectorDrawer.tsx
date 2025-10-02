import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import StationEditConnectorContent from "../contents/EditConnectors";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EditConnectorDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <StationEditConnectorContent drawerId={id} />
    </Drawer>
  );
};

export default EditConnectorDrawer;
