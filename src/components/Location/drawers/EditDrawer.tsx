import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Edit from "../contents/Edit";
import TariffSelectorDrawer from "./TariffSelectorDrawer";
import {
  useUpdateOneLocationMutation,
  useGetOneLocationQuery,
} from "@/redux/rtk-query/endpoints/admin/locations";
import { useAppSelector } from "@/redux/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { FacilityEnum, Location } from "@/interfaces";
import { useDrawer } from "@/hooks/useDrawer";

interface LocationDrawerProps {
  id: string;
}

const EditDrawer: React.FC<LocationDrawerProps> = ({ id }) => {
  const { closeCurrent } = useDrawer();
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
        closeCurrent();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Drawer id={id}>
      <Edit />
      <TariffSelectorDrawer id="locationTariff" />
    </Drawer>
  );
};

export default EditDrawer;
