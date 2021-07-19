import React from 'react';
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
  return (
    <div className="w-1/2 h-screen">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyApQ_v5-c91Jni8PC_znRRzPGxnKjuTBZc',
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {locations.map((el) => {
          return (
            <Marker text="h" lat={el.LATITUDE} lng={el.LONGITUDE} key={el.ID} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};
