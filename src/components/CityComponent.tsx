import React from 'react';
import { Location } from '../types';
import { ImageCarousel } from './ImageCarousel';

interface CityComponentProps {
  cityName: string;
  beaches: Location[];
}

export const CityComponent: React.FC<CityComponentProps> = ({
  cityName,
  beaches,
}) => {
  return (
    <div className="">
      <div className="w-full flex justify-between">
        <h3 className="font-bold py-4 text-xl text-gray-700">{cityName}</h3>
        <p>{beaches.length}</p>
      </div>
      <div className="overflow-x-scroll">
        <div className="grid gap-4 grid-flow-col">
          {beaches.slice(0, 6).map((el, idx) => {
            return (
              <div
                style={{
                  width: '300px',
                }}
                key={idx}
              >
                <ImageCarousel photos={el.photos} name={el.LocationMobileWeb} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
