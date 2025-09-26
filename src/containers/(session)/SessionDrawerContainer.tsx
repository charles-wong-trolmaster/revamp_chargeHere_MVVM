import React from "react";
import { useDrawerActions } from "@/hooks/useDrawerActions";
import type { DrawerLevel } from "@/hooks/useDrawerActions";
import SessionDrawer from "@/components/SessionDrawer";
import {
  useListManyCDRsInfiniteQuery,
  useListManyOnGoingInfiniteQuery,
} from "@/redux/rtk-query/endpoints/admin/sessions";

const SessionDrawerContainer = () => {
  const { openSubDrawer, closeCurrentDrawer } = useDrawerActions();
  const {
    data: onGoingData,
    isLoading: loadingOnGoing,
    fetchNextPage: fetchOnGoingNextPage,
    hasNextPage: onGoingHasNextPage,
    isFetchingNextPage: onGoingIsFetchingNextPage,
  } = useListManyOnGoingInfiniteQuery({});
  const {
    data: cdrsData,
    isLoading: loadingCDRs,
    fetchNextPage: cdrsFetchNextPage,
    hasNextPage: cdrsHasNextPage,
    isFetchingNextPage: cdrsIsFetchingNextPage,
  } = useListManyCDRsInfiniteQuery({});

  const allOnGoingList =
    onGoingData?.pages?.flatMap((page) => page.data || page) || [];

  const allCdrsList =
    cdrsData?.pages?.flatMap((page) => page.data || page) || [];

  return <>session drawer</>;
};

export default SessionDrawerContainer;
