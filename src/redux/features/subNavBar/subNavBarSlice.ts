import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SubNavBarState {
  direction: "horizontal" | "vertical";
  items: unknown[];
  selectedIndex?: number;
}

const initialState: SubNavBarState = {
  items: [],
  direction: "vertical",
  selectedIndex: undefined,
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
  },
});

// Action creators are generated for each case reducer function
export const { setDirection, setItems, setSelectedIndex } =
  subNavBarSlice.actions;

export default subNavBarSlice.reducer;
