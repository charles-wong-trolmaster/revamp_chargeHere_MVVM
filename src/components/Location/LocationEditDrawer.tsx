import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationEditContent from "./components/LocationEditContent";
import LocationTariffDrawer from "./LocationTariffDrawer";
import { useDrawer } from "../DrawerStack/DrawerStack";
import {
  useUpdateOneLocationMutation,
  useGetOneLocationQuery,
} from "@/redux/rtk-query/endpoints/admin/locations";
import { useAppSelector } from "@/redux/store";
import { skipToken } from "@reduxjs/toolkit/query";

interface LocationDrawerProps {
  id: string;
}

const LocationEditDrawer: React.FC<LocationDrawerProps> = ({ id }) => {
  const { closeDrawer } = useDrawer();
  const [updateLocation] = useUpdateOneLocationMutation();
  const selectedLocationId = useAppSelector(
    (state) => state.location.selectedLocationId
  );
  const { data: locationDetail } = useGetOneLocationQuery(
    selectedLocationId ?? skipToken,
    {
      skip: !selectedLocationId,
    }
  );
  const onSubmit = async (location: Location) => {
    await updateLocation(location)
      .unwrap()
      .then(() => {
        closeDrawer(id);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Drawer id={id}>
      <LocationEditContent drawerId={id} />
      <LocationTariffDrawer id="locationTariff" />
    </Drawer>
  );
};

export default LocationEditDrawer;
