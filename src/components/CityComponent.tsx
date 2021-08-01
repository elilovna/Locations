import React, { useCallback } from "react";
import { Location } from "../types";
import { ImageCarousel } from "./ImageCarousel";

interface CityComponentProps {
  cityName: string;
  beaches: Location[];
  expandDistrict: (districtId: string) => void;
}

export const CityComponent: React.FC<CityComponentProps> = ({
  cityName,
  beaches,
  expandDistrict,
}) => {
  const handleSeeMore = useCallback(() => {
    expandDistrict(cityName);
  }, [cityName, expandDistrict]);

  const extraBeaches = beaches.length - 6;

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h3 className="font-bold py-4 text-xl text-gray-700">{cityName}</h3>
        {extraBeaches > 0 && (
          <div className="flex flex-row items-center">
            <button
              onClick={handleSeeMore}
              className="bg-gray-50 text-sm text-gray-900 border border-gray-400 rounded-md px-2 py-1"
            >
              See more {extraBeaches}
            </button>
          </div>
        )}
      </div>
      <div className="overflow-x-scroll">
        <div className="grid gap-4 grid-flow-col">
          {beaches.slice(0, 6).map((el, idx) => {
            return (
              <div
                style={{
                  width: "300px",
                }}
                onClick={handleSeeMore}
                key={idx}
              >
                <ImageCarousel
                  photos={el.photos.slice(1)}
                  name={el.LocationMobileWeb}
                  className="max-h-48"
                  showIndicators={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
