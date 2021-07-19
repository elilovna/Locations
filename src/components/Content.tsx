import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocations } from '../API/api';
import { List } from './List';
import { GoogleMap } from './Map';
import { Location } from '../types';
import _ from 'lodash';

type Props = {};

export const Content: React.FC<Props> = () => {
  const { locations } = useLocations();
  const [bounds, setBounds] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const [listData, setListData] = useState<Location[]>([]);

  const refreshBounds = useCallback(
    (map: any) => {
      setBounds(map.getBounds());
    },
    [setBounds]
  );

  const filteredLocations = useMemo(() => {
    if (!bounds || !locations) {
      return [];
    }

    return locations.filter((l) =>
      bounds.contains({ lat: l.LATITUDE, lng: l.LONGITUDE })
    );
  }, [locations, bounds]);

  const refreshListData = useMemo(
    () =>
      _.debounce(() => {
        setListData(filteredLocations);
      }, 1000),
    [filteredLocations]
  );

  useEffect(refreshListData, [refreshListData]);

  return (
    <div className="flex flex-row justify-between space-x-6 h-screen max-h-screen">
      <List locations={listData} />
      <GoogleMap locations={filteredLocations} refreshBounds={refreshBounds} />
    </div>
  );
};
