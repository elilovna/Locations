import * as React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import beach from '../assets/beach.png';

interface ImageCarouselProps {
  name: string;
  photos: string[] | []; //TODO:refactoring
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  name,
  photos,
}) => {
  return (
    <div className="rounded-md overflow-hidden w-full border border-gray-300">
      {photos.length > 0 ? (
        <Carousel showThumbs={false} showStatus={false} className="max-h-52">
          {photos.map((el, idx) => {
            return <Image src={el} name={name} key={idx} />;
          })}
        </Carousel>
      ) : (
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          className="max-h-52"
        >
          {[<Image src={beach} name={name} />]}
        </Carousel>
      )}
    </div>
  );
};

interface ImageProps {
  src: string;
  name: string;
}

const Image: React.FC<ImageProps> = ({ src, name }) => {
  return (
    <div>
      <img src={src} alt={name} />
      <p className="legend truncate">{name}</p>
    </div>
  );
};
