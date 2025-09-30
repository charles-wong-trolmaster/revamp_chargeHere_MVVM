import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationPublishContent from "./components/LocationPublishContent";
import LocationUserGroupDrawer from "./LocationUserGroupDrawer";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationPublishDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationPublishContent drawerId={id} />
      <LocationUserGroupDrawer id="locationUserGroup" />
    </Drawer>
  );
};

export default LocationPublishDrawer;
