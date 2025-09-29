import React from "react";
import { useAppDispatch } from "@/redux/store";
import { setDraftTariffDetail } from "@/redux/features/tariff/tariffSlice";
import { Scheme } from "@/entities";
import useTariffDetail from "@/hooks/useTariffDetail";

const TariffAddSchemeContainer = () => {
  const dispatch = useAppDispatch();
  const { data: tariffDetail } = useTariffDetail();

  const onClose = () => {
    console.log("Close Add Scheme Panel");
  };

  const onSubmit = (scheme: Scheme) => {
    console.log("Submit Update Tariff");
    if (tariffDetail) {
      dispatch(setDraftTariffDetail(tariffDetail.addScheme(scheme)));
    }
    onClose();
  };

  return <>Tariff Add Scheme Component</>;
};

export default TariffAddSchemeContainer;
