import React from "react";
import { useAppSelector } from "@/redux/store";
import DrawerStack from "@/components/DrawerStack/DrawerStack";
import { LocationDrawer } from "@/components/Location";
import { LocationCreationDrawer } from "@/components/Location";
import { CDRDrawer, OnGoingDrawer } from "@/components/Session";
import { StationDrawer, StationEnrollmentDrawer } from "@/components/Stations";
import { TariffDrawer } from "@/components/Tariff";
import { UserDrawer, UserGroupDrawer } from "@/components/User Management";

const DrawersContainer = () => {
  const selectedIndex = useAppSelector((state) => state.navBar.selectedIndex);
  const items = useAppSelector((state) => state.navBar.items);
  const activeSection = selectedIndex ? items[selectedIndex].id : undefined;

  return (
    <DrawerStack activeDrawer={activeSection}>
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
