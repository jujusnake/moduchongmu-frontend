import { getCityThumbnail } from '@/lib/urls';
import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';

type Props = { city?: string } & React.ImgHTMLAttributes<HTMLImageElement>;

const TripThumbnailImg = ({ city, src, className, onLoad, onError, ...props }: Props) => {
  const imgAttempt = useRef<number>(0);
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  const handleLoadError = () => {
    setImgLoaded(false);
    if (imgAttempt.current < 1) {
      setImgSrc(getCityThumbnail(city));
    }
    imgAttempt.current += 1;
  };

  return (
    <img
      {...props}
      src={imgSrc}
      className={cn(`w-full h-full object-cover data-[loaded=false]:opacity-0 transition-opacity`, className)}
      data-loaded={imgLoaded}
      onLoad={() => setImgLoaded(true)}
      onError={handleLoadError}
    />
  );
};

export default TripThumbnailImg;
