import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Details from "../contents/Details";
import ImageGalleryDrawer from "./ImageGalleryDrawer";
import EditDrawer from "./EditDrawer";
import EvseDrawer from "./EvseDrawer";
import PublishDrawer from "./PublishDrawer";
import { useAppSelector } from "@/redux/store";
import { useGetOneLocationQuery } from "@/redux/rtk-query/endpoints/admin/locations";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDrawer } from "@/hooks/useDrawer";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const DetailsDrawer: React.FC<LocationDrawerProps> = ({
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
      <Details
        drawerId={id}
        title={"Location Detail"}
        itemDetail={locationDetail}
        onClose={() => closeCurrent()}
      />
      <ImageGalleryDrawer id="gallery" />
      <EditDrawer id="edit" />
      <EvseDrawer id="EVSE" />
      <PublishDrawer id="publish" />
    </Drawer>
  );
};

export default DetailsDrawer;
