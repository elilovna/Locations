import clsx from "clsx";
import { SVGAttributes } from "react";

type Props = {
  onClick: () => void;
  title: string;
  renderIcon: (props: SVGAttributes<unknown>) => React.ReactNode;
  selected: boolean;
};

export const BottomBarButton: React.FC<Props> = ({
  onClick,
  title,
  selected,
  renderIcon,
}) => {
  return (
    <button
      className="flex flex-col w-1/2 items-center justify-center"
      onClick={onClick}
    >
      {renderIcon({
        className: clsx({
          "fill-current text-blue-400": selected,
        }),
      })}
      <span
        className={clsx({
          "text-blue-400": selected,
        })}
      >
        {title}
      </span>
    </button>
  );
};
