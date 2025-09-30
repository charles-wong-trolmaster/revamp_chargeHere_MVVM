import {
  useListManyLocationsByStatusInfiniteQuery,
  useFindManyInAreaQuery,
} from "@/redux/rtk-query/endpoints/admin/locations"; // Adjust import path as needed
import { useAppSelector } from "@/redux/store";
import { getSelectedNavItem } from "@/redux/features/navbar/navBarSlice";
import { Location } from "@/interfaces";

const useLocationItems = () => {
  // Get Redux state
  const navBarSelectedItem = useAppSelector(getSelectedNavItem);
  const locationSubNavbarSelectedItemIndex = useAppSelector(
    (state) => state.subNavBar.selectedItemIndex?.["location"]
  );
  const searchQuery = useAppSelector((state) => state.searchBar.value);
  const bounds = useAppSelector((state) => state.map.bound);

  // Determine which API to use based on conditions
  const shouldUseBoundsAPI =
    navBarSelectedItem?.id === "location" &&
    locationSubNavbarSelectedItemIndex === 0 &&
    searchQuery === "";

  const shouldUseStatusAPI =
    navBarSelectedItem?.id === "location" &&
    (locationSubNavbarSelectedItemIndex === 1 ||
      locationSubNavbarSelectedItemIndex === 2 ||
      (locationSubNavbarSelectedItemIndex === 0 && searchQuery !== ""));

  // Determine status parameter for status API
  const getStatusParam = () => {
    if (locationSubNavbarSelectedItemIndex === 0 && searchQuery !== "") {
      return "ACTIVE";
    } else if (locationSubNavbarSelectedItemIndex === 1) {
      return "REMOVED";
    } else if (locationSubNavbarSelectedItemIndex === 2) {
      return "UPCOMING";
    }
  };

  // Use RTK Query hooks conditionally
  const boundsQuery = useFindManyInAreaQuery(
    {
      status: "ACTIVE", // assuming you want active locations for bounds query
      polygon: bounds,
    },
    { skip: !shouldUseBoundsAPI }
  );

  const statusQuery = useListManyLocationsByStatusInfiniteQuery(
    {
      status: getStatusParam(),
      searchQuery: searchQuery !== "" ? searchQuery : "",
    },
    { skip: !shouldUseStatusAPI }
  );

  // Return the active query result
  if (shouldUseBoundsAPI) {
    return {
      locationItems: boundsQuery.data || [],
      isLoading: boundsQuery.isLoading,
      error: boundsQuery.error,
      refetch: boundsQuery.refetch,
      isFetchingNextPage: false,
      hasNextPage: false,
    };
  }

  if (shouldUseStatusAPI) {
    // For infinite query, we need to flatten the pages
    const flattenedData: Location[] =
      statusQuery.data?.pages?.flatMap((page) => page?.data || page) || [];

    return {
      locationItems: flattenedData,
      isLoading: statusQuery.isLoading,
      error: statusQuery.error,
      refetch: statusQuery.refetch,
      // Additional infinite query methods
      fetchNextPage: statusQuery.fetchNextPage,
      hasNextPage: statusQuery.hasNextPage,
      isFetchingNextPage: statusQuery.isFetchingNextPage,
    };
  }

  // Default return when Location is not selected
  return {
    locationItems: [],
    isLoading: false,
    error: null,
    refetch: () => {},
    fetchNextPage: () => {},
    hasNextPage: false,
    isFetchingNextPage: false,
  };
};

export default useLocationItems;
