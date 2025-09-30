import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationUserGroupContent from "./components/LocationUserGroupContent";

interface LocationDrawerProps {
  id: string;
}

const LocationTariffDrawer: React.FC<LocationDrawerProps> = ({ id }) => {
  return (
    <Drawer id={id}>
      <LocationUserGroupContent drawerId={id} />
    </Drawer>
  );
};

export default LocationTariffDrawer;
