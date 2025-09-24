import { MapState } from "@/redux/features/map/mapSlice";
import React from "react";
import LocationCard from "./LocationCard";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";

interface MapProps extends MapState {
  bound?: number[];
  items: any[];
  selectedIndex?: number;
  style?: string; 
  onSelect: (data: any) => void;
}

const Map = (props: MapProps) => {
  const { bound, items, selectedIndex, onSelect, style } = props;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Add loading state
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const defaultStyle =
    "mapbox://styles/kentrolmaster/cmf0h2uq401ji01pg5yoh842h";
  const currentStyle = style || defaultStyle;

  const defaultView = {
    center: [114.1585, 22.2859] as [number, number],
    zoom: 12,
    pitch: 60,
    bearing: 0,
  };

 
  const changeMapStyle = (newStyleUrl: string) => {
    console.log('qqq newStyleUrl', newStyleUrl);
    
    if (mapRef.current ) {
      console.log('qqq run change style');
      
      mapRef.current.setStyle(newStyleUrl);
      mapRef.current.once("styledata", () => {
        setTimeout(() => {
          addClusterLayers();
        }, 500);
      });
    }
  };

  const createGeoJSONData = () => {
    const features = items.map((location, index) => ({
      type: "Feature" as const,
      properties: {
        id: location.id,
        index: index,
        name: location.name,
        status: location.derivedStatus,
        city: location.city || "Unknown",
        facilities: location.facilities || [],
        evseCount: location.evses?.length || 0,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [
          parseFloat(location.coordinates.longitude),
          parseFloat(location.coordinates.latitude),
        ],
      },
    }));

    return {
      type: "FeatureCollection" as const,
      features,
    };
  };

  const addClusterLayers = () => {
    if (!mapRef.current || items.length === 0) return;
    const map = mapRef.current;

    try {
      // Remove existing layers and sources
      if (map.getLayer("clusters")) map.removeLayer("clusters");
      if (map.getLayer("cluster-count")) map.removeLayer("cluster-count");
      if (map.getLayer("unclustered-point"))
        map.removeLayer("unclustered-point");
      if (map.getSource("locations")) map.removeSource("locations");

      map.addSource("locations", {
        type: "geojson",
        data: createGeoJSONData(),
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "locations",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            10,
            "#f1f075",
            30,
            "#f28cb1",
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 30, 40],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "locations",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "locations",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": [
            "case",
            ["==", ["get", "status"], "ACTIVE"],
            "#28a745",
            "#dc3545",
          ],
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });

        if (!features.length) return;

        const clusterId = features[0].properties?.cluster_id;
        const source = map.getSource("locations") as mapboxgl.GeoJSONSource;

        // Get all points in this cluster
        source.getClusterLeaves(clusterId, Infinity, 0, (err, leaves) => {
          if (err) return;

          // Extract the location data from cluster leaves
          const clusterData = {
            type: "cluster",
            coordinates: (features[0].geometry as any).coordinates,
            pointCount: features[0].properties?.point_count,
            locations:
              leaves
                ?.map((leaf) => {
                  const index = leaf.properties?.index;
                  return items[index];
                })
                .filter(Boolean) || [],
          };

          // Pass cluster data to onSelect
          onSelect(clusterData);
        });

        // Zoom to cluster
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.flyTo({
            center: (features[0].geometry as any).coordinates,
            zoom: typeof zoom === "number" ? zoom : 14,
            pitch: 0,
            duration: 1500,
            essential: true,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
          });
        });
      });

      // Individual point click handler - passes single location data to onSelect
      map.on("click", "unclustered-point", (e) => {
        const coordinates = (
          e.features![0].geometry as any
        ).coordinates.slice();
        const properties = e.features![0].properties;
        const locationIndex = properties?.index;

        if (locationIndex !== undefined && items[locationIndex]) {
          const locationData = {
            type: "single",
            location: items[locationIndex],
            index: locationIndex,
            coordinates: coordinates,
          };

          // Pass single location data to onSelect
          onSelect(locationData);
        }

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        map.flyTo({
          center: coordinates,
          zoom: 16,
          pitch: 60,
          duration: 1500,
          essential: true,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });

        setTimeout(() => {
          new mapboxgl.Popup().setLngLat(coordinates).addTo(map);
        }, 1500);
      });

      // Mouse event handlers
      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = "";
      });
    } catch (error) {
      console.error("Error adding cluster layers:", error);
    }
  };

  const handleAreaButtonClick = () => {
    const bounds = mapRef.current?.getBounds();
    console.log("Current bounds:", bounds);

    if (bounds) {
      // Pass bounds data to onSelect
      onSelect({
        type: "bounds",
        bounds: bounds,
        boundsArray: bounds.toArray(),
      });
    }
  };

  // Handle selectedIndex prop changes
  useEffect(() => {
    if (selectedIndex !== undefined && items[selectedIndex] && mapRef.current) {
      const selectedLocation = items[selectedIndex];

      const coordinates = [
        parseFloat(selectedLocation.coordinates.longitude),
        parseFloat(selectedLocation.coordinates.latitude),
      ];

      mapRef.current.flyTo({
        center: coordinates as [number, number],
        zoom: 16,
        pitch: 60,
        duration: 1500,
        essential: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    }
  }, [selectedIndex, items]);
  // React to style changes
  useEffect(() => {
    if (mapRef.current && currentStyle) {
      console.log('qqq run useeffect');
      
      changeMapStyle(currentStyle);
    }
  }, [currentStyle]);

  // Handle bound prop changes
  // useEffect(() => {
  //   if (bound && mapRef.current) {
  //     mapRef.current.fitBounds(bound, {
  //       padding: 50,
  //       duration: 1500
  //     });
  //   }
  // }, [bound]);

  useEffect(() => {
    if (mapRef.current && isMapLoaded && items.length > 0) {
      const source = mapRef.current.getSource(
        "locations"
      ) as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData(createGeoJSONData());
      } else {
        addClusterLayers();
      }
    }
  }, [items, isMapLoaded]);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    try {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoia2VudHJvbG1hc3RlciIsImEiOiJjbWV3aHV0bnkwNHN3MmpxeXNoYjdjeWxzIn0.1qyqP80uVoKe7UOyjlMwyA";

      console.log("Initializing map...");

      mapRef.current = new mapboxgl.Map({
        style: currentStyle,
        container: mapContainerRef.current,
        center: [114.1581, 22.2817],
        zoom: 10,
        pitch: 20,
        bearing: -45,
        minZoom: 5.4,
        maxZoom: 20,
        maxPitch: 60,
        minPitch: 0,

        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        boxZoom: true,
        doubleClickZoom: true,
        keyboard: true,
        touchZoomRotate: true,
      });

      mapRef.current.on("load", () => {
        setIsMapLoaded(true);

        if (items.length > 0) {
          addClusterLayers();
        }

        mapRef.current?.flyTo({
          center: defaultView.center,
          zoom: defaultView.zoom,
          pitch: defaultView.pitch,
          bearing: defaultView.bearing,
          duration: 3000,
          essential: true,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
      });

      mapRef.current.on("error", (e) => {
        console.error("Map error:", e);
        setMapError("Failed to load map: " + e.error?.message);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Failed to initialize map");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="map-container"
      className="uk-position-absolute uk-width-1-1 uk-height-1-1"
      style={{}}
    >
      {!isMapLoaded && !mapError && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e8f4f8",
            zIndex: 10,
          }}
        >
          <span>Map Loading...</span>
        </div>
      )}

      {mapError && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e8f4f8",
            color: "red",
            zIndex: 10,
          }}
        >
          <span>{mapError}</span>
        </div>
      )}

      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default Map;
