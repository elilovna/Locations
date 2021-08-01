import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocations } from '../API/api';
import { Location } from '../types';
import { BottomNavBar, Tab } from './BottomBarMobile/BottomNavigatorMobile';
import { Districts } from './Districts';
import { defaultFilters } from './FilterView/filters';
import { FilterView } from './FilterView/FilterView';
import { List } from './List';
import { GoogleMap } from './Map';

export const Content: React.FC = () => {
  const { locations } = useLocations();
  const [bounds, setBounds] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [listData, setListData] = useState<Location[]>([]);
  const [mobileTab, setMobileTab] = useState<Tab>('map');
  const [selectedDistrict, setSelectedDistrict] = useState<string>();
  const [filters, setFilters] = useState(defaultFilters);

  const refreshBounds = useCallback(
    (bounds: any) => {
      setBounds(bounds);
    },
    [setBounds]
  );

  const filteredLocations = useMemo(() => {
    if (!bounds || !locations) {
      return [];
    }

    let locationsForBounds = locations.filter((l) =>
      bounds.contains({ lat: l.LATITUDE, lng: l.LONGITUDE })
    );

    const activeFilters = filters.filter((f) => f.value);
    if (activeFilters.length > 0) {
      locationsForBounds = locationsForBounds.filter((l) => {
        return activeFilters.reduce((prev, curr) => {
          const currentFilterKey = curr.key;
          return prev && l[currentFilterKey] === 'Yes';
        }, true as boolean);
      });
    }

    if (selectedDistrict) {
      locationsForBounds = locationsForBounds.filter((l) => {
        return l.COUNTY === selectedDistrict;
      });
    }
    return locationsForBounds;
  }, [bounds, locations, filters, selectedDistrict]);

  const refreshListData = useMemo(
    () =>
      _.debounce((filteredLocations: Location[]) => {
        setListData(filteredLocations);
      }, 200),
    []
  );

  useEffect(() => {
    refreshListData(filteredLocations);
  }, [filteredLocations, refreshListData]);

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
    <div className="h-screen flex flex-col">
      <FilterView filters={filters} changeFilters={setFilters} />
      {!!selectedDistrict ? (
        <Districts locations={filteredLocations} />
      ) : (
        <div className="flex justify-between overflow-scroll flex-1 flex-row md:space-x-4">
          <List
            expandDistrict={setSelectedDistrict}
            locations={listData}
            mouseEnter={mouseEnter}
            mouseLeave={mouseLeave}
            show={mobileTab === 'list'}
          />

          <GoogleMap
            locations={filteredLocations}
            refreshBounds={refreshBounds}
            selectedLocation={selectedLocation}
            show={mobileTab === 'map'}
          />
        </div>
      )}
      <div className="md:hidden sticky">
        <BottomNavBar onTabSelected={setMobileTab} selectedTab={mobileTab} />
      </div>
    </div>
  );
};
