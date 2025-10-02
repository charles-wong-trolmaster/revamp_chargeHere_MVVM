import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import LocationEVSEContent from "../contents/Evse";
import LocationEditEVSEDrawer from "./EditEvseDrawer";
interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EvseDrawer: React.FC<LocationDrawerProps> = ({ id, widthMultiplier }) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationEVSEContent drawerId={id} />
      <LocationEditEVSEDrawer id="locationEditEVSE" />
    </Drawer>
  );
};

export default EvseDrawer;
