import { CDR, IOneSessionDetail } from "@/interfaces/common.type";
import { csmsClient } from "../../csms-client";

const sessionApi = csmsClient.injectEndpoints({
  endpoints: (builder) => ({
    listManyOnGoing: builder.infiniteQuery({
      query: (args) => {
        const { pageParam = { offset: 0, limit: 10 } } = args;
        const { offset, limit } = pageParam;
        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
        });

        return `/admin/sessions?${params.toString()}`;
      },
      providesTags: () => [{ type: "Sessions", id: "LIST" }],
      // This ensures different status/searchQuery combinations create separate cache entries
      serializeQueryArgs: () => {
        return `sessions`;
      },

      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 10,
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
    listManyCDRs: builder.infiniteQuery({
      query: (args) => {
        const { pageParam = { offset: 0, limit: 10 } } = args;
        const { offset, limit } = pageParam;
        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
        });

        return `/admin/cdrs?${params.toString()}`;
      },
      providesTags: () => [{ type: "Sessions", id: "LIST" }],
      // This ensures different status/searchQuery combinations create separate cache entries
      serializeQueryArgs: () => {
        return `cdrs`;
      },

      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 10,
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
    getOneOnGoing: builder.query<IOneSessionDetail, string>({
      query: (sessionId) => `/admin/sessions/${sessionId}`,
      providesTags: (result, error, id) => [{ type: "Sessions", id }],
    }),
    getOneCDRs: builder.query<CDR, string>({
      query: (cdrId) => `/admin/cdrs/${cdrId}`,
      providesTags: (result, error, id) => [{ type: "Sessions", id }],
    }),
  }),
});

export const {
  useListManyOnGoingInfiniteQuery,
  useListManyCDRsInfiniteQuery,
  useGetOneOnGoingQuery,
  useGetOneCDRsQuery,
} = sessionApi;
