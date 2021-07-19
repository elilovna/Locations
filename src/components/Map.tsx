import React, { useCallback, useMemo, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Location } from '../types';
import { Marker } from './Marker';

interface GoogleMapsProps {
  locations: Location[];
}

const defaultProps = {
  center: {
    lat: 41.992854,
    lng: -124.2088,
  },
  zoom: 10,
};

export const GoogleMap: React.FC<GoogleMapsProps> = ({ locations }) => {
  const [bounds, setBounds] = useState<any>(null);

  const refreshBounds = useCallback(
    (map: any) => {
      setBounds(map.getBounds());
    },
    [setBounds]
  );

  const markers = useMemo(() => {
    if (!bounds) {
      return [];
    }

    return locations
      .filter((l) => bounds.contains({ lat: l.LATITUDE, lng: l.LONGITUDE }))
      .map((el) => {
        return (
          <Marker
            text={`${el.ID}`}
            lat={el.LATITUDE}
            lng={el.LONGITUDE}
            key={el.ID}
          />
        );
      });
  }, [locations, bounds]);

  return (
    <div className="w-1/2 h-screen">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyApQ_v5-c91Jni8PC_znRRzPGxnKjuTBZc',
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onDragEnd={refreshBounds}
        onGoogleApiLoaded={({ map }) => refreshBounds(map)}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};
