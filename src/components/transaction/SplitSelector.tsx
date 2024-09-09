import { formatAmountWithCurrency } from '@/lib/money';
import AmountInput from '../atoms/AmountInput';

type Props = {
  amount?: number;
  currency?: string;
  users?: string[];
  isEven?: boolean;
  onSplitModeChange?: (isEven: boolean) => void;
};

const SplitSelector = ({ amount, currency, users, isEven, onSplitModeChange }: Props) => {
  const userCount = users?.length;

  return (
    <>
      <section className="flex items-center justify-between gap-4">
        <button
          className="relative flex items-center gap-1 p-1 bg-bg-front rounded-[4px]"
          onClick={() => onSplitModeChange?.(!isEven)}
        >
          <div
            className="z-10 px-3 py-2 text-sm font-semibold text-text-secondary data-[selected=true]:text-brand-primary-contrastText"
            data-selected={isEven}
          >
            1/N로 나누기
          </div>
          <div
            data-selected={!isEven}
            className="z-10 px-3 py-2 text-sm font-semibold text-text-secondary data-[selected=true]:text-brand-primary-contrastText"
          >
            세부항목 나누기
          </div>

          {/* Selected Indicator */}
          <div
            className="z-0 absolute top-1 bottom-1 left-1 bg-brand-primary-dark data-[even=true]:w-[87px] data-[even=false]:translate-x-[91px] data-[even=false]:w-[100px] transition-all rounded-sm"
            data-even={isEven}
          />
        </button>

        {isEven ? (
          <aside className="text-sm font-semibold text-text-aside">
            1인당{' '}
            {amount !== undefined && userCount !== undefined
              ? formatAmountWithCurrency(amount / userCount, currency)
              : 0}
          </aside>
        ) : (
          <></>
        )}
      </section>
      {isEven === false ? (
        <div className="p-3">
          <div className="flex items-center justify-between gap-3">
            <div>나</div>
            <AmountInput value={'10000'} onValueChange={(value) => console.log(value)} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SplitSelector;
