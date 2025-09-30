import React, { useRef, useState, useCallback, useEffect } from "react";
import MapWithCrosshair from "./MapWithCenterCrosshair";

// Simple debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Type definitions
interface AddressData {
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
}

interface GeocodeResult {
  address: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
  raw: google.maps.GeocoderResult;
}

interface MapWithCrosshairRef {
  geocodeAddress: (
    address: string
  ) => Promise<{ lat: number; lng: number } | null>;
  flyTo: (lat: number, lng: number, zoom?: number) => void;
}

interface GeoCodeAddressInputProps {
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  onAddressChange: (data: AddressData) => void;
  required?: boolean;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

const GeoCodeAddressInput: React.FC<GeoCodeAddressInputProps> = ({
  address = "",
  city = "",
  postalCode = "",
  state = "",
  country = "",
  latitude = "",
  longitude = "",
  onAddressChange,
  required = true,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 22.2859,
    lng: 114.1581,
  });

  const streetInputTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<MapWithCrosshairRef>(null);

  // Check if Google Maps API is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        setIsGoogleMapsLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkGoogleMaps()) {
      return;
    }

    // Poll for Google Maps to be available
    const pollInterval = setInterval(() => {
      if (checkGoogleMaps()) {
        clearInterval(pollInterval);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  // Google reverse geocoding function
  const reverseGeocode = useCallback(
    async (lat: number, lng: number): Promise<GeocodeResult> => {
      return new Promise((resolve, reject) => {
        if (
          !window.google ||
          !window.google.maps ||
          !window.google.maps.Geocoder
        ) {
          reject(new Error("Google Maps API not loaded"));
          return;
        }

        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat, lng };

        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK") {
            if (results && results[0]) {
              const addressComponents = results[0].address_components;
              const formattedAddress = results[0].formatted_address;

              let postalCode = "";
              let city = "";
              let country = "";
              let state = "";

              for (const component of addressComponents) {
                const types = component.types;
                if (types.includes("postal_code")) {
                  postalCode = component.long_name;
                }
                if (types.includes("locality")) {
                  city = component.long_name;
                }
                if (types.includes("administrative_area_level_1")) {
                  state = component.long_name;
                }
                if (types.includes("country")) {
                  country = component.long_name;
                }
              }

              resolve({
                address: formattedAddress,
                postal_code: postalCode,
                city: city,
                state: state,
                country: country,
                raw: results[0],
              });
            } else {
              reject(new Error("No results found"));
            }
          } else {
            reject(new Error(`Geocoder failed: ${status}`));
          }
        });
      });
    },
    []
  );

  // Use the debounced version for map location changes
  const handleLocationChange = useCallback(
    async (lat: number, lng: number) => {
      const newCoordinates = {
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      };

      setMapCenter({ lat, lng });

      // Always do a fresh check instead of relying on state
      const isGoogleAvailable = !!(
        window.google &&
        window.google.maps &&
        window.google.maps.Geocoder
      );

      if (isGoogleAvailable) {
        try {
          const geocodedData = await reverseGeocode(lat, lng);

          if (geocodedData) {
            onAddressChange({
              address: geocodedData.address || address,
              city: geocodedData.city || city,
              postalCode: geocodedData.postal_code || postalCode,
              state: geocodedData.state || state,
              country: geocodedData.country || country,
              ...newCoordinates,
            });
          }
        } catch (error) {
          console.error("Google reverse geocoding failed:", error);
          // Just update coordinates without address info
          onAddressChange({
            address,
            city,
            postalCode,
            state,
            country,
            ...newCoordinates,
          });
        }
      } else {
        // Just update coordinates
        onAddressChange({
          address,
          city,
          postalCode,
          state,
          country,
          ...newCoordinates,
        });
      }
    },
    [address, city, postalCode, state, country, onAddressChange, reverseGeocode]
  );
  // Handle individual field changes
  const handleFieldChange = useCallback(
    (fieldName: keyof AddressData, value: string) => {
      const updates: AddressData = {
        address,
        city,
        postalCode,
        state,
        country,
        latitude,
        longitude,
        [fieldName]: value,
      };
      onAddressChange(updates);
    },
    [
      address,
      city,
      postalCode,
      state,
      country,
      latitude,
      longitude,
      onAddressChange,
    ]
  );

  // Handle street address input with debouncing
  const handleStreetInputChange = useCallback(
    async (value: string) => {
      handleFieldChange("address", value);

      if (value && value.length > 3) {
        if (streetInputTimeoutRef.current) {
          clearTimeout(streetInputTimeoutRef.current);
        }

        streetInputTimeoutRef.current = setTimeout(async () => {
          if (value.length > 5 && mapRef?.current) {
            try {
              const result = await mapRef.current.geocodeAddress(value);
              if (result) {
                const { lat, lng } = result;
                setMapCenter({ lat, lng });
                mapRef.current.flyTo(lat, lng, 17);

                // Update with basic info first
                onAddressChange({
                  address: value,
                  city,
                  postalCode,
                  state,
                  country,
                  latitude: lat.toFixed(6),
                  longitude: lng.toFixed(6),
                });

                // Then try Google reverse geocoding for detailed address info
                const isGoogleAvailable = !!(
                  window.google &&
                  window.google.maps &&
                  window.google.maps.Geocoder
                );

                if (isGoogleAvailable) {
                  try {
                    const geocodedData = await reverseGeocode(lat, lng);
                    if (geocodedData) {
                      onAddressChange({
                        address: geocodedData.address || value,
                        city: geocodedData.city || city,
                        postalCode: geocodedData.postal_code || postalCode,
                        state: geocodedData.state || state,
                        country: geocodedData.country || country,
                        latitude: lat.toFixed(6),
                        longitude: lng.toFixed(6),
                      });
                    }
                  } catch (error) {
                    console.error("Google reverse geocoding failed:", error);
                  }
                }
              }
            } catch (error) {
              console.error("Mapbox geocoding error:", error);
            }
          }
        }, 2000);
      }
    },
    [
      city,
      postalCode,
      state,
      country,
      handleFieldChange,
      onAddressChange,
      reverseGeocode,
    ]
  );

  // Handle map search
  const handleSearchMapSelection = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!searchQuery) return;

      try {
        if (mapRef?.current) {
          // Use Mapbox for forward geocoding
          const result = await mapRef.current.geocodeAddress(searchQuery);
          if (result) {
            const { lat, lng } = result;
            setMapCenter({ lat, lng });
            mapRef.current.flyTo(lat, lng, 17);

            const coordinates = {
              latitude: lat.toFixed(6),
              longitude: lng.toFixed(6),
            };

            // Try Google reverse geocoding for detailed address info
            const isGoogleAvailable = !!(
              window.google &&
              window.google.maps &&
              window.google.maps.Geocoder
            );

            if (isGoogleAvailable) {
              try {
                const geocodedData = await reverseGeocode(lat, lng);
                if (geocodedData) {
                  onAddressChange({
                    address: geocodedData.address || address,
                    city: geocodedData.city || city,
                    postalCode: geocodedData.postal_code || postalCode,
                    state: geocodedData.state || state,
                    country: geocodedData.country || country,
                    ...coordinates,
                  });
                } else {
                  onAddressChange({
                    address,
                    city,
                    postalCode,
                    state,
                    country,
                    ...coordinates,
                  });
                }
              } catch (error) {
                console.error("Google reverse geocoding failed:", error);
                onAddressChange({
                  address,
                  city,
                  postalCode,
                  state,
                  country,
                  ...coordinates,
                });
              }
            } else {
              onAddressChange({
                address: searchQuery,
                city,
                postalCode,
                state,
                country,
                ...coordinates,
              });
            }

            setSearchQuery("");
            setGeocodeError(null);
          } else {
            setGeocodeError("Please try a different address");
          }
        }
      } catch {
        setGeocodeError("Please try a different address");
      }
    },
    [
      searchQuery,
      reverseGeocode,
      address,
      city,
      postalCode,
      state,
      country,
      onAddressChange,
    ]
  );

  // Render map component
  const renderMap = useCallback(() => {
    return (
      <MapWithCrosshair
        ref={mapRef}
        center={mapCenter}
        onLocationChange={handleLocationChange}
        style={styles.mapInner}
      />
    );
  }, [handleLocationChange, mapCenter]);

  return (
    <div style={styles.formGroup}>
      <div style={styles.container}>
        {/* Search Container */}
        <form onSubmit={handleSearchMapSelection} style={styles.searchForm}>
          <div style={styles.searchInputWrapper}>
            <input
              value={searchQuery}
              onChange={(event) => {
                if (geocodeError) {
                  setGeocodeError(null);
                }
                setSearchQuery(event.target.value);
              }}
              style={styles.searchInput}
              placeholder="Search for an address, city, or landmark in Hong Kong"
            />
          </div>
          <button type="submit" style={styles.searchButton}>
            <span>Search</span>
          </button>
        </form>

        {/* Status Messages */}
        {!isGoogleMapsLoaded && (
          <div style={styles.warningMessage}>
            Google Maps API loading... Reverse geocoding will be available once
            loaded.
          </div>
        )}

        {geocodeError && <div style={styles.errorMessage}>{geocodeError}</div>}

        {/* Map and Fields Container */}
        <div style={styles.contentContainer}>
          {/* Map Container */}
          <div style={styles.mapContainer}>{renderMap()}</div>

          {/* Fields Container */}
          <div style={styles.fieldsContainer}>
            {/* Address Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel} htmlFor="address">
                Street Address{required && " *"}
              </label>
              <input
                ref={addressRef}
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => handleStreetInputChange(e.target.value)}
                style={styles.input}
                required={required}
                placeholder="Enter street address"
                maxLength={45}
              />
            </div>

            {/* City Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel} htmlFor="city">
                City{required && " *"}
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                style={styles.input}
                placeholder="Enter city"
                maxLength={45}
                required={required}
              />
            </div>

            {/* Postal Code and State Row */}
            <div style={styles.rowContainer}>
              <div style={styles.fieldGroupHalf}>
                <label style={styles.fieldLabel} htmlFor="postal_code">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  value={postalCode}
                  onChange={(e) =>
                    handleFieldChange("postalCode", e.target.value)
                  }
                  style={styles.input}
                  placeholder="Postal code"
                  maxLength={10}
                />
              </div>

              <div style={styles.fieldGroupHalf}>
                <label style={styles.fieldLabel} htmlFor="state">
                  State/Region
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => handleFieldChange("state", e.target.value)}
                  style={styles.input}
                  placeholder="State or region"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Country Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel} htmlFor="country">
                Country{required && " *"}
              </label>
              <input
                ref={countryRef}
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                style={styles.input}
                required={required}
                placeholder="Country"
                maxLength={50}
              />
            </div>

            {/* Coordinates Row */}
            <div style={styles.rowContainer}>
              <div style={styles.fieldGroupHalf}>
                <label style={styles.fieldLabel} htmlFor="latitude">
                  Latitude{required && " *"}
                </label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={latitude}
                  style={{
                    ...styles.input,
                    backgroundColor: "#f9fafb",
                    color: "#6b7280",
                    cursor: "not-allowed",
                  }}
                  placeholder="22.2859"
                  required={required}
                  maxLength={12}
                  readOnly
                />
              </div>

              <div style={styles.fieldGroupHalf}>
                <label style={styles.fieldLabel} htmlFor="longitude">
                  Longitude{required && " *"}
                </label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={longitude}
                  style={{
                    ...styles.input,
                    backgroundColor: "#f9fafb",
                    color: "#6b7280",
                    cursor: "not-allowed",
                  }}
                  placeholder="114.1581"
                  required={required}
                  maxLength={12}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoCodeAddressInput;

const styles = {
  formGroup: {
    marginBottom: "24px",
  },
  formLabel: {
    display: "block",
    marginBottom: "12px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  searchForm: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  searchInputWrapper: {
    flex: 1,
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#1f2937",
    backgroundColor: "#ffffff",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  searchButton: {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,

  warningMessage: {
    color: "#92400e",
    backgroundColor: "#fef3c7",
    border: "1px solid #fcd34d",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  errorMessage: {
    color: "#dc2626",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  contentContainer: {
    // display: "flex",
    gap: "24px",
    flexDirection: "row" as const,
  },
  mapContainer: {
    flex: 1,
    marginBottom: "20px",
  },

  mapInner: {
    width: "100%",
    height: "400px",
  },

  fieldsContainer: {
    flex: 1,
    minWidth: "300px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
  },
  fieldGroupHalf: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
  },
  rowContainer: {
    display: "flex",
    gap: "12px",
  },
  fieldLabel: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    padding: "10px 14px",
    border: "2px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#1f2937",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
};
