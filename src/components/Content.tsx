import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocations } from '../API/api';
import { List } from './List';
import { GoogleMap } from './Map';
import { Location } from '../types';
import _ from 'lodash';
import Map from '../assets/Map.svg';
import Menu from '../assets/Menu.svg';
import { FilterView } from './FilterView/FilterView';
import { defaultFilters } from './FilterView/filters';

export const Content: React.FC = () => {
  const { locations } = useLocations();
  const [bounds, setBounds] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [listData, setListData] = useState<Location[]>([]);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState(defaultFilters);

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

    const activeFilters = filters.filter((f) => f.value);

    const locationsForBounds = locations.filter((l) =>
      bounds.contains({ lat: l.LATITUDE, lng: l.LONGITUDE })
    );

    if (activeFilters.length === 0) {
      return locationsForBounds;
    }

    return locationsForBounds.filter((l) => {
      return activeFilters.reduce((prev, curr) => {
        return prev && l[curr.key] === 'Yes';
      }, true as boolean);
    });
  }, [bounds, locations, filters]);

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
      <div>
        <FilterView filters={filters} changeFilters={setFilters} />
      </div>
      <div
        className="flex flex-row justify-between space-x-6 overflow-scroll"
        style={{ height: 'calc(100vh - 70px)' }}
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
        />
      </div>
    </>
  );
};
