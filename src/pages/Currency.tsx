import { useExchange } from '@/APIs/transaction/exchange/get';
import AmountInput from '@/components/atoms/AmountInput';
import { CurrencySelectButton, CurrencySuggestionButton, CurrencySwitch } from '@/components/atoms/currency';
import { CurrencySelectDrawer } from '@/components/organism/currency';
import { getDecimalCountFromCurrency } from '@/lib/money';
import { useCurrencyStore } from '@/stores/currencyStore';
import { CurrencyItem } from '@/types/transaction';
import { useEffect, useMemo, useState } from 'react';

const Currency = () => {
  // Store
  const { targetCurrency, krwAtBottom, history, setTargetCurrency, switchOrder } = useCurrencyStore();

  // States
  const [openCurrencyDrawer, setOpenCurrencyDrawer] = useState<boolean>(false);
  const [amountValue, setAmountValue] = useState<{ krw: string; target: string }>({ krw: '', target: '' });

  // API Calls
  const { data: exchange } = useExchange(targetCurrency.currency.toLocaleLowerCase());
  const exchangeRate = useMemo(() => exchange?.data.exchangeRateList[0].rate ?? 1, [exchange]);
  const targetDecimalCount = useMemo(
    () => getDecimalCountFromCurrency(targetCurrency.currency),
    [targetCurrency.currency],
  );

  // Lifecycle
  useEffect(() => {
    setAmountValue((prev) => ({
      ...prev,
      krw: prev.target === '' ? '' : (Number(prev.target) / exchangeRate).toFixed(),
    }));
  }, [exchangeRate]);

  // Handlers
  const handleSelectCurrency = (currencyObj: CurrencyItem) => {
    setOpenCurrencyDrawer(false);
    setTargetCurrency(currencyObj);
  };

  const handleValueChange = (value: string, isTarget: boolean) => {
    const oppositeValue = isTarget ? Number(value) / exchangeRate : Number(value) * exchangeRate;
    const oppositeDecimal = isTarget ? 0 : targetDecimalCount;
    if (isTarget) {
      setAmountValue({ krw: value === '' ? '' : oppositeValue.toFixed(oppositeDecimal), target: value });
    } else {
      setAmountValue({ krw: value, target: value === '' ? '' : oppositeValue.toFixed(oppositeDecimal) });
    }
  };

  const handleSwitch = () => {
    setTimeout(() => {
      switchOrder();
    }, 150);
  };

  return (
    <>
      <main className="min-h-[calc(100dvh-80px)] grid grid-cols-1 grid-rows-2 overflow-hidden relative">
        <div className="bg-brand-primary-dark px-6 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] z-10 pt-10 pb-[56px] overflow-hidden flex flex-col justify-between">
          <h1 className="mb-10 text-2xl font-semibold text-brand-primary-contrastText">환율 계산기</h1>
          <div>
            {krwAtBottom && (
              <div className="flex items-center gap-2.5 mb-2.5">
                {history?.slice(0, 2).map((currency: CurrencyItem) => (
                  <CurrencySuggestionButton
                    key={currency.name}
                    className="truncate max-w-[100px]"
                    onClick={() => handleSelectCurrency(currency)}
                  >
                    {currency.currency}({currency.name})
                  </CurrencySuggestionButton>
                ))}
              </div>
            )}

            <div className="flex items-end justify-between gap-10">
              <CurrencySelectButton
                onClick={() => setOpenCurrencyDrawer(true)}
                className="max-w-[160px]"
                disabled={!krwAtBottom}
              >
                {krwAtBottom ? `${targetCurrency.currency}(${targetCurrency.name})` : 'KRW(한국 원)'}
              </CurrencySelectButton>

              <AmountInput
                className="bg-brand-primary-dark"
                currency={krwAtBottom ? targetCurrency.currency : 'KRW'}
                value={krwAtBottom ? amountValue.target.toString() : amountValue.krw.toString()}
                onValueChange={(val) => handleValueChange(val, krwAtBottom)}
                autoFocus
                tabIndex={1}
                placeholder="금액을 입력하세요"
              />
            </div>
          </div>
        </div>
        <CurrencySwitch onClick={handleSwitch} />
        <div className="bg-bg-back px-6 pb-10 pt-[56px] overflow-hidden">
          <div>
            <div className="flex items-start justify-between">
              <CurrencySelectButton
                onClick={() => setOpenCurrencyDrawer(true)}
                className="max-w-[160px]"
                disabled={krwAtBottom}
              >
                {krwAtBottom ? 'KRW(한국 원)' : `${targetCurrency.currency}(${targetCurrency.name})`}
              </CurrencySelectButton>
              <AmountInput
                className="text-text-primary [&~#amount-input-text]:text-text-primary"
                currency={krwAtBottom ? 'KRW' : targetCurrency.currency}
                value={krwAtBottom ? amountValue.krw.toString() : amountValue.target.toString()}
                onValueChange={(val) => handleValueChange(val, !krwAtBottom)}
                tabIndex={2}
                placeholder="금액을 입력하세요"
              />
            </div>
            {!krwAtBottom && (
              <div className="flex items-center gap-2.5 mt-2.5">
                {history?.slice(0, 2).map((currency: CurrencyItem) => (
                  <CurrencySuggestionButton
                    key={currency.name}
                    className="truncate max-w-[100px]"
                    onClick={() => handleSelectCurrency(currency)}
                  >
                    {currency.currency}({currency.name})
                  </CurrencySuggestionButton>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <CurrencySelectDrawer
        open={openCurrencyDrawer !== false}
        onOpenChange={(open) => open === false && setOpenCurrencyDrawer(false)}
        onCurrencySelect={handleSelectCurrency}
        filter={(item) => item.currency !== 'KRW'}
      />
    </>
  );
};

export default Currency;
