import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { Location } from '../types';
import { Marker } from './Marker';

interface GoogleMapsProps {
  locations: Location[];
  refreshBounds: (map: any) => void;
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
}) => {
  const refreshBoundsDebounced = useMemo(
    () => _.debounce(refreshBounds, 1, { leading: true, trailing: true }),
    [refreshBounds]
  );

  const markers = useMemo(() => {
    return locations.map((el) => {
      return (
        <Marker
          text={`${el.ID}`}
          lat={el.LATITUDE}
          lng={el.LONGITUDE}
          key={el.ID}
        />
      );
    });
  }, [locations]);

  return (
    <div className="w-1/2 h-screen">
      <GoogleMapReact
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
