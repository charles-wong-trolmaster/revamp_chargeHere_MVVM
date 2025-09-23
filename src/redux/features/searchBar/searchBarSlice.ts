import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchBarState {
  enableClear: boolean;
  placeholder?: string;
  value?: string;
  icon: string;
}

const initialState: SearchBarState = {
  enableClear: true,
  placeholder: undefined,
  value: undefined,
  icon: "testIcon",
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setEnableClear: (state, action: PayloadAction<boolean>) => {
      state.enableClear = action.payload;
    },
    setPlaceholder: (state, action: PayloadAction<string>) => {
      state.placeholder = action.payload;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEnableClear, setPlaceholder, setValue, setIcon } =
  searchBarSlice.actions;

export default searchBarSlice.reducer;
