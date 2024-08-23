import { cn } from '@/lib/utils';
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type SwitchTransitionContextValue = {
  on?: boolean;
  offRef?: RefObject<HTMLDivElement>;
  onRef?: RefObject<HTMLDivElement>;
};

const SwitchTransitionContext = createContext<SwitchTransitionContextValue>({});

interface SwitchTransitionContainerProps extends HTMLAttributes<HTMLDivElement> {
  on: boolean;
}

const DURATION = 300;

const SwitchTransitionContainer = forwardRef<HTMLDivElement, SwitchTransitionContainerProps>(
  ({ on, className, ...props }, ref) => {
    const [height, setHeight] = useState<number | string>('auto');

    const offRef = useRef<HTMLDivElement>(null);
    const onRef = useRef<any>(null);

    useLayoutEffect(() => {
      if (on) {
        setHeight(onRef.current?.clientHeight ?? 0);
      } else {
        setHeight(offRef.current?.clientHeight ?? 0);
      }
    }, []);

    useEffect(() => {
      if (on) {
        setHeight(onRef.current?.clientHeight ?? 0);
      } else {
        setHeight(offRef.current?.clientHeight ?? 0);
      }
    }, [on]);

    return (
      <SwitchTransitionContext.Provider
        value={{
          on,
          offRef,
          onRef,
        }}
      >
        <div
          ref={ref}
          className={cn('relative w-full overflow-hidden transition-[height]', className)}
          style={{ height, transitionDuration: `${DURATION * 2}ms` }}
          {...props}
        />
      </SwitchTransitionContext.Provider>
    );
  },
);

interface SwitchTransitionChildProps extends HTMLAttributes<HTMLDivElement> {}

const SwitchTransitionOff = ({ className, ...props }: SwitchTransitionChildProps) => {
  const { on, offRef } = useContext(SwitchTransitionContext);

  return (
    <div
      ref={offRef}
      className={cn(
        'absolute top-0 left-0 w-full data-[hide=true]:invisible data-[hide=true]:opacity-0 transition-[visibility,_opacity] ease-out',
        className,
      )}
      style={{ transitionDuration: `${DURATION}ms`, transitionDelay: on ? '0ms' : `${DURATION}ms` }}
      data-hide={on}
      {...props}
    />
  );
};

const SwitchTransitionOn = ({ className, ...props }: SwitchTransitionChildProps) => {
  const { on, onRef } = useContext(SwitchTransitionContext);

  return (
    <div
      ref={onRef}
      className={cn(
        'absolute top-0 left-0 w-full data-[hide=true]:invisible data-[hide=true]:opacity-0 transition-[visibility,_opacity] ease-out',
        className,
      )}
      style={{ transitionDuration: `${DURATION}ms`, transitionDelay: !on ? '0ms' : `${DURATION}ms` }}
      data-hide={!on}
      {...props}
    />
  );
};

export { SwitchTransitionContainer, SwitchTransitionOff, SwitchTransitionOn };
