import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VudHJvbG1hc3RlciIsImEiOiJjbWV3aHV0bnkwNHN3MmpxeXNoYjdjeWxzIn0.1qyqP80uVoKe7UOyjlMwyA";

interface MapWithCrosshairProps {
  center: { lat: number; lng: number };
  onLocationChange: (lat: number, lng: number, addressData?: any) => void;
  style?: React.CSSProperties;
}

interface MapRef {
  geocodeAddress: (
    address: string
  ) => Promise<{ lat: number; lng: number } | null>;
  flyTo: (lat: number, lng: number, zoom?: number) => void;
}

const MapWithCrosshair = forwardRef<MapRef, MapWithCrosshairProps>(
  ({ center, onLocationChange, style }, ref) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);

    const generateSessionToken = () => {
      return (
        "session_" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    };

    const getAddressFromCoordinates = async (lat: number, lng: number) => {
      setIsGeocodingLoading(true);
      try {
        if (!mapboxgl.accessToken) {
          console.error("Mapbox access token is not set");
          return null;
        }
        const response = await fetch(
          `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${mapboxgl.accessToken}&limit=1&language=en&country=HK`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Mapbox Geocoding v6 Reverse Response:", data);

        if (data.features && data.features.length > 0) {
          const feature = data.features[0];
          const props = feature.properties || {};

          // Extract address components from v6 response
          const fullAddress = props.full_address || props.place_formatted || "";
          const streetNumber = props.address_number || "";
          const streetName = props.street || "";
          const city = props.place || "";
          const state = props.region || "";
          const country = props.country || "";
          const postalCode = props.postcode || "";

          // Construct street address
          const address =
            streetNumber && streetName
              ? `${streetNumber} ${streetName}`
              : streetName || props.name || "";

          // setCurrentAddress(fullAddress);
          const addressData = {
            address: address,
            city: city,
            state: state,
            country: country,
            postalCode: postalCode,
            fullAddress: fullAddress,
            // Additional v6 fields
            neighborhood: props.neighborhood || "",
            district: props.district || "",
            locality: props.locality || "",
            poi: props.poi_category || "",
          };

          onLocationChange(lat, lng, addressData);
          return addressData;
        } else {
          console.log("No features found in v6 geocoding response");
          // setCurrentAddress("Address not found");
          onLocationChange(lat, lng, null);
          return null;
        }
      } catch (error) {
        console.error("Geocoding v6 error:", error);
        // setCurrentAddress("Error finding address");
        onLocationChange(lat, lng, null);
        return null;
      } finally {
        setIsGeocodingLoading(false);
      }
    };

    // Debounce function
    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(null, args), wait);
      };
    };

    const debouncedGetAddress = useCallback(
      debounce((lat: number, lng: number) => {
        getAddressFromCoordinates(lat, lng);
      }, 800),
      [onLocationChange]
    );

    // Forward geocoding using v6 API
    const geocodeAddress = async (address: string) => {
      try {
        if (!mapboxgl.accessToken) {
          console.error("Mapbox access token is not set");
          return null;
        }

        const sessionToken = generateSessionToken();

        // Use structured search for better results
        const response = await fetch(
          `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
            address
          )}&access_token=${
            mapboxgl.accessToken
          }&session_token=${sessionToken}&limit=1&autocomplete=false`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Forward Geocoding v6 Response:", data);

        if (data.features && data.features.length > 0) {
          const coordinates = data.features[0].geometry.coordinates;
          const [lng, lat] = coordinates;
          return { lat, lng };
        }

        return null;
      } catch (error) {
        console.error("Forward geocoding v6 error:", error);
        return null;
      }
    };

    // Advanced structured search (optional for better accuracy)
    const geocodeStructuredAddress = async (addressComponents: {
      address_number?: string;
      street?: string;
      place?: string;
      region?: string;
      country?: string;
      postcode?: string;
    }) => {
      try {
        if (!mapboxgl.accessToken) {
          console.error("Mapbox access token is not set");
          return null;
        }

        const sessionToken = generateSessionToken();
        const params = new URLSearchParams({
          access_token: mapboxgl.accessToken,
          session_token: sessionToken,
          limit: "1",
        });

        // Add structured parameters
        Object.entries(addressComponents).forEach(([key, value]) => {
          if (value) {
            params.append(key, value);
          }
        });

        const response = await fetch(
          `https://api.mapbox.com/search/geocode/v6/forward?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Structured Geocoding v6 Response:", data);

        if (data.features && data.features.length > 0) {
          const coordinates = data.features[0].geometry.coordinates;
          const [lng, lat] = coordinates;
          return { lat, lng };
        }

        return null;
      } catch (error) {
        console.error("Structured geocoding v6 error:", error);
        return null;
      }
    };

    const flyTo = useCallback((lat: number, lng: number, zoom: number = 17) => {
      if (map.current) {
        map.current.flyTo({
          center: [lng, lat],
          zoom,
          duration: 2000,
        });
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        geocodeAddress,
        geocodeStructuredAddress,
        flyTo,
      }),
      []
    );

    useEffect(() => {
      if (!mapContainer.current) return;

      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        // style: "mapbox://styles/mapbox/dark-v11",
        center: [center.lng, center.lat],
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Get initial center location
      map.current.on("load", () => {
        if (map.current) {
          const mapCenter = map.current.getCenter();
          const coords = { lat: mapCenter.lat, lng: mapCenter.lng };
          getAddressFromCoordinates(coords.lat, coords.lng);
        }
      });

      // Listen for map movement
      map.current.on("moveend", () => {
        if (map.current) {
          const mapCenter = map.current.getCenter();
          const coords = { lat: mapCenter.lat, lng: mapCenter.lng };
          onLocationChange(coords.lat, coords.lng);
          debouncedGetAddress(coords.lat, coords.lng);
        }
      });

      // Cleanup
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }, []);

    // Update map center when props change
    useEffect(() => {
      if (map.current) {
        map.current.setCenter([center.lng, center.lat]);
      }
    }, [center.lat, center.lng]);

    const mapStyles = {
      container: {
        position: "relative" as const,
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        border: "3px solid black",
        overflow: "hidden",
        ...style,
      },
      mapContainer: {
        width: "100%",
        height: "100%",
      },
      crosshair: {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        pointerEvents: "none" as const,
        userSelect: "none" as const,
        animation: isGeocodingLoading
          ? "pulse 1.5s ease-in-out infinite"
          : "none",
      },
      addressDisplay: {
        position: "absolute" as const,
        bottom: "10px",
        left: "10px",
        right: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        zIndex: 1000,
        maxHeight: "60px",
        overflow: "hidden",
      },
      animationStyles: `
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `,
    };

    return (
      <div style={mapStyles.container}>
        <style>{mapStyles.animationStyles}</style>

        <div ref={mapContainer} style={mapStyles.mapContainer} />

        <div
          style={mapStyles.crosshair}
          title="Drag the map to position this marker at desired location"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <line
              x1="5"
              y1="10"
              x2="15"
              y2="10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="10"
              y1="5"
              x2="10"
              y2="15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Address Display */}
        {/* <div style={mapStyles.addressDisplay}>
          {isGeocodingLoading
            ? "Finding address..."
            : currentAddress || "Move map to find address"}
        </div> */}
      </div>
    );
  }
);

MapWithCrosshair.displayName = "MapWithCrosshair";

export default MapWithCrosshair;
