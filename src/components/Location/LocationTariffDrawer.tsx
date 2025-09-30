import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationTariffContent from "./components/LocationTariffContent";

interface LocationDrawerProps {
  id: string;
}

const LocationTariffDrawer: React.FC<LocationDrawerProps> = ({ id }) => {
  return (
    <Drawer id={id}>
      <LocationTariffContent drawerId={id} />
    </Drawer>
  );
};

export default LocationTariffDrawer;
