import clsx from "clsx";
import { memo, useCallback } from "react";
import Pin from "../assets/Google_Maps_pin.svg";

type Props = {
  id: number;
  lat: number;
  lng: number;
  selectedLocation: number;
  onClick: (id: number) => void;
};

const MarkerRaw: React.FC<Props> = ({ id, selectedLocation, onClick }) => {
  const handleDivClick = useCallback(() => onClick(id), [id, onClick]);
  return (
    <div
      className="absolute top-2/4 left-2/4 group"
      key={id}
      onClick={handleDivClick}
    >
      <img
        src={Pin}
        alt={"pin"}
        className={clsx(
          "w-5 h-auto transition origin-bottom ease-out transform group-hover:scale-150 absolute bottom-px -right-2",
          { "transform scale-150": selectedLocation === id }
        )}
      />
    </div>
  );
};

export const Marker = memo(MarkerRaw);
