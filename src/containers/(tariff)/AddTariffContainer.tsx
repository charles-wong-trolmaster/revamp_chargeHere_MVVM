import React from "react";
import { useAppDispatch } from "@/redux/store";
import { useCreateOneTariffMutation } from "@/redux/rtk-query/endpoints/admin/tariffs";
import {
  setDraftTariffDetail,
  setSelectedSchemeIndex,
} from "@/redux/features/tariff/tariffSlice";
import { Tariff } from "@/entities";

const LocationResultContainer = () => {
  const dispatch = useAppDispatch();
  const [createOneTariff] = useCreateOneTariffMutation();

  const onSchemeClick = (index: number) => {
    console.log("Open Edit Scheme Panel");
    dispatch(setSelectedSchemeIndex(index));
  };

  const onAddScheme = () => {
    console.log("Open Add Scheme Panel");
  };

  const onClose = () => {
    console.log("close add tariff panel");
    dispatch(setSelectedSchemeIndex(undefined));
    dispatch(setDraftTariffDetail(undefined));
  };

  const onSubmit = async (tariff: Tariff) => {
    console.log("Submit Add Tariff");
    await createOneTariff(tariff.toObject())
      .unwrap()
      .catch((e) => console.log(e))
      .finally(() => {
        onClose();
      });
  };

  return <>Tariff Result Component</>;
};

export default LocationResultContainer;
