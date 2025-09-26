import {
  useListManyLocationsByStatusInfiniteQuery,
  useFindManyInAreaQuery,
} from "@/redux/rtk-query/endpoints/admin/locations"; // Adjust import path as needed
import { useAppSelector } from "@/redux/store";
import { getSelectedNavItem } from "@/redux/features/navbar/navBarSlice";
import { getSelectedSubNavItem } from "@/redux/features/subNavBar/subNavBarSlice";
import { Location } from "@/interfaces";

const useLocationItems = () => {
  // Get Redux state
  const navBarSelectedItem = useAppSelector(getSelectedNavItem);
  const subNavbarSelectedItem = useAppSelector(getSelectedSubNavItem);
  const searchQuery = useAppSelector((state) => state.searchBar.value);
  const bounds = useAppSelector((state) => state.map.bound);

  console.log(bounds);

  // Determine which API to use based on conditions
  const shouldUseBoundsAPI =
    navBarSelectedItem?.name === "Location" &&
    subNavbarSelectedItem?.name === "Active" &&
    searchQuery === "";
  console.log(navBarSelectedItem?.name === "Location");
  console.log(subNavbarSelectedItem?.name === "Active");
  console.log(shouldUseBoundsAPI);

  const shouldUseStatusAPI =
    navBarSelectedItem?.name === "Location" &&
    (subNavbarSelectedItem?.name === "Removed" ||
      subNavbarSelectedItem?.name === "Upcoming" ||
      (subNavbarSelectedItem?.name === "Active" && searchQuery !== ""));

  // Determine status parameter for status API
  const getStatusParam = () => {
    if (subNavbarSelectedItem?.name === "Active" && searchQuery !== "") {
      return "ACTIVE";
    }
    return subNavbarSelectedItem?.name.toUpperCase();
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
