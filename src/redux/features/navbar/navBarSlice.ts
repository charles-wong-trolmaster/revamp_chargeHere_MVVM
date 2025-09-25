import { IconButtonProps } from "@/components/IconButton";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface NavBarState {
  direction: "horizontal" | "vertical";
  items: IconButtonProps[];
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
    setItems: (state, action: PayloadAction<IconButtonProps[]>) => {
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
