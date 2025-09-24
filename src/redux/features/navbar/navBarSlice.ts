import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavBarItem {
  id: string;
  name?: string;
  icon: string;
  style?: string; // Add this line for the mapbox style
  onClick?: () => void;
}

export interface NavBarState {
  direction: "horizontal" | "vertical";
  items: NavBarItem[];
  selectedIndex?: number;
}

const initialState: NavBarState = {
  direction: "horizontal",
  items: [],
  selectedIndex: undefined,
};

export const navBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<"horizontal" | "vertical">) => {
      state.direction = action.payload;
    },
    setItems: (state, action: PayloadAction<NavBarItem[]>) => {
      state.items = action.payload;
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDirection, setItems, setSelectedIndex } = navBarSlice.actions;

export default navBarSlice.reducer;
