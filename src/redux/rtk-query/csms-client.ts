// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const csmsClient = createApi({
  reducerPath: "csms",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.16.163.157:2443/kh/sgm/api",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJtMUFkZ0MtZThqRGljbHRpYzFaMkJaZzRJNWFqM2NMU29aZ1N4aEYwbjNvIn0.eyJleHAiOjE3NTA0MDQ5NDYsImlhdCI6MTc1MDQwNDY0NiwianRpIjoiODJjMjJlMDgtYjJiMy00MDQ2LTk1NDYtMTNhYWM3YWUzMmQyIiwiaXNzIjoiaHR0cHM6Ly8xNzIuMTYuMTYzLjE1Nzo4NDQzL3JlYWxtcy9raC1zZ20iLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiZDM3MzNmMzEtMjRmMS00YmJhLThjZTEtMDM0NTMwMTVkZGVhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY3NtcyIsInNpZCI6IjlhODUzNDEzLWJmYjktNGIwMi05N2M0LTI4ZGQ5ZTM2NzRiNiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMta2gtc2dtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXVzZXJzIiwidmlldy11c2VycyIsInF1ZXJ5LWdyb3VwcyIsInF1ZXJ5LXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1ncm91cHMiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsImRlbGV0ZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiTWFudGEgTEkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJNYW50YSIsImZhbWlseV9uYW1lIjoiTEkiLCJlbWFpbCI6Im1hbnRhMTIyMEBnbWFpbC5jb20ifQ.GQUg0t8XF1uH-fey0EYi3VZN-t4nx45vuXrYSuTlOCEZhVFRDNSibHFFIbfiEd8sHTnz4ttVvxtkr3fY15BbeyZhZU6s060OMT2Q0283ydYVkxh_jwdnWfoi-_l3yd7ivq1HQ4CM2bTjcDyyPAuHBQ1tDDk1vKjTqdERVea2tU8GfYRhIWrQQsVj7RToPK5ebBPU-mxNmf5go9O71onqieb5mKj5DQgjx1h3VrsEXHDPZvTnv5ZCYF-nczs8enBeoe4E1Y2ExQCuNpPh0zRDwAp_wz8GXbRFWdEq1chHQ-KRGsiisza73VpMee63rVfpKKA3k_Xm_LCwa9kvm31RBQ",
    },
  }),
  tagTypes: [
    "Locations",
    "ChargeStations",
    "Sessions",
    "Users",
    "Tariffs",
    "Auth",
  ],
  endpoints: () => ({}),
});
