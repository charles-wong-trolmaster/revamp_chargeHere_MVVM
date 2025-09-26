import { csmsClient } from "../../csms-client";
import { Location } from "@/interfaces";

const locationApi = csmsClient.injectEndpoints({
  endpoints: (builder) => ({
    getOneLocation: builder.query<any, string>({
      query: (id) => `/admin/locations/${id}`,
      providesTags: (result, error, id) => [{ type: "Locations", id }],
    }),
    listManyLocationsByStatus: builder.infiniteQuery({
      query: (args) => {
        const {
          queryArg = { status: "", searchQuery: "" },
          pageParam = { offset: 0, limit: 1000 },
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

        return `/admin/locations/list?${params.toString()}`;
      },
      providesTags: () => [{ type: "Locations", id: "LIST" }],
      // This ensures different status/searchQuery combinations create separate cache entries
      serializeQueryArgs: ({ queryArgs }) => {
        const { status = "", searchQuery = "" } = queryArgs;
        return `locations-${status || "all"}-${searchQuery || "empty"}`;
      },

      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 1000,
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
    findManyInArea: builder.query<Location[], { status: string; polygon: any }>(
      {
        query: (arg) =>
          `/admin/locations/area?east=${arg.polygon.east}&south=${arg.polygon.south}&west=${arg.polygon.west}&north=${arg.polygon.north}&status=${arg.status}`,
      }
    ),
    createOneLocation: builder.mutation({
      query: (newLocation) => ({
        url: "/admin/locations",
        method: "POST",
        body: newLocation,
      }),
      invalidatesTags: [{ type: "Locations", id: "LIST" }],
    }),
    updateOneLocation: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/admin/locations/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Locations", id },
        { type: "Locations", id: "LIST" },
      ],
    }),
    updateOneEvse: builder.mutation({
      query: ({ locationId, evseId, ...payload }) => ({
        url: `/admin/locations/${locationId}/evse/${evseId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, { locationId }) => [
        { type: "Locations", id: locationId },
      ],
    }),
    getPresignedUploadURL: builder.query<any, string>({
      query: (filename) =>
        `/admin/locations/images/presigned-upload-url?filename=${filename}`,
    }),
    uploadImage: builder.mutation<void, { url: string; file: File }>({
      // highlight-start
      queryFn: async (arg) => {
        try {
          await fetch(arg.url, {
            method: "PUT",
            body: arg.file,
            headers: {
              "Content-Type": arg.file.type,
            },
          });
          return { data: undefined };
        } catch {
          return {
            error: undefined,
          };
        }
      },
    }),
  }),
});

export const {
  useGetOneLocationQuery,
  useListManyLocationsByStatusInfiniteQuery,
  useFindManyInAreaQuery,
  useCreateOneLocationMutation,
  useUpdateOneLocationMutation,
  useUpdateOneEvseMutation,
  useGetPresignedUploadURLQuery,
  useLazyGetPresignedUploadURLQuery,
  useUploadImageMutation,
} = locationApi;
