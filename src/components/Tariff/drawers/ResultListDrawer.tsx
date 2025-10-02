import React, { useMemo } from "react";
import DetailsDrawer from "./DetailsDrawer";
import CreationDrawer from "./CreationDrawer";
import { Tariff } from "@/entities";
import {
  setSelectedTariffId,
  setDraftTariffDetail,
} from "@/redux/features/tariff/tariffSlice";
import { useListAllTariffsInfiniteQuery } from "@/redux/rtk-query/endpoints/admin/tariffs";
import { useAppDispatch } from "@/redux/store";
import Drawer from "@/components/DrawerStack/Drawer";
import ResultList from "../contents/ResultList";
interface SessionSecurityDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const ResultListDrawer: React.FC<SessionSecurityDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
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

  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <ResultList drawerId={id} />
      <DetailsDrawer id={"tariffDetail"} />
      <CreationDrawer id={"tariffCreation"} />
    </Drawer>
  );
};

export default ResultListDrawer;
