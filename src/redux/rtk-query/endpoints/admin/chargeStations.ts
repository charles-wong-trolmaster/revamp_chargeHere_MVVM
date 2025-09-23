import { IChargingStation } from "@/interfaces/common.type";
import { csmsClient } from "../../csms-client";

const chargeStationApi = csmsClient.injectEndpoints({
  endpoints: (builder) => ({
    getOneChargeStation: builder.query<IChargingStation, string>({
      query: (id) => `/admin/stations/${id}`,
      providesTags: (result, error, id) => [{ type: "ChargeStations", id }],
    }),
    listManyChargeStationsByStatus: builder.infiniteQuery({
      query: (args) => {
        const {
          queryArg = { status: "", searchQuery: "" },
          pageParam = { offset: 0, limit: 100 },
        } = args;
        const { offset, limit } = pageParam;

        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
        });

        // Only add status and searchQuery if they have values
        if (queryArg.status) {
          params.append("status", queryArg.status);
        }
        if (queryArg.searchQuery) {
          params.append("searchQuery", queryArg.searchQuery);
        }

        return `/admin/stations/list?${params.toString()}`;
      },
      providesTags: () => [{ type: "ChargeStations", id: "LIST" }],
      // This ensures different status/searchQuery combinations create separate cache entries
      serializeQueryArgs: ({ queryArgs }) => {
        const { status = "", searchQuery = "" } = queryArgs;
        return `chargeStations-${status || "all"}-${searchQuery || "empty"}`;
      },

      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 100,
        },

        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          // Check if lastPage has data
          const currentPageData = lastPage?.data || lastPage;

          // If current page is empty or has no data, no more pages
          if (!currentPageData || currentPageData.length === 0) {
            return undefined;
          }

          // If the current page has fewer items than the limit, it's the last page
          if (currentPageData.length < lastPageParam.limit) {
            return undefined;
          }

          const nextOffset = lastPageParam.offset + lastPageParam.limit;

          // Optional: If you have a total count, check against it
          if (lastPage?.numFound && nextOffset >= lastPage.numFound) {
            return undefined;
          }

          return {
            offset: nextOffset,
            limit: lastPageParam.limit,
          };
        },

        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          const prevOffset = firstPageParam.offset - firstPageParam.limit;
          if (prevOffset < 0) return undefined;

          return {
            offset: prevOffset,
            limit: firstPageParam.limit,
          };
        },
      },
    }),
    unassignLocation: builder.mutation({
      query: ({ chargeStationId }) => ({
        url: `/admin/stations/${chargeStationId}/location`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "ChargeStations", id: "LIST" }],
    }),
    addEvseConnecctors: builder.mutation({
      query: ({ chargeStationId, evse_uid, ...payload }) => ({
        url: `/admin/stations/${chargeStationId}/evse/${evse_uid}/connector`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (
        result,
        error,
        { chargeStation_id, isBatch = false }
      ) => {
        if (!isBatch) {
          return [
            { type: "ChargeStations", id: "LIST" },
            { type: "ChargeStations", id: chargeStation_id },
          ];
        }
        return [];
      },
    }),
    updateEvseConnectors: builder.mutation({
      query: ({ chargeStationId, evse_uid, connector_id, ...payload }) => ({
        url: `/admin/stations/${chargeStationId}/evse/${evse_uid}/connector/${connector_id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, { chargeStation_id }) => [
        { type: "ChargeStations", id: "LIST" },
        { type: "ChargeStations", chargeStation_id },
      ],
    }),
    assignOneChargingStationToLocation: builder.mutation({
      query: ({ chargeStation_id, location_id }) => ({
        url: `/admin/stations/${chargeStation_id}/location/${location_id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { chargeStation_id }) => [
        { type: "ChargeStations", chargeStation_id },
      ],
    }),
    enrollOneChargingStation: builder.mutation({
      query: () => ({
        url: `/admin/stations`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "ChargeStations", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOneChargeStationQuery,
  useListManyChargeStationsByStatusInfiniteQuery,
  useUnassignLocationMutation,
  useAddEvseConnecctorsMutation,
  useUpdateEvseConnectorsMutation,
  useAssignOneChargingStationToLocationMutation,
  useEnrollOneChargingStationMutation,
} = chargeStationApi;
