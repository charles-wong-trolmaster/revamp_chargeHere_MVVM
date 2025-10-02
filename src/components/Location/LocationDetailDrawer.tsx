import React from "react";
import Drawer from "../DrawerStack/Drawer";
import LocationDetailContent from "./components/LocationDetailContent";
import LocationGalleryDrawer from "./LocationGalleryDrawer";
import LocationEditDrawer from "./LocationEditDrawer";
import LocationEVSEDrawer from "./LocationEVSEDrawer";
import LocationPublishDrawer from "./LocationPublishDrawer";
import { useAppSelector } from "@/redux/store";
import { useGetOneLocationQuery } from "@/redux/rtk-query/endpoints/admin/locations";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDrawer } from "@/hooks/useDrawer";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const LocationDetailDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  const { openChild, closeCurrent } = useDrawer();
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
    openChild("publish");
  };

  const onItemEditLocation = () => {
    openChild("edit");
  };

  const onItemEVSE = () => {
    openChild("EVSE");
  };

  const onItemGallery = () => {
    openChild("gallery");
  };
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <LocationDetailContent
        drawerId={id}
        title={"Location Detail"}
        itemDetail={locationDetail}
        onClose={() => closeCurrent()}
      />
      <LocationGalleryDrawer id="gallery" />
      <LocationEditDrawer id="edit" />
      <LocationEVSEDrawer id="EVSE" />
      <LocationPublishDrawer id="publish" />
    </Drawer>
  );
};

export default LocationDetailDrawer;
