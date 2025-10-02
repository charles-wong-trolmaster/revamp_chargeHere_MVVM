import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationCreationContent from "./components/LocationCreationContent";
import { useDrawer } from "../DrawerStack/DrawerStack";
import { useCreateOneLocationMutation } from "@/redux/rtk-query/endpoints/admin/locations";
import { Location } from "@/interfaces";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationCreationDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  const { closeDrawer } = useDrawer();
  const [createLocation] = useCreateOneLocationMutation();
  const onSubmit = async (location: Location) => {
    await createLocation(location)
      .unwrap()
      .then(() => {
        closeDrawer(id);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationCreationContent drawerId={id} />
    </Drawer>
  );
};

export default LocationCreationDrawer;
