import clsx from "clsx";
import GoogleMapReact from "google-map-react";
import _ from "lodash";
import React, { useCallback, useMemo, useRef } from "react";
import { Location } from "../types";
import { Marker } from "./Marker";

interface GoogleMapsProps {
  locations: Location[];
  refreshBounds: (bounds: any) => void;
  selectedLocation: any;
  show: boolean;
}

const defaultProps = {
  center: {
    lat: 41.992854,
    lng: -124.2088,
  },
  zoom: 10,
};

export const GoogleMap: React.FC<GoogleMapsProps> = ({
  locations,
  refreshBounds,
  selectedLocation,
  show,
}) => {
  const mapRef = useRef<any>(null);

  const refreshBoundsFromMap = useCallback(
    (map: any) => {
      refreshBounds(map.getBounds());
    },
    [refreshBounds]
  );

  const refreshBoundsDebounced = useMemo(
    () =>
      _.debounce(refreshBoundsFromMap, 1, { leading: true, trailing: true }),
    [refreshBoundsFromMap]
  );

  const handleMarkerClick = useCallback((id: number) => {
    window.open(window.location.href + `location/${id}`);
  }, []);

  const markers = useMemo(() => {
    return locations.map((el) => {
      return (
        <Marker
          id={el.ID}
          lat={el.LATITUDE}
          lng={el.LONGITUDE}
          key={el.ID}
          selectedLocation={selectedLocation}
          onClick={handleMarkerClick}
        />
      );
    });
  }, [handleMarkerClick, locations, selectedLocation]);

  return (
    <div
      className={clsx(
        { "hidden md:block": !show, "w-full ": !show },
        "flex-1 h-full w-1/2"
      )}
    >
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          // TODO: Add a key from .ENV
          key: "",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onDrag={refreshBoundsDebounced}
        onDragEnd={refreshBoundsFromMap}
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          refreshBoundsFromMap(map);
        }}
        onChange={() => {
          if (mapRef.current) {
            refreshBounds(mapRef.current.getBounds());
          }
        }}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};
