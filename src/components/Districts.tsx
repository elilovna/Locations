import React, { useCallback, useMemo } from "react";
import { Location } from "./../types";
import { ImageCarousel } from "./ImageCarousel";

type Props = {
  locations: Location[];
};

export const Districts: React.FC<Props> = ({ locations }) => {
  const handleLocationClick = useCallback((id: number) => {
    window.open(window.location.href + `location/${id}`);
  }, []);

  const content = useMemo(() => {
    return locations.map((el, idx) => {
      return (
        <div
          className={idx % 2 === 0 ? "bg-red-100" : "bg-blue-100"}
          onClick={() => handleLocationClick(el.ID)}
        >
          <ImageCarousel
            photos={el.photos.slice(1)}
            name={el.NameMobileWeb}
            showIndicators={false}
          />
        </div>
      );
    });
  }, [handleLocationClick, locations]);

  return <div className="flex flex-row flex-wrap flex-1">{content}</div>;
};
