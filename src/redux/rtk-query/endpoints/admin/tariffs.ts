import { ITariff } from "@/interfaces/index";
import { csmsClient } from "../../csms-client";

const locationApi = csmsClient.injectEndpoints({
  endpoints: (builder) => ({
    getOneTariff: builder.query<ITariff, string>({
      query: (id) => `/admin/tariffs/${id}`,
      providesTags: (result, error, id) => [{ type: "Tariffs", id }],
    }),

    listAllTariffs: builder.infiniteQuery<
      { id: string; name: string }[],
      void,
      { offset: number; limit: number }
    >({
      providesTags: () => [{ type: "Tariffs", id: "LIST" }],
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 10,
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          // Check if lastPage has data
          const currentPageData = lastPage;

          // If current page is empty or has no data, no more pages
          if (!currentPageData || currentPageData.length === 0) {
            return undefined;
          }

          // If the current page has fewer items than the limit, it's the last page
          if (currentPageData.length < lastPageParam.limit) {
            return undefined;
          }

          const nextOffset = lastPageParam.offset + lastPageParam.limit;

          return {
            ...lastPageParam,
            offset: nextOffset,
          };
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          const prevOffset = firstPageParam.offset - firstPageParam.limit;
          if (prevOffset < 0) return undefined;

          return {
            ...firstPageParam,
            offset: firstPageParam.offset - firstPageParam.limit,
          };
        },
      },
      query: (args) => {
        const { pageParam } = args;
        const { offset, limit } = pageParam;

        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
        });
        return `/admin/tariffs/list?${params.toString()}`;
      },
    }),

    createOneTariff: builder.mutation<void, ITariff>({
      query: (newLocation) => ({
        url: "/admin/tariffs",
        method: "POST",
        body: newLocation,
      }),
      invalidatesTags: [{ type: "Tariffs", id: "LIST" }],
    }),

    replaceOneTariff: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/admin/tariffs/${id}`,
        method: "PUT",
        body: { ...payload },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Tariffs", id },
        { type: "Tariffs", id: "LIST" },
      ],
    }),

    deleteOneTariff: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/tariffs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Tariffs", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateOneTariffMutation,
  useGetOneTariffQuery,
  useDeleteOneTariffMutation,
  useListAllTariffsInfiniteQuery,
  useReplaceOneTariffMutation,
} = locationApi;
