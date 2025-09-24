import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface MapBounds {
  east: number;
  south: number;
  west: number;
  north: number;
}

interface FilterState {
  filterState: {
    status: "LIVE" | "REMOVED" | "UPCOMING";
    openingHours: "ANY_TIME" | "OPEN_NOW" | "OPEN_24_HOURS";
    availableNow: boolean;
    nearby: boolean;
    facilities: string[];
  };
  clickedMarker: {
    isClickedMarker: boolean;
  };
  mapBounds?: MapBounds;
}

const initialFilterState: FilterState = {
  filterState: {
    status: "LIVE",
    openingHours: "ANY_TIME",
    availableNow: false,
    nearby: false,
    facilities: [],
  },
  clickedMarker: {
    isClickedMarker: false,
  },
  mapBounds: undefined,
};

export const locationResultSlice = createSlice({
  name: "locationResult",
  initialState: initialFilterState,
  reducers: {
    setFilterState: (state, action: PayloadAction<FilterState['filterState']>) => {
      state.filterState = action.payload;
    },
    setIsClickedMarker: (state, action: PayloadAction<boolean>) => {
      state.clickedMarker.isClickedMarker = action.payload;
    },
    setMapBounds: (state, action: PayloadAction<MapBounds>) => {
      state.mapBounds = action.payload;
    },
  },
});

export const { setFilterState, setIsClickedMarker, setMapBounds } = locationResultSlice.actions;

export default locationResultSlice.reducer;