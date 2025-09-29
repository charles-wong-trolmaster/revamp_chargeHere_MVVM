import React, { useMemo } from "react";
import { useAppDispatch } from "@/redux/store";
import { useListAllTariffsInfiniteQuery } from "@/redux/rtk-query/endpoints/admin/tariffs";
import {
  setDraftTariffDetail,
  setSelectedTariffId,
} from "@/redux/features/tariff/tariffSlice";
import { Tariff } from "@/entities";

const LocationResultContainer = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useListAllTariffsInfiniteQuery();

  const tariffDataList = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);

  const onScrollToBottom = () => {
    console.log("scrolled to bottom");
  };

  const onClose = () => {
    console.log("Closing Tariff Result Container");
  };

  const onItemClick = (item: Tariff) => {
    if (item.id) {
      dispatch(setSelectedTariffId(item.id));
    }
  };

  const onAddTariff = () => {
    dispatch(
      setDraftTariffDetail(
        new Tariff(
          "KH", // countryCode
          "sgm", // partyId
          "T002", // id
          "KHR", // currency
          "",
          "",
          "test-updater", // lastUpdatedBy
          "test-creator" // createdBy)))
        )
      )
    );
  };

  return <>Tariff Result Component</>;
};

export default LocationResultContainer;
