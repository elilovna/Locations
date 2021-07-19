import { memo } from 'react';
import clsx from 'clsx';
import Pin from '../assets/Google_Maps_pin.svg';

type Props = {
  text: string;
  lat: number;
  lng: number;
};

const MarkerRaw: React.FC<Props> = ({ text }) => {
  return (
    <div className={clsx('absolute top-2/4 left-2/4 group')}>
      <img src={Pin} alt={'pin'} className="w-5 h-auto transition origin-bottom ease-out transform bottom-4 group-hover:scale-110" />
    </div>
  );
};

export const Marker = memo(MarkerRaw);
