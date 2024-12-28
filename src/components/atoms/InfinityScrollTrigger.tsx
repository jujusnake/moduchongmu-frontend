import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

type Props = {
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  finishMessage?: string;
  className?: string;
};

const InfinityScrollTrigger = ({
  onIntersect,
  isFetching,
  hasNextPage,
  finishMessage = '모든 항목을 불러왔습니다.',
  className,
}: Props) => {
  const scrollTrigger = useRef<HTMLDivElement>(null);

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
    <div ref={scrollTrigger} className={cn('flex items-center justify-center w-full h-7', className)}>
      {isFetching && <Loader2 size={12} className="text-text-tertiary animate-spin" />}
      {hasNextPage && <div onClick={() => onIntersect()}>더 불러오기</div>}
      {!hasNextPage && (
        <div className="flex items-center justify-center gap-1 text-sm text-text-tertiary">
          <Check size={20} /> {finishMessage}
        </div>
      )}
    </div>
  );
};

export default InfinityScrollTrigger;
