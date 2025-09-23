import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MapState {
  bound?: number[];
  items: unknown[];
  selectedIndex?: number;
}

const initialState: MapState = {
  bound: undefined,
  items: [],
  selectedIndex: undefined,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setBound: (state, action: PayloadAction<number[]>) => {
      state.bound = action.payload;
    },
    setitems: (state, action: PayloadAction<unknown[]>) => {
      state.items = action.payload;
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBound, setitems, setSelectedIndex } = mapSlice.actions;

export default mapSlice.reducer;
