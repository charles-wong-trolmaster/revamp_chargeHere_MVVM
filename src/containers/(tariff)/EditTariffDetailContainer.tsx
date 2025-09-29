import React from "react";
import { useAppDispatch } from "@/redux/store";
import {
  useDeleteOneTariffMutation,
  useReplaceOneTariffMutation,
} from "@/redux/rtk-query/endpoints/admin/tariffs";
import {
  setDraftTariffDetail,
  setSelectedSchemeIndex,
  setSelectedTariffId,
} from "@/redux/features/tariff/tariffSlice";
import { ITariff, Tariff } from "@/entities";
import useTariffDetail from "@/hooks/useTariffDetail";

const LocationResultContainer = () => {
  const dispatch = useAppDispatch();
  const { id: selectedTariffId, data: tariffDetail } = useTariffDetail();
  const [replaceTariff] = useReplaceOneTariffMutation();
  const [deleteTariff] = useDeleteOneTariffMutation();

  const onSchemeClick = (index: number) => {
    console.log("Open Edit Scheme Panel");
    dispatch(setSelectedSchemeIndex(index));
  };

  const onAddScheme = () => {
    console.log("Open Add Scheme Panel");
  };

  const onClose = () => {
    console.log("close edit scheme panel");
    dispatch(setSelectedTariffId(undefined));
    dispatch(setSelectedSchemeIndex(undefined));
    dispatch(setDraftTariffDetail(undefined));
  };

  const onSubmit = async (iTariff: ITariff) => {
    console.log("Submit Update Tariff");
    await replaceTariff({
      id: selectedTariffId,
      payload: Tariff.fromObject(iTariff),
    })
      .unwrap()
      .catch((e) => console.log(e))
      .finally(() => {
        onClose();
      });
  };

  const onDelete = async () => {
    console.log("delete tariff");
    await deleteTariff({
      id: selectedTariffId,
    })
      .unwrap()
      .catch((e) => console.log(e))
      .finally(() => {
        onClose();
      });
  };

  return <>Tariff Result Component</>;
};

export default LocationResultContainer;
