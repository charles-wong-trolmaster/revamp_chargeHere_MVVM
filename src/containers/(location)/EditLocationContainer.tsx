// import React from "react";
// import { Location } from "@/interfaces/index";
// import {
//   useGetOneLocationQuery,
//   useUpdateOneLocationMutation,
// } from "@/redux/rtk-query/endpoints/admin/locations";
// import { useDrawerActions } from "@/hooks/useDrawerActions";
// import { useAppSelector } from "@/redux/store";
// import { skipToken } from "@reduxjs/toolkit/query";

// const EditLocationContainer = () => {
//   const { closeCurrentDrawer } = useDrawerActions();
//   const [updateLocation] = useUpdateOneLocationMutation();
//   const selectedLocationId = useAppSelector(
//     (state) => state.location.selectedLocationId
//   );
//   const { data: locationDetail } = useGetOneLocationQuery(
//     selectedLocationId ?? skipToken,
//     {
//       skip: !selectedLocationId,
//     }
//   );
//   const onSubmit = async (location: Location) => {
//     await updateLocation(location)
//       .unwrap()
//       .then(() => {
//         closeCurrentDrawer();
//       })
//       .catch((error) => console.error(error));
//   };
//   return <>Add and Edit Location component</>;
// };

// export default EditLocationContainer;
