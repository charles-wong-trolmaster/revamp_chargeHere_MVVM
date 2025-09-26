import { IconButtonProps } from "@/components/IconButton";
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SubNavBarState {
  direction: "horizontal" | "vertical";
  items: IconButtonProps[] | LocationSubNavBarIconButtonProps[];
  selectedIndex?: number;
  hoveredIndex?: number;
}

export interface LocationSubNavBarIconButtonProps extends IconButtonProps {
  mapboxStyle?: string;
}

const locationSubNavBarItems: LocationSubNavBarIconButtonProps[] = [
  {
    name: "Active",
    icon: "/icons/home.svg",
    mapboxStyle: "mapbox://styles/mapbox/navigation-night-v1",
    onClick: () => console.log("Active clicked"),
    showTooltip: false,
    tooltipText: "Active",
  },
  {
    name: "Removed",
    icon: "/icons/search.svg",
    mapboxStyle: "mapbox://styles/mapbox/satellite-v9",
    onClick: () => console.log("Removed clicked"),
    showTooltip: false,
    tooltipText: "Upcoming",
  },
  {
    name: "Upcoming",
    icon: "/icons/settings.svg",
    mapboxStyle: "mapbox://styles/mapbox/dark-v11",
    onClick: () => console.log("Upcoming clicked"),
    showTooltip: false,
    tooltipText: "Removed",
  },
];

const initialState: SubNavBarState = {
  items: [],
  direction: "vertical",
  selectedIndex: undefined,
  hoveredIndex: undefined,
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
    setSelectedIndex: (state, action: PayloadAction<number | undefined>) => {
      state.selectedIndex = action.payload;
    },
    setHoveredIndex: (state, action: PayloadAction<number | undefined>) => {
      state.hoveredIndex = action.payload;
    },
    setLocationSubNavBar: (state) => {
      state.items = locationSubNavBarItems;
    },
  },
});

export const getSelectedSubNavItem = (
  state: RootState
): IconButtonProps | undefined => {
  const { items, selectedIndex } = state.subNavBar;
  return selectedIndex !== undefined ? items[selectedIndex] : undefined;
};

export const getHoveredSubNavItem = (
  state: RootState
): IconButtonProps | undefined => {
  const { items, hoveredIndex } = state.subNavBar;
  return hoveredIndex !== undefined ? items[hoveredIndex] : undefined;
};

// Action creators are generated for each case reducer function
export const {
  setDirection,
  setItems,
  setSelectedIndex,
  setHoveredIndex,
  setLocationSubNavBar,
} = subNavBarSlice.actions;

export default subNavBarSlice.reducer;
