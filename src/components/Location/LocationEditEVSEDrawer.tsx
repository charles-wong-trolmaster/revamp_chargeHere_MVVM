import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationEditEVSEContent from "./components/LocationEditEVSEContent";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationEditEVSEContent
        evseFormOnSubmit={() => console.log("submit evse form")}
      />
    </Drawer>
  );
};

export default LocationDrawer;
