import React from "react";
import { useAppSelector } from "@/redux/store";
import DrawerStack from "@/components/DrawerStack/DrawerStack";
import { LocationDrawer } from "@/components/Location";
import { LocationCreationDrawer } from "@/components/Location";
import { CDRDrawer, OnGoingDrawer } from "@/components/Session";
import { StationDrawer, StationEnrollmentDrawer } from "@/components/Stations";
import { TariffDrawer } from "@/components/Tariff";
import { UserDrawer, UserGroupDrawer } from "@/components/User Management";
import { getSelectedNavItem } from "@/redux/features/navbar/navBarSlice";

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
      <LocationDrawer id="location" />
      <LocationCreationDrawer id="locationCreation" />
      <OnGoingDrawer id="onGoing" />
      <CDRDrawer id="CDR" />
      <StationDrawer id="station" />
      <StationEnrollmentDrawer id="stationEnrollment" />
      <TariffDrawer id="tariff" />
      <UserDrawer id="user" />
      <UserGroupDrawer id="userGroup" />
    </DrawerStack>
  );
};

export default DrawersContainer;
