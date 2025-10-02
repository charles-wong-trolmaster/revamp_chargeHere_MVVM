import { IconButtonProps } from "@/components/IconButton";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SubNavBarState {
  direction: "horizontal" | "vertical";
  items: IconButtonProps[] | LocationSubNavBarIconButtonProps[];
  hoveredIndex?: number;
  selectedItemIndex?: {
    [key: string]: number;
  };
}

export interface LocationSubNavBarIconButtonProps extends IconButtonProps {
  mapboxStyle?: string;
}

const locationSubNavBarItems: LocationSubNavBarIconButtonProps[] = [
  {
    id: "active",
    name: "Active",
    icon: "/icons/home.svg",
    mapboxStyle: "mapbox://styles/kentrolmaster/cmf0h2uq401ji01pg5yoh842h",
    showTooltip: false,
    tooltipText: "Active",
  },
  {
    id: "removed",
    name: "Removed",
    icon: "/icons/search.svg",
    mapboxStyle: "mapbox://styles/mapbox/satellite-v9",
    showTooltip: false,
    tooltipText: "Removed",
  },
  {
    id: "upcoming",
    name: "Upcoming",
    icon: "/icons/settings.svg",
    mapboxStyle: "mapbox://styles/mapbox/dark-v11",
    showTooltip: false,
    tooltipText: "Upcoming",
  },
];

const sessionSubNavBarItems: IconButtonProps[] = [
  {
    id: "onGoing",
    name: "On Going",
    icon: "/icons/search.svg",
    showTooltip: false,
    tooltipText: "On Going",
    showName: false,
  },
  {
    id: "CDR",
    name: "CDR",
    icon: "/icons/search.svg",
    showTooltip: false,
    tooltipText: "CDR",
    showName: false,
  },
];

const settingsSubNavBarItems: IconButtonProps[] = [
  {
    id: "user",
    name: "User",
    icon: "/icons/search.svg",
    showTooltip: false,
    tooltipText: "User",
    showName: false,
  },
  {
    id: "userGroup",
    name: "User Group",
    icon: "/icons/search.svg",
    showTooltip: false,
    tooltipText: "User Group",
    showName: false,
  },
];

const initialState: SubNavBarState = {
  items: [],
  direction: "vertical",
  hoveredIndex: undefined,
  selectedItemIndex: {
    location: 0,
    session: 0,
    settings: 0,
  },
};

export const subNavBarSlice = createSlice({
  name: "subNavBar",
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<"horizontal" | "vertical">) => {
      state.direction = action.payload;
    },
    setItems: (
      state,
      action: PayloadAction<
        IconButtonProps[] | LocationSubNavBarIconButtonProps[]
      >
    ) => {
      state.items = action.payload;
    },
    setHoveredIndex: (state, action: PayloadAction<number | undefined>) => {
      state.hoveredIndex = action.payload;
    },
    setLocationSubNavBar: (state) => {
      state.items = locationSubNavBarItems;
    },
    setSessionSubNavBar: (state) => {
      state.items = sessionSubNavBarItems;
    },
    setSettingsSubNavBar: (state) => {
      state.items = settingsSubNavBarItems;
    },
    setSelectedItemIndex: (
      state,
      action: PayloadAction<{ [key: string]: number } | undefined>
    ) => {
      state.selectedItemIndex = {
        ...state.selectedItemIndex,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDirection,
  setItems,
  setHoveredIndex,
  setLocationSubNavBar,
  setSessionSubNavBar,
  setSettingsSubNavBar,
  setSelectedItemIndex,
} = subNavBarSlice.actions;

export default subNavBarSlice.reducer;
