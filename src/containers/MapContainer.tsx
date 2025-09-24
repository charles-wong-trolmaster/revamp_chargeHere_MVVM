import { setSelectedIndex } from "@/redux/features/map/mapSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Map from "@/components/Map";
import React from "react";

const MapContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const bound = useAppSelector((state) => state.map.bound);
  const items = useAppSelector((state) => state.map.items);
  const selectedIndex = useAppSelector((state) => state.map.selectedIndex);
  const onSelect = (index: number) => {
    dispatch(setSelectedIndex(index));
  };
  const dummyItems = [
    {
      id: "loc_001",
      name: "Central Plaza Charging Station",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "wifi", "restroom"],
      coordinates: {
        longitude: "114.1585",
        latitude: "22.2859",
      },
      evses: [
        { id: "evse_001", status: "AVAILABLE" },
        { id: "evse_002", status: "CHARGING" },
      ],
    },
    {
      id: "loc_002",
      name: "Tsim Sha Tsui Mall Charger",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "shopping"],
      coordinates: {
        longitude: "114.1694",
        latitude: "22.2978",
      },
      evses: [
        { id: "evse_003", status: "AVAILABLE" },
        { id: "evse_004", status: "AVAILABLE" },
        { id: "evse_005", status: "OUT_OF_ORDER" },
      ],
    },
    {
      id: "loc_003",
      name: "Admiralty Station Hub",
      derivedStatus: "INACTIVE",
      city: "Hong Kong",
      facilities: ["parking"],
      coordinates: {
        longitude: "114.1650",
        latitude: "22.2770",
      },
      evses: [{ id: "evse_006", status: "OUT_OF_ORDER" }],
    },
    {
      id: "loc_004",
      name: "Causeway Bay Shopping Center",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "wifi", "restroom", "shopping"],
      coordinates: {
        longitude: "114.1849",
        latitude: "22.2800",
      },
      evses: [
        { id: "evse_007", status: "AVAILABLE" },
        { id: "evse_008", status: "CHARGING" },
        { id: "evse_009", status: "AVAILABLE" },
        { id: "evse_010", status: "AVAILABLE" },
      ],
    },
    {
      id: "loc_005",
      name: "Wan Chai Metro Station",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "restroom"],
      coordinates: {
        longitude: "114.1733",
        latitude: "22.2783",
      },
      evses: [
        { id: "evse_011", status: "CHARGING" },
        { id: "evse_012", status: "AVAILABLE" },
      ],
    },
    {
      id: "loc_006",
      name: "Central Ferry Pier",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "wifi"],
      coordinates: {
        longitude: "114.1580",
        latitude: "22.2870",
      },
      evses: [{ id: "evse_013", status: "AVAILABLE" }],
    },
    {
      id: "loc_007",
      name: "Mid-Levels Residential Complex",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking"],
      coordinates: {
        longitude: "114.1520",
        latitude: "22.2750",
      },
      evses: [
        { id: "evse_014", status: "AVAILABLE" },
        { id: "evse_015", status: "AVAILABLE" },
        { id: "evse_016", status: "CHARGING" },
      ],
    },
    {
      id: "loc_008",
      name: "Stanley Market Parking",
      derivedStatus: "INACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "shopping"],
      coordinates: {
        longitude: "114.2150",
        latitude: "22.2180",
      },
      evses: [
        { id: "evse_017", status: "OUT_OF_ORDER" },
        { id: "evse_018", status: "OUT_OF_ORDER" },
      ],
    },
    {
      id: "loc_009",
      name: "Ocean Terminal Shopping Mall",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "wifi", "restroom", "shopping", "restaurant"],
      coordinates: {
        longitude: "114.1680",
        latitude: "22.2950",
      },
      evses: [
        { id: "evse_019", status: "AVAILABLE" },
        { id: "evse_020", status: "CHARGING" },
        { id: "evse_021", status: "AVAILABLE" },
        { id: "evse_022", status: "AVAILABLE" },
        { id: "evse_023", status: "CHARGING" },
      ],
    },
    {
      id: "loc_010",
      name: "Airport Express Station",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "wifi", "restroom"],
      coordinates: {
        longitude: "114.1600",
        latitude: "22.2840",
      },
      evses: [
        { id: "evse_024", status: "AVAILABLE" },
        { id: "evse_025", status: "AVAILABLE" },
      ],
    },
    {
      id: "loc_011",
      name: "Aberdeen Fishing Village",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "restaurant"],
      coordinates: {
        longitude: "114.1520",
        latitude: "22.2470",
      },
      evses: [{ id: "evse_026", status: "CHARGING" }],
    },
    {
      id: "loc_012",
      name: "Repulse Bay Beach Resort",
      derivedStatus: "ACTIVE",
      city: "Hong Kong",
      facilities: ["parking", "restroom", "restaurant"],
      coordinates: {
        longitude: "114.1970",
        latitude: "22.2360",
      },
      evses: [
        { id: "evse_027", status: "AVAILABLE" },
        { id: "evse_028", status: "AVAILABLE" },
        { id: "evse_029", status: "CHARGING" },
      ],
    },
  ];
  const handleMapSelect = (data: any) => {
    // console.log("Map selection:", data);

    switch (data.type) {
      case "cluster":
        console.log("qqq Cluster clicked:", data.locations);
        break;

      case "single":
        console.log("qqq Single location clicked:", data.location);
        dispatch(setSelectedIndex(data.index));

        break;

      case "bounds":
        console.log("Area search bounds:", data.bounds);
        break;
    }
  };
  return (
    <Map
      onSelect={handleMapSelect}
      items={dummyItems}
      selectedIndex={selectedIndex}
      bound={bound}
    />
  );
};

export default MapContainer;
