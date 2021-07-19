import React, { useMemo } from 'react';
import { Location } from '../types';
import { CityComponent } from './CityComponent';

interface InfoProps {
  locations: Location[];
}

type InfoByCounty = {
  [key: string]: Location[];
};

export const Info: React.FC<InfoProps> = ({ locations }) => {
  const memoizedValue = useMemo(() => {
    const infoStart: InfoByCounty = {};
    return locations.reduce((acc, curr) => {
      const res = { ...acc };
      return { ...res, [curr.COUNTY]: [...(res[curr.COUNTY] ?? []), curr] };
    }, infoStart);
  }, [locations]);
  const keys = Object.keys(memoizedValue); //TODO:refactoring

  return (
    <div className="w-1/2">
      {keys.map((el, idx) => {
        return (
          <div key={idx}>
            <CityComponent cityName={el} beaches={memoizedValue[el]} />
          </div>
        );
      })}
    </div>
  );
};
