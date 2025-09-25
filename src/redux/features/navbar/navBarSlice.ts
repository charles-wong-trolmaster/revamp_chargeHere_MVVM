import { IconButtonProps } from "@/components/IconButton";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store"; // Import your RootState type

export interface NavBarState {
  direction: "horizontal" | "vertical";
  items: IconButtonProps[];
  selectedIndex?: number;
  hoveredIndex?: number;
}

const intitalNavItems: IconButtonProps[] = [
  {
    name: "Location",
    icon: "/icons/home.svg",
  },
  {
    name: "Session",
    icon: "/icons/search.svg",
  },
  {
    name: "Station",
    icon: "/icons/settings.svg",
  },
  {
    name: "Tariff",
    icon: "/icons/profile.svg",
  },
  {
    name: "Settings",
    icon: "/icons/gear.svg",
  },
];

const initialState: NavBarState = {
  direction: "horizontal",
  items: intitalNavItems,
  selectedIndex: 0,
  hoveredIndex: undefined,
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
    setSelectedIndex: (state, action: PayloadAction<number | undefined>) => {
      state.selectedIndex = action.payload;
    },
    setHoveredIndex: (state, action: PayloadAction<number | undefined>) => {
      state.hoveredIndex = action.payload;
    },
  },
});

// Selector functions
export const getSelectedItem = (
  state: RootState
): IconButtonProps | undefined => {
  const { items, selectedIndex } = state.navBar;
  return selectedIndex !== undefined ? items[selectedIndex] : undefined;
};

export const getHoveredItem = (
  state: RootState
): IconButtonProps | undefined => {
  const { items, hoveredIndex } = state.navBar;
  return hoveredIndex !== undefined ? items[hoveredIndex] : undefined;
};

// Action creators are generated for each case reducer function
export const { setDirection, setItems, setSelectedIndex, setHoveredIndex } =
  navBarSlice.actions;

export default navBarSlice.reducer;
