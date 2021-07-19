import React, { useMemo } from 'react';
import { Location } from '../types';
import { CityComponent } from './CityComponent';
import { ListElement } from './ListElement';

type Props = {
  locations: Location[];
};

export type InfoByCounty = {
  [key: string]: Location[];
};

export const List: React.FC<Props> = ({ locations }) => {
  const content = useMemo(() => {
    const infoStart: InfoByCounty = {};
    const dataByCity = locations.reduce((acc, curr) => {
      const res = { ...acc };
      return { ...res, [curr.COUNTY]: [...(res[curr.COUNTY] ?? []), curr] };
    }, infoStart);

    const keys = Object.keys(dataByCity); 

    return keys.length > 1 ? (
      keys.map((el, idx) => {
        return (
          <div key={idx}>
            <CityComponent cityName={el} beaches={dataByCity[el]} />
          </div>
        );
      })
    ) : (
      <ListElement locations={locations} />
    );
  }, [locations]);

  return <div className="w-1/2 h-screen overflow-scroll">{content}</div>;
};
