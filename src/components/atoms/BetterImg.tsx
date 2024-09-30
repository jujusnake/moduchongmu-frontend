import { useEffect, useState } from 'react';

interface BetterImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const BetterImg = (props: BetterImgProps) => {
  const [isError, setIsError] = useState(false);

  const hidden = props.src === undefined || props.hidden || isError;

  useEffect(() => {
    setIsError(false);
  }, [props.src]);

  if (hidden) {
    return null;
  }

  return (
    <img
      hidden={hidden}
      onLoad={() => setIsError(false)}
      onError={(e) => {
        setIsError(true);
        props.onError?.(e);
      }}
      {...props}
    />
  );
};

export default BetterImg;
