import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocationByID } from '../API/api';
import { ImageCarousel } from './ImageCarousel';

export const DetailInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { location } = useLocationByID(id);

  if (!location) {
    return null;
  }

  return (
    <div  style={{
      width: 500
    }}>
      <ImageCarousel
        name={location.NameMobileWeb}
        photos={location.photos}
       
      />
    </div>
  );
};
