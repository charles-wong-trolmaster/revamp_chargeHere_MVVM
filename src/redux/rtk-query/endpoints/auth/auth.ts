import { csmsClient } from "../../csms-client";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  expires_at: string;
  refresh_expires_at: string;
  user?: {
    id: string;
    username: string;
    email?: string;
  };
}

export const authApi = csmsClient.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          "X-Realm": "chargehere.io",
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("refresh_token")}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } =
  authApi;
