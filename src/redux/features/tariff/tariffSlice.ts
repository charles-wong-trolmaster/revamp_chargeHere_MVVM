import { Tariff } from "@/entities";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TariffState {
  selectedTariffId?: string;
  selectedSchemeIndex?: number;
  draftTariffDetail?: Tariff;
}

const initialState: TariffState = {
  selectedTariffId: undefined,
  selectedSchemeIndex: undefined,
  draftTariffDetail: undefined,
};

export const tariffSlice = createSlice({
  name: "tariff",
  initialState,
  reducers: {
    setSelectedTariffId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedTariffId = action.payload;
    },
    setSelectedSchemeIndex: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.selectedSchemeIndex = action.payload;
    },
    setDraftTariffDetail: (
      state,
      action: PayloadAction<Tariff | undefined>
    ) => {
      state.draftTariffDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedTariffId,
  setSelectedSchemeIndex,
  setDraftTariffDetail,
} = tariffSlice.actions;

export default tariffSlice.reducer;
