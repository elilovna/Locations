type Props = {
  text: string;
  lat: number;
  lng: number;
};

export const Marker: React.FC<Props> = ({ text }) => (
  <div className="absolute top-2/4 left-2/4 w-5 h-5 bg-red-300 border-2 border-red-700 rounded-full transform z-50">
    {text}
  </div>
);
