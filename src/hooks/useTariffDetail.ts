import { useAppSelector } from "@/redux/store";
import { useGetOneTariffQuery } from "@/redux/rtk-query/endpoints/admin/tariffs";
import { skipToken } from "@reduxjs/toolkit/query";
import { Tariff } from "@/entities";

const useTariffDetail = () => {
  // Get Redux state
  const selectedTariffId = useAppSelector(
    (state) => state.tariff.selectedTariffId
  );
  const draftTariffDetail = useAppSelector(
    (state) => state.tariff.draftTariffDetail
  );

  const { data: selectedTariffDetail } = useGetOneTariffQuery(
    selectedTariffId ?? skipToken,
    {
      skip: !selectedTariffId,
    }
  );

  const tariffDetail = draftTariffDetail
    ? draftTariffDetail
    : selectedTariffDetail
    ? Tariff.fromObject(selectedTariffDetail)
    : undefined;

  return {
    id: selectedTariffId,
    data: tariffDetail,
  };
};

export default useTariffDetail;
