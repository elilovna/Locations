import clsx from "clsx";
import React, { useMemo } from "react";
import { Location } from "../types";
import { CityComponent } from "./CityComponent";
import { ListElement } from "./ListElement";

type Props = {
  locations: Location[];
  mouseLeave: () => void;
  mouseEnter: (id: number) => void;
  show: boolean;
  expandDistrict: (districtId: string) => void;
};

export type InfoByCounty = {
  [key: string]: Location[];
};

export const List: React.FC<Props> = ({
  locations,
  mouseLeave,
  mouseEnter,
  show,
  expandDistrict,
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
          <div key={idx} className="ml-6 mr-6 md:mr-0">
            <CityComponent
              cityName={el}
              beaches={dataByCity[el]}
              expandDistrict={expandDistrict}
            />
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
  }, [locations, mouseEnter, mouseLeave, expandDistrict]);

  return (
    <div
      className={clsx(
        { "hidden md:block": !show, "w-full": show },
        "flex-1 overflow-scroll mt-2"
      )}
    >
      {content}
    </div>
  );
};
