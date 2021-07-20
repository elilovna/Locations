import clsx from 'clsx';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { Location } from '../types';
import { Marker } from './Marker';

interface GoogleMapsProps {
  locations: Location[];
  refreshBounds: (map: any) => void;
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
  const refreshBoundsDebounced = useMemo(
    () => _.debounce(refreshBounds, 1, { leading: true, trailing: true }),
    [refreshBounds]
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
        { 'hidden md:block': !show, 'w-full ': !show },
        'md:w-1/2 h-auto'
      )}
    >
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: 'AIzaSyApQ_v5-c91Jni8PC_znRRzPGxnKjuTBZc',
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onDrag={refreshBoundsDebounced}
        onDragEnd={refreshBounds}
        onGoogleApiLoaded={({ map }) => refreshBounds(map)}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};
