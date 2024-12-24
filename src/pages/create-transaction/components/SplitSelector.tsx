import {
  formatAmountWithCurrency,
  getDecimalCountFromCurrency,
  trimStringToFloat,
  validateNumberString,
} from '@/lib/money';
import AmountInput from '@/components/atoms/AmountInput';
import { Member } from '@/types/travel';
import { useEffect, useMemo } from 'react';

type Props = {
  amount?: string;
  currency?: string;
  users?: Member[];
  isEven?: boolean;
  onSplitModeChange?: (isEven: boolean) => void;
  expenseSplit?: Map<number, string>;
  setExpenseSplit?: (userIdx: number, amount: string) => void;
};

const SplitSelector = ({
  amount,
  currency,
  users,
  isEven,
  onSplitModeChange,
  expenseSplit,
  setExpenseSplit,
}: Props) => {
  // Values
  const userCount = useMemo(() => users?.length, [users]);
  const decimalCount = useMemo(() => getDecimalCountFromCurrency(currency), [currency]);
  const evenlySplitAmount = useMemo(() => {
    if (amount === undefined || amount?.length < 1 || userCount === undefined || userCount === 0) return '';

    const amountPerPerson = (Number(amount) / userCount).toFixed(decimalCount);
    const numPerPerson = Number(amountPerPerson);

    return formatAmountWithCurrency(numPerPerson, currency ?? 'KRW');
  }, [amount, userCount]);

  const sumDifference = useMemo(() => {
    if (amount === undefined || expenseSplit === undefined) return 123456;
    const sumOfSplits = Array.from(expenseSplit.values()).reduce((acc, curr) => {
      const num = Number(curr) || 0;
      return acc + num * 10 ** 3;
    }, 0);
    const numAmount = Number(amount) * 10 ** 3;

    return numAmount - sumOfSplits;
  }, [amount, expenseSplit?.values()]);

  const unevenSplitPlaceholder = useMemo(() => {
    if (amount === undefined || userCount === undefined || userCount === 0 || expenseSplit === undefined) return '';
    const filledCount = Array.from(expenseSplit.values()).filter((v) => v.length > 0).length;
    const emptyPersonCount = userCount - filledCount;
    const amountPerPerson = sumDifference / emptyPersonCount / 10 ** 3;
    return amountPerPerson.toString();
  }, [amount, sumDifference, expenseSplit?.values(), userCount]);

  return (
    <div>
      <section className="flex items-center justify-between gap-4 mb-2">
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

        {isEven === true && evenlySplitAmount.length > 0 && (
          <aside className="text-sm font-semibold text-text-aside">{`1인당 ${evenlySplitAmount}`}</aside>
        )}
      </section>
      {isEven === false && (
        <form className="px-4 py-3 rounded bg-[#f4f9fd] space-y-2">
          {users && users.length > 0 ? (
            <>
              {users?.map((user) => (
                <div key={`split-uneven-user-item-${user.idx}`} className="flex items-center justify-between gap-3">
                  <div className="w-1/2 text-base font-semibold truncate">{user.name}</div>
                  <input
                    inputMode="decimal"
                    type="text"
                    min={0}
                    className="w-1/2 px-3 py-2 text-base font-medium bg-white rounded text-end"
                    placeholder={unevenSplitPlaceholder}
                    value={expenseSplit?.get(user.idx) ?? ''}
                    onChange={(e) => {
                      if (validateNumberString(e.target.value, 3)) {
                        setExpenseSplit?.(user.idx, e.target.value);
                      }
                    }}
                    onBlur={(e) => {
                      const trimmed = trimStringToFloat(e.target.value);
                      setExpenseSplit?.(user.idx, trimmed);
                    }}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="py-3 text-base font-medium text-center text-text-primary">지출한 사람을 선택해주세요</div>
          )}
          {sumDifference !== 0 && (
            <aside className="pr-1 text-xs font-semibold text-functional-error-main text-end">
              *금액이 맞지 않습니다
              {/* ({sumDifference > 0 ? `${sumDifference / 1000} 부족` : `${-sumDifference / 1000} 초과`}) */}
            </aside>
          )}
        </form>
      )}
    </div>
  );
};

export default SplitSelector;
