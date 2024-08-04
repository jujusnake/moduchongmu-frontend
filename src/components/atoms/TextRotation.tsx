import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';

type Props = {
  textArr: string[];
  timing?: number;
} & HTMLAttributes<HTMLDivElement>;

const TextRotation = ({ textArr, timing = 2000, className, ...props }: Props) => {
  const [currentTextIdx, setCurrentTextIdx] = useState<number>(0);
  const [noTransition, setNoTransition] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIdx((prev) => {
        if (prev > textArr.length - 2) {
          setTimeout(() => {
            setCurrentTextIdx(0);
            setNoTransition(true);
          }, 200);
        } else {
          setNoTransition(false);
        }
        return prev + 1;
      });
    }, timing);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={cn('overflow-hidden relative w-full', className)} {...props}>
      <div
        className="flex flex-col items-center transition-transform data-[notransition='true']:duration-0 absolute w-full"
        data-notransition={noTransition}
        style={{
          transform: `translateY(-${(100 / (textArr.length + 1)) * currentTextIdx}%)`,
        }}
      >
        {textArr.map((text, idx) => (
          <div>{text}</div>
        ))}
        <div>{textArr[0]}</div>
      </div>
    </div>
  );
};

export default TextRotation;
