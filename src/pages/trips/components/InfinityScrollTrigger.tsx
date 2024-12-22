import { Check, Loader2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

type Props = {
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
};

const InfinityScrollTrigger = ({ onIntersect, isFetching, hasNextPage }: Props) => {
  const scrollTrigger = useRef<HTMLDivElement>(null);

  // TODO: 왜 페이지 이상하게 불러와지는지 확인 필요함
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (scrollTrigger.current) {
      io.observe(scrollTrigger.current);
    }

    return () => {
      io.disconnect();
    };
  }, []);
  return (
    <div ref={scrollTrigger} className="flex items-center justify-center w-full h-7">
      {isFetching && <Loader2 size={28} className="text-text-tertiary animate-spin" />}
      {hasNextPage && <div onClick={() => onIntersect()}>더 불러오기</div>}
      {!hasNextPage && (
        <div className="flex items-center justify-center gap-1 text-base text-text-tertiary">
          <Check size={20} /> 모든 여행을 불러왔습니다.
        </div>
      )}
    </div>
  );
};

export default InfinityScrollTrigger;
