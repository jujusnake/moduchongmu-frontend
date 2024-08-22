import { CSSProperties, MouseEvent as ReactMouseEvent, useState } from 'react';

const MINIMUM_RIPPLE_SIZE = 100;

type Ripple = {
  key: number;
  style: CSSProperties;
};

export default function useRipple(
  style: CSSProperties = {},
): [(event: ReactMouseEvent<HTMLElement, MouseEvent>) => void, JSX.Element[]] {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const showRipple = (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const rippleSize = Math.min(event.currentTarget.clientHeight, event.currentTarget.clientWidth, MINIMUM_RIPPLE_SIZE);

    const newRipple = {
      key: event.timeStamp,
      style: {
        display: 'block',
        width: rippleSize,
        height: rippleSize,
        position: 'absolute',
        left: x - rippleSize / 2,
        top: y - rippleSize / 2,
        background: 'currentColor',
        borderRadius: '50%',
        opacity: 0.4,
        pointerEvents: 'none',
        animationName: 'useRippleAnimation',
        animationDuration: '0.7s',
        animationFillMode: 'forwards',
        ...style,
      },
    } as Ripple;

    setRipples((state) => [...state, newRipple]);
  };

  const ripplesArray = ripples.map((currentRipple) => {
    const handleAnimationEnd = () => {
      setRipples((state) => state.filter((previousRipple) => previousRipple.key !== currentRipple.key));
    };

    return <span key={currentRipple.key} style={currentRipple.style} onAnimationEnd={handleAnimationEnd} />;
  });

  return [showRipple, ripplesArray];
}
