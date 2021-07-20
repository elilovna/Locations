import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocations } from '../API/api';
import { List } from './List';
import { GoogleMap } from './Map';
import { Location } from '../types';
import _ from 'lodash';
import Map from '../assets/Map.svg';
import Menu from '../assets/Menu.svg';

export const Content: React.FC = () => {
  const { locations } = useLocations();
  const [bounds, setBounds] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [listData, setListData] = useState<Location[]>([]);
  const [view, setView] = useState<'list' | 'map'>('list');

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

  const mouseLeave = useCallback(() => {
    setSelectedLocation(null);
  }, [setSelectedLocation]);

  const mouseEnter = useCallback(
    (id: number) => {
      setSelectedLocation(id);
    },
    [setSelectedLocation]
  );

  return (
    <>
      <div className="md:hidden flex flex-row space-x-5">
        <label
          htmlFor="list"
          className="flex flex-row"
          onClick={() => setView('list')}
        >
          <input id="list" type="radio" className="hidden" name="view" />
          <img src={Menu} alt="menu-icon" />
          <span>List</span>
        </label>
        <label
          htmlFor="map"
          className="flex flex-row"
          onClick={() => setView('map')}
        >
          <input id="map" type="radio" className="hidden" name="view" />
          <img src={Map} alt="menu-icon" />
          <span>Map</span>
        </label>
      </div>
      <div
        className="flex flex-row justify-between space-x-6 overflow-scroll"
        style={{ height: 'calc(100vh - 52px)' }}
      >
        <List
          locations={listData}
          mouseEnter={mouseEnter}
          mouseLeave={mouseLeave}
          show={view === 'list'}
        />

        <GoogleMap
          locations={filteredLocations}
          refreshBounds={refreshBounds}
          selectedLocation={selectedLocation}
          show={view === 'map'}
          // pinClickHandler={pinClickHandler}
        />
      </div>
    </>
  );
};
