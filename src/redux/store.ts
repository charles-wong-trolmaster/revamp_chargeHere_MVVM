import { configureStore } from "@reduxjs/toolkit";
import navBarReducer from "./features/navbar/navBarSlice";
import mapReducer from "./features/map/mapSlice";
import searchBarReducer from "./features/searchBar/searchBarSlice";
import subNavBarReducer from "./features/subNavBar/subNavBarSlice";
import locationResultReducer from "./features/location/locationResultSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { csmsClient } from "./rtk-query/csms-client";

export const store = configureStore({
  reducer: {
    [csmsClient.reducerPath]: csmsClient.reducer,
    map: mapReducer,
    navBar: navBarReducer,
    searchBar: searchBarReducer,
    subNavBar: subNavBarReducer,
    locationResult: locationResultReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(csmsClient.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
