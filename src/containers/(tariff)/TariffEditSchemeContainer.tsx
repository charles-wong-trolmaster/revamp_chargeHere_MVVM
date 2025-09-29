import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setDraftTariffDetail,
  setSelectedSchemeIndex,
} from "@/redux/features/tariff/tariffSlice";
import { Scheme } from "@/entities";
import useTariffDetail from "@/hooks/useTariffDetail";

const TariffEditSchemeContainer = () => {
  const dispatch = useAppDispatch();
  const selectedTariffSchemeIndex = useAppSelector(
    (state) => state.tariff.selectedSchemeIndex
  );
  const { data: tariffDetail } = useTariffDetail();

  const onClose = () => {
    console.log("Close Edit Scheme Panel");
    dispatch(setSelectedSchemeIndex(undefined));
  };

  const onSubmit = (scheme: Scheme) => {
    console.log("Submit Update Tariff");
    if (tariffDetail && selectedTariffSchemeIndex) {
      dispatch(
        setDraftTariffDetail(
          tariffDetail.removeScheme(selectedTariffSchemeIndex).addScheme(scheme)
        )
      );
    }
    onClose();
  };

  return <>Tariff Edit Scheme Component</>;
};

export default TariffEditSchemeContainer;
