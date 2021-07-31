import React from "react";
import { useParams } from "react-router-dom";
import { useLocationByID } from "../API/api";
import beach from "../assets/beach.png";
import { ReactComponent as Bike } from "../assets/bike.svg";
import { ReactComponent as Camping } from "../assets/camping.svg";
import { ReactComponent as Cliff } from "../assets/cliff.svg";
import { ReactComponent as Dog } from "../assets/dog.svg";
import { ReactComponent as Fishing } from "../assets/fishing.svg";
import { ReactComponent as Parking } from "../assets/parking.svg";
import { ReactComponent as Picnic } from "../assets/picnik.svg";
import { ReactComponent as Restroom } from "../assets/restroom.svg";
import { ReactComponent as Boat } from "../assets/sail-boat.svg";

export const DetailInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { location } = useLocationByID(id);

  if (!location) {
    return null;
  }

  return (
    <div className="p-4 flex flex-col items-center container mx-auto">
      <h1 className="text-xl font-bold py-4">
        {location.NameMobileWeb}
      </h1>
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 items-center">
        {location.photos.length > 0 ? (
          location.photos.map((el) => {
            return (
              <div className="flex-1 ">
                <img
                  src={el}
                  alt="location"
                  className="border-gray-400 border rounded-md hover:hidden"
                />
              </div>
            );
          })
        ) : (
          <img
            src={beach}
            alt="location"
            className="border-gray-400 border rounded-md hover:hidden h-96 w-auto"
          />
        )}
      </div>
      <p className="py-4 text-base">{location.DescriptionMobileWeb}</p>
      <div className="flex md:flex-row space-x-4 md:space-x-0 flex-wrap justify-between w-full py-4">
        <>{location.DOG_FRIENDLY && <Image name="Dog Friendly" Icon={Dog} />}</>
        <>{location.BIKE_PATH && <Image name="Bike path" Icon={Bike} />}</>
        <>{location.CAMPGROUND && <Image name="Camping" Icon={Camping} />}</>
        <>{location.PARKING && <Image name="Parking" Icon={Parking} />}</>
        <>{location.BLUFF && <Image name="Cliff" Icon={Cliff} />}</>
        <>{location.PCNC_AREA && <Image name="Picnic" Icon={Picnic} />}</>
        <>{location.RESTROOMS && <Image name="Restroom" Icon={Restroom} />}</>
        <>
          {location.FISHING && (
            <Image name="Fishing" Icon={Fishing} key="Fishing" />
          )}
        </>
        <>
          {location.BOATING && (
            <Image name="Boating" Icon={Boat} key="Boating" />
          )}
        </>
      </div>
    </div>
  );
};

type ImageProps = {
  name: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const Image: React.FC<ImageProps> = ({ name, Icon }) => {
  return (
    <div className="flex w-4/12 md:w-auto flex-col justify-between hover:text-blue-700">
      <Icon className="w-15 fill-current hover:text-blue-700" />
      <span>{name}</span>
    </div>
  );
};
