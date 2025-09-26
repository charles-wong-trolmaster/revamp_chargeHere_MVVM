import { Bound, MapState } from "@/redux/features/map/mapSlice";
import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";

interface MapProps extends MapState {
  items: any[];
  selectedId?: string;
  selectedStyle: string;
  onUnclusterClick?: (uncluster: {
    id: string;
    coordinate: { lat: number; lng: number };
  }) => void;
  onClusterClick?: (coordinate: { lat: number; lng: number }) => void;
  onBoundChange?: (bounds: Bound) => void;
  onMapClick?: (coordinate: { lat: number; lng: number }) => void;
  onMapDoubleClick?: () => void;
}

const Map = (props: MapProps) => {
  const {
    items,
    selectedId,
    selectedStyle,
    onUnclusterClick,
    onClusterClick,
    onBoundChange,
    onMapClick,
    onMapDoubleClick,
  } = props;
  console.log("qqq items", items);

  const [dummyId, setDummyId] = useState("");
  console.log("qqq dummyId", dummyId);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const boundsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const defaultStyle =
    "mapbox://styles/kentrolmaster/cmf0h2uq401ji01pg5yoh842h";
  const currentStyle = selectedStyle || defaultStyle;

  const defaultView = {
    center: [114.1585, 22.2859] as [number, number],
    zoom: 12,
    pitch: 60,
    bearing: 0,
  };

  const changeMapStyle = (newStyleUrl: string) => {
    if (mapRef.current) {
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

        if (onClusterClick) {
          const geometry = features[0].geometry;

          if (geometry.type === "Point") {
            const coords = geometry.coordinates;
            onClusterClick({
              lat: coords[1],
              lng: coords[0],
            });
          }
        }
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          const geometry = features[0].geometry;
          if (geometry.type === "Point") {
            map.flyTo({
              center: geometry.coordinates as [number, number],
              zoom: typeof zoom === "number" ? zoom : 14,
              pitch: 0,
              duration: 1500,
              essential: true,
              easing: (t: number) => 1 - Math.pow(1 - t, 3),
            });
          }
        });
      });

      map.on("click", "unclustered-point", (e) => {
        if (!e.features || !e.features.length) return;

        const feature = e.features[0];
        const geometry = feature.geometry;
        const properties = feature.properties;

        if (geometry.type !== "Point") {
          console.warn("Expected Point geometry for unclustered point");
          return;
        }

        const coordinates = geometry.coordinates.slice() as [number, number];
        if (onUnclusterClick) {
          onUnclusterClick({
            id: properties?.id || "",
            coordinate: {
              lat: coordinates[1],
              lng: coordinates[0],
            },
          });
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

  // useEffect(() => {
  //   if (dummyId !== undefined && items.length > 0 && mapRef.current) {
  //     console.log("qqq run 1?");

  //     const selectedUncluster = items.find((item) => {
  //       return item.id === dummyId;
  //     });
  //     console.log("qqq selectedUncluster", selectedUncluster);

  //     if (selectedUncluster && selectedUncluster.coordinates) {
  //       const coordinates = [
  //         parseFloat(selectedUncluster.coordinates.longitude),
  //         parseFloat(selectedUncluster.coordinates.latitude),
  //       ];

  //       mapRef.current.flyTo({
  //         center: coordinates as [number, number],
  //         zoom: 16,
  //         pitch: 60,
  //         duration: 1500,
  //         essential: true,
  //         easing: (t: number) => 1 - Math.pow(1 - t, 3),
  //       });
  //     } else {
  //       mapRef.current?.flyTo({
  //         center: defaultView.center,
  //         zoom: defaultView.zoom,
  //         pitch: defaultView.pitch,
  //         bearing: defaultView.bearing,
  //         duration: 3000,
  //         essential: true,
  //         easing: (t: number) => 1 - Math.pow(1 - t, 3),
  //       });
  //     }
  //   } else {
  //     console.log("qqq run 2?");
  //   }
  // }, [dummyId, items]);

  useEffect(() => {
    if (mapRef.current && currentStyle) {
      changeMapStyle(currentStyle);
    }
  }, [currentStyle]);

  useEffect(() => {
    if (mapRef.current && isMapLoaded) {
      const source = mapRef.current.getSource(
        "locations"
      ) as mapboxgl.GeoJSONSource;

      if (items.length === 0) {
        if (source) {
          source.setData({
            type: "FeatureCollection",
            features: [],
          });
        }
      } else {
        if (source) {
          source.setData(createGeoJSONData());
        } else {
          addClusterLayers();
        }
      }
    }
  }, [items, isMapLoaded]);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    try {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoia2VudHJvbG1hc3RlciIsImEiOiJjbWV3aHV0bnkwNHN3MmpxeXNoYjdjeWxzIn0.1qyqP80uVoKe7UOyjlMwyA";

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
        doubleClickZoom: false,
        keyboard: true,
        touchZoomRotate: true,
      });

      mapRef.current.on("load", () => {
        setIsMapLoaded(true);
        if (items.length > 0) {
          addClusterLayers();
        }

        if (mapRef.current) {
          let isInitialLoad = true;

          mapRef.current.on("click", (e: mapboxgl.MapMouseEvent) => {
            const map = mapRef.current!;
            const layersToCheck = ["clusters", "unclustered-point"];
            const existingLayers = layersToCheck.filter((layerId) =>
              map.getLayer(layerId)
            );
            let hitFeature = false;
            if (existingLayers.length > 0) {
              const features = map.queryRenderedFeatures(e.point, {
                layers: existingLayers,
              });
              hitFeature = features.length > 0;
            }
            if (!hitFeature) {
              if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
              }
              clickTimeoutRef.current = setTimeout(() => {
                if (onMapClick) {
                  onMapClick({
                    lat: e.lngLat.lat,
                    lng: e.lngLat.lng,
                  });
                }
              }, 300);
            }
          });

          mapRef.current.on("dblclick", (e: mapboxgl.MapMouseEvent) => {
            e.preventDefault();
            if (clickTimeoutRef.current) {
              clearTimeout(clickTimeoutRef.current);
              clickTimeoutRef.current = null;
            }

            if (onMapDoubleClick) {
              onMapDoubleClick();
            }
          });
          const handleBoundsChange = () => {
            if (boundsTimeoutRef.current) {
              clearTimeout(boundsTimeoutRef.current);
            }
            const delay = isInitialLoad ? 0 : 3000;

            boundsTimeoutRef.current = setTimeout(() => {
              if (onBoundChange && mapRef.current) {
                const bounds = mapRef.current.getBounds();
                if (!bounds) return;

                onBoundChange({
                  east: bounds.getEast(),
                  south: bounds.getSouth(),
                  west: bounds.getWest(),
                  north: bounds.getNorth(),
                });
                isInitialLoad = false;
              }
            }, delay);
          };

          mapRef.current.on("movestart", () => {
            console.log("Map movement started");
          });

          mapRef.current.on("move", () => {
            handleBoundsChange();
          });

          mapRef.current.on("moveend", () => {
            handleBoundsChange();
          });

          mapRef.current.on("zoomend", () => {
            handleBoundsChange();
          });
        }

        mapRef.current?.flyTo({
          center: defaultView.center,
          zoom: defaultView.zoom,
          pitch: defaultView.pitch,
          bearing: defaultView.bearing,
          duration: 2000,
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
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (boundsTimeoutRef.current) {
        clearTimeout(boundsTimeoutRef.current);
      }

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array

  return (
    <div
      id="map-container"
      className="uk-position-absolute uk-width-1-1 uk-height-1-1"
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
      <button
        onClick={() => setDummyId("d7a75e3f-bcb2-463b-8116-b94a6232af0a")}
      >
        setId
      </button>
      <button onClick={() => setDummyId("")}>cancelId</button>
    </div>
  );
};

export default Map;
