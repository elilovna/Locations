import clsx from 'clsx';
import React, { useMemo } from 'react';
import { Location } from '../types';
import { CityComponent } from './CityComponent';
import { ListElement } from './ListElement';

type Props = {
  locations: Location[];
  mouseLeave: () => void;
  mouseEnter: (id: number) => void;
  show: boolean;
};

export type InfoByCounty = {
  [key: string]: Location[];
};

export const List: React.FC<Props> = ({
  locations,
  mouseLeave,
  mouseEnter,
  show,
}) => {
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
      <ListElement
        locations={locations}
        mouseLeave={mouseLeave}
        mouseEnter={mouseEnter}
      />
    );
  }, [locations, mouseEnter, mouseLeave]);

  return (
    <div className={clsx({ 'hidden md:block': !show, 'w-full': show }, 'md:w-1/2 overflow-scroll')}>
      {content}
    </div>
  );
};
