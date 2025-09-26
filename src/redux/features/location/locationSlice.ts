import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  selectedLocationId?: string;
}

const initialState: LocationState = {
  selectedLocationId: undefined,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedLocationId: (state, action: PayloadAction<string>) => {
      state.selectedLocationId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedLocationId } = locationSlice.actions;

export default locationSlice.reducer;
