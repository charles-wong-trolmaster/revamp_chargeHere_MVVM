import { csmsClient } from "../../csms-client";

export const settingAPI = csmsClient.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query({
      query: () => ({ url: `/admin/groups?memberCount=true` }),
      providesTags: () => [{ type: "Users", id: "groups" }],
    }),
    getUsers: build.query({
      query: () => ({ url: `/admin/users?showGroups=true` }),
      providesTags: () => [{ type: "Users", id: "users" }],
    }),
    createUser: build.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "Users", id: "users" }],
    }),

    createGroup: build.mutation({
      query: (groupName: string) => ({
        url: "/admin/groups",
        method: "POST",
        body: { name: groupName },
      }),
      invalidatesTags: [{ type: "Users", id: "groups" }],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useCreateGroupMutation,
} = settingAPI;
