import { debounce } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocations } from '../API/api';
import { List } from './List';
import { GoogleMap } from './Map';

type Props = {};

export const Content: React.FC<Props> = () => {
  const { locations } = useLocations();
  const [bounds, setBounds] = useState<any>(null);

  const refreshBounds = useCallback(
    (map: any) => {
      setBounds(map.getBounds());
    },
    [setBounds]
  );

  const filteredLocations = useMemo(() => {
    if (!bounds) {
      return [];
    }

    return locations.filter((l) =>
      bounds.contains({ lat: l.LATITUDE, lng: l.LONGITUDE })
    );
  }, [locations, bounds]);

  return (
    <div className="flex flex-row justify-between space-x-6">
      <GoogleMap
        locations={filteredLocations}
        refreshBounds={refreshBounds}
      />
      <List locations={filteredLocations} />
    </div>
  );
};
