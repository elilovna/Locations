import * as React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import beach from "../assets/beach.png";

interface ImageCarouselProps {
  name: string;
  photos: string[];
  className?: string;
  showIndicators?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  name,
  photos,
  className,
  showIndicators,
}) => {
  return (
    <div className="rounded-md overflow-hidden w-full border border-gray-400">
      {photos.length > 0 ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          className={className}
          showIndicators={showIndicators}
        >
          {photos.map((el, idx) => {
            return <Image src={el} name={name} key={idx} />;
          })}
        </Carousel>
      ) : (
        <Carousel
          showThumbs={false}
          showStatus={false}
          className={className}
          showIndicators={showIndicators}
        >
          {[<Image src={beach} name={name} key={name} />]}
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
