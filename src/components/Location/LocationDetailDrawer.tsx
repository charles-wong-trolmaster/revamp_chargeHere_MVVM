import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationDetailContent from "./components/LocationDetailContent";
import LocationGalleryDrawer from "./LocationGalleryDrawer";
import LocationEditDrawer from "./LocationEditDrawer";
import LocationEVSEDrawer from "./LocationEVSEDrawer";
import LocationPublishDrawer from "./LocationPublishDrawer";
import { useAppSelector } from "@/redux/store";
import { useDrawer } from "../DrawerStack/DrawerStack";
import { useGetOneLocationQuery } from "@/redux/rtk-query/endpoints/admin/locations";
import { skipToken } from "@reduxjs/toolkit/query";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationDetailDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const selectedLocationId = useAppSelector(
    (state) => state.location.selectedLocationId
  );
  const { data: locationDetail } = useGetOneLocationQuery(
    selectedLocationId ?? skipToken,
    {
      skip: !selectedLocationId,
    }
  );

  const onItemPublish = () => {
    console.log("selectedLocationId");
    console.log(selectedLocationId);
    console.log("location detail");
    console.log(locationDetail);
    openDrawer("locationPublish");
  };

  const onItemEditLocation = () => {
    openDrawer("locationEdit");
  };

  const onItemEVSE = () => {
    openDrawer("locationEVSE");
  };

  const onItemGallery = () => {
    openDrawer("locationGallery");
  };
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationDetailContent drawerId={id} />
      <LocationGalleryDrawer id="locationGallery" />
      <LocationEditDrawer id="locationEdit" />
      <LocationEVSEDrawer id="locationEVSE" />
      <LocationPublishDrawer id="locationPublish" />
    </Drawer>
  );
};

export default LocationDetailDrawer;
