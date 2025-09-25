import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MapState {
  bound?: number[];
  items: unknown[];
  selectedIndex?: number;
  selectedStyle: string;
}

const initialState: MapState = {
  bound: undefined,
  items: [],
  selectedIndex: undefined,
  selectedStyle: "mapbox://styles/kentrolmaster/cmf0h2uq401ji01pg5yoh842h", // Initialize as undefined or set a default style
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
    setSelectedStyle: (state, action: PayloadAction<string>) => {
      state.selectedStyle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBound, setitems, setSelectedIndex, setSelectedStyle } =
  mapSlice.actions;

export default mapSlice.reducer;
