import React from "react";
import { Location } from "@/interfaces/index";
import { useCreateOneLocationMutation } from "@/redux/rtk-query/endpoints/admin/locations";
import { useDrawerActions } from "@/hooks/useDrawerActions";

const AddLocationDrawerContainer = () => {
  const { closeCurrentDrawer } = useDrawerActions();
  const [createLocation] = useCreateOneLocationMutation();
  const onSubmit = async (location: Location) => {
    await createLocation(location)
      .unwrap()
      .then(() => {
        closeCurrentDrawer();
      })
      .catch((error) => console.error(error));
  };
  return <>Add and Edit Location component</>;
};

export default AddLocationDrawerContainer;
