import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationEditContent from "./components/LocationEditContent";
import LocationTariffDrawer from "./LocationTariffDrawer";

interface LocationDrawerProps {
  id: string;
}

const LocationEditDrawer: React.FC<LocationDrawerProps> = ({ id }) => {
  return (
    <Drawer id={id}>
      <LocationEditContent drawerId={id} />
      <LocationTariffDrawer id="locationTariff" />
    </Drawer>
  );
};

export default LocationEditDrawer;
