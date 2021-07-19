import axios from 'axios';
import useAxios from 'axios-hooks';
import { useMemo } from 'react';
import { Location } from '../types';

export const useLocations = () => {
  const [{ data: locations, ...rest }] = useAxios({ url: `https://api.coastal.ca.gov/access/v1/locations` })

  const formattedLocations: Location[] = useMemo(() => {
    if (!locations) {
      return null
    }

    return locations.map((el: Location) => {
      const photos = [];
      if (el.Photo_1 !== '') photos.push(el.Photo_1);
      if (el.Photo_2 !== '') photos.push(el.Photo_2);
      if (el.Photo_3 !== '') photos.push(el.Photo_3);
      if (el.Photo_4 !== '') photos.push(el.Photo_4);
      return { ...el, photos: photos };
    });
  }, [locations])

  return { locations: formattedLocations, rest }
}

// TODO: Add validation
export const getLocationByID = async (id: number) => {
  const res = await axios.get(`https://api.coastal.ca.gov/access/v1/locations`);
  return res;
};

// TODO: Add validation
export const getLocationByName = async (name: string) => {
  const res = await axios.get(`https://api.coastal.ca.gov/access/v1/locations`);
  console.log(res);
  return res;
};
