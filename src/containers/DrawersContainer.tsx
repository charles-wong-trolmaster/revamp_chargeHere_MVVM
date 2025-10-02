import React from "react";
import { useAppSelector } from "@/redux/store";
import DrawerStack from "@/components/DrawerStack/DrawerStack";
import { getSelectedNavItem } from "@/redux/features/navbar/navBarSlice";
import {
  ResultListDrawer as LocationResultListDrawer,
  CreateDrawer as LocationCreateDrawer,
} from "@/components/Location";
import {
  OnGoingResultListDrawer,
  CDRResultListDrawer,
} from "@/components/Session";
import {
  ResultListDrawer as StationResultListDrawer,
  EnrollmentDrawer as StationEnrollmentDrawer,
} from "@/components/Stations";
import { ResultListDrawer as TariffResultListDrawer } from "@/components/Tariff";
import {
  UserGroupResultListDrawer,
  UserResultListDrawer,
} from "@/components/User Management";

const DrawersContainer = () => {
  const selectedNavBarItem = useAppSelector(getSelectedNavItem);
  const sessionSubNavIndex = useAppSelector(
    (state) => state.subNavBar.selectedItemIndex?.["session"]
  );
  const settingsSubNavIndex = useAppSelector(
    (state) => state.subNavBar.selectedItemIndex?.["settings"]
  );
  const activeSection = () => {
    if (selectedNavBarItem) {
      if (selectedNavBarItem.id === "session") {
        if (sessionSubNavIndex === 0) {
          return "onGoing";
        } else if (sessionSubNavIndex === 1) {
          return "CDR";
        }
      } else if (selectedNavBarItem.id === "settings") {
        if (settingsSubNavIndex === 0) {
          return "user";
        } else if (settingsSubNavIndex === 1) {
          return "userGroup";
        }
      }
      return selectedNavBarItem.id;
    } else {
      return undefined;
    }
  };

  return (
    <DrawerStack activeDrawer={activeSection()}>
      <LocationResultListDrawer id="location" />
      <LocationCreateDrawer id="locationCreation" />
      <OnGoingResultListDrawer id="onGoing" />
      <CDRResultListDrawer id="CDR" />
      <StationResultListDrawer id="station" />
      <StationEnrollmentDrawer id="stationEnrollment" />
      <TariffResultListDrawer id="tariff" />
      <UserResultListDrawer id="user" />
      <UserGroupResultListDrawer id="userGroup" />
    </DrawerStack>
  );
};

export default DrawersContainer;
