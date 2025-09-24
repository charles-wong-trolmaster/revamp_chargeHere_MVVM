import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SubNavBarState {
  direction: "horizontal" | "vertical";
  items: unknown[];
  selectedIndex?: number;
  selectedStyle?: string; // Add this to store the current selected style
}

const initialState: SubNavBarState = {
  items: [],
  direction: "vertical",
  selectedIndex: undefined,
  selectedStyle: undefined, // Initialize as undefined or set a default style
};

export const subNavBarSlice = createSlice({
  name: "subNavBar",
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<"horizontal" | "vertical">) => {
      state.direction = action.payload;
    },
    setItems: (state, action: PayloadAction<unknown[]>) => {
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
export const { setDirection, setItems, setSelectedIndex, setSelectedStyle } =
  subNavBarSlice.actions;

export default subNavBarSlice.reducer;
