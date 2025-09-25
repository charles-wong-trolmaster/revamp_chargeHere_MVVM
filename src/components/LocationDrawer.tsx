import React from "react";
import { Location } from "@/interfaces/index";
import Panel from "./Panel";
import LocationCard from "./LocationCard";

interface DrawerProps {
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  items: Location[];
  title: string;
  onClose: () => void;
  onItemClick: (location: Location) => void;
  handleScroll: () => void;
  onScrollToBottom: () => void;
}

const LocationDrawer: React.FC<DrawerProps> = ({
  isFetching,
  isLoading,
  hasNextPage,
  items = [],
  title,
  onClose,
  onItemClick,
  handleScroll,
}) => {
  const renderContent = () => {
    return (
      <>
        <span>hi</span>
        <LocationCard
          isFetching={isFetching}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          items={items}
          onItemClick={onItemClick}
          onScroll={handleScroll}
        />
      </>
    );
  };
  return (
    items && (
      <Panel
        isOpen={true}
        showHeader={true}
        headerTitle={`Result (${items.length})`}
        onClose={() => {}}
        width="350px"
        height="80vh"
        children={renderContent()}
      ></Panel>
    )
  );
};

export default LocationDrawer;
