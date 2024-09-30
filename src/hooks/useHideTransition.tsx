import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useHideTransition = (isOn: boolean) => {
  const offRef = useRef<any>(null);
  const onRef = useRef<any>(null);

  const [containerHeight, setContainerHeight] = useState(onRef.current?.clientHeight ?? 0);

  useLayoutEffect(() => {
    if (isOn) {
      setContainerHeight(onRef.current?.clientHeight ?? 0);
    } else {
      setContainerHeight(offRef.current?.clientHeight ?? 0);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isOn) {
        setContainerHeight(onRef.current?.clientHeight ?? 0);
      } else {
        setContainerHeight(offRef.current?.clientHeight ?? 0);
      }
    }, 100);
  }, [isOn]);

  const cn = `data-[hide=true]:invisible data-[hide=true]:delay-0 data-[hide=true]:opacity-0 transition-[visibility,_opacity] duration-500 delay-500 ease-out`;

  const offProps = { 'data-hide': isOn };
  const onProps = { 'data-hide': !isOn };

  return {
    offRef,
    onRef,
    containerHeight,
    cn,
    offProps,
    onProps,
  };
};

export default useHideTransition;
