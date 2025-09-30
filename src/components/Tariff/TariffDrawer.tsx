import React, { useMemo } from "react";
import Drawer from "../DrawerStack/Drawer";
import TariffContent from "./components/TariffContent";
import TariffDetailDrawer from "./TariffDetailDrawer";
import TariffCreationDrawer from "./TariffCreationDrawer";
import { Tariff } from "@/entities";
import {
  setSelectedTariffId,
  setDraftTariffDetail,
} from "@/redux/features/tariff/tariffSlice";
import { useListAllTariffsInfiniteQuery } from "@/redux/rtk-query/endpoints/admin/tariffs";
import { useAppDispatch } from "@/redux/store";
interface SessionSecurityDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffDrawer: React.FC<SessionSecurityDrawerProps> = ({
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
      <TariffContent drawerId={id} />
      <TariffDetailDrawer id={"tariffDetail"} />
      <TariffCreationDrawer id={"tariffCreation"} />
    </Drawer>
  );
};

export default TariffDrawer;
