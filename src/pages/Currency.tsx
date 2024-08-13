import { useState } from 'react';

const Currency = () => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [arrowPos, setArrowPos] = useState<number>(0);
  const [isSwitched, setIsSwitched] = useState(false);
  console.log(arrowPos);

  const handleSwitch = () => {
    setArrowPos(100);
    setTimeout(() => {
      setIsTransitioning(false);
      setArrowPos(-100);
      setIsSwitched((prev) => !prev);

      setTimeout(() => {
        setIsTransitioning(true);
        setArrowPos(0);
      }, 100);
    }, 200);
  };

  return (
    <main className="min-h-[calc(100dvh-80px)] grid grid-cols-1 grid-rows-2 overflow-hidden relative">
      <div className="bg-brand-primary-dark px-6 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] z-10 pt-10 pb-[56px]">
        <h1 className="text-brand-primary-contrastText font-semibold text-2xl">환율 계산기</h1>
      </div>
      <button
        className="absolute z-20 absolute-center bg-bg-back p-[18px] rounded-full shadow-md"
        onClick={handleSwitch}
      >
        <div className="w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down-up"
          >
            <g
              style={{
                transition: isTransitioning ? 'transform 200ms ease-in-out' : '',
                transform: `translate(${isSwitched ? 10 : 0}px, ${arrowPos}%)`,
              }}
            >
              <path d="m3 16 4 4 4-4" />
              <path d="M7 20V4" />
            </g>
            <g
              style={{
                transition: isTransitioning ? 'transform 200ms ease-in-out' : '',
                transform: `translate(${isSwitched ? -10 : 0}px, ${-arrowPos}%)`,
              }}
            >
              <path d="m21 8-4-4-4 4" />
              <path d="M17 4v16" />
            </g>
          </svg>
        </div>
      </button>
      <div className="bg-bg-back px-6">asdf</div>
    </main>
  );
};

export default Currency;
