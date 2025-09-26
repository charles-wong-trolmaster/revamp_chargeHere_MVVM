import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import LocationDetailDrawer from "@/components/LocationDetailDrawer";
import { useAppSelector } from "@/redux/store";
import { useGetOneLocationQuery } from "@/redux/rtk-query/endpoints/admin/locations";
import { skipToken } from "@reduxjs/toolkit/query";

const LocationDetailDrawerContainer = () => {
  const { openSubDrawer, closeCurrentDrawer, closeCurrentSubDrawer } =
    useDrawerActions();
  const selectedLocationId = useAppSelector(
    (state) => state.location.selectedLocationId
  );
  const { data: locationDetail } = useGetOneLocationQuery(
    selectedLocationId ?? skipToken,
    {
      skip: !selectedLocationId,
    }
  );
  const locationSubDetailDrawer: DrawerLevel = {
    id: "location-sub-detail",
    component: <div>Location Sub Detail Content</div>,
  };

  const editLocationDrawer: DrawerLevel = {
    id: "edit-location",
    component: <div>Edit Location</div>,
  };

  const editEVSEDrawer: DrawerLevel = {
    id: "edit-evse",
    component: <div>Edit EVSE</div>,
  };

  const viewGalleryDrawer: DrawerLevel = {
    id: "view-gallery",
    component: <div>View Gallery</div>,
  };

  const onItemClick = () => {
    openSubDrawer(locationSubDetailDrawer);
  };

  const onItemEditLocation = () => {
    closeCurrentSubDrawer();
    openSubDrawer(editLocationDrawer);
  };

  const onItemEditEVSE = () => {
    closeCurrentSubDrawer();
    openSubDrawer(editEVSEDrawer);
  };

  const onItemViewPhotos = () => {
    closeCurrentSubDrawer();
    openSubDrawer(viewGalleryDrawer);
  };

  return (
    <LocationDetailDrawer
      title="Location Detail"
      locationDetail={locationDetail}
      onClose={closeCurrentDrawer}
      onItemClick={onItemClick}
    />
  );
};

export default LocationDetailDrawerContainer;
