import { useExchange } from '@/APIs/transaction/exchange/get';
import AmountInput from '@/components/atoms/AmountInput';
import { CurrencySelectButton, CurrencySuggestionButton, CurrencySwitch } from '@/components/atoms/currency';
import { CurrencySelectDrawer } from '@/components/organism/currency';
import { LOCALSTORAGE_KEYS } from '@/constants/storage';
import { getDecimalCountFromCurrency, updateCurrencyHistory } from '@/lib/money';
import { CurrencyItem } from '@/types/transaction';
import { useEffect, useMemo, useState } from 'react';

const Currency = () => {
  // States
  const [openCurrencyDrawer, setOpenCurrencyDrawer] = useState<boolean>(false);
  const [targetCurrency, setTargetCurrency] = useState<CurrencyItem>({
    currency: 'USD',
    name: '미국 달러',
  });
  const [krwAtBottom, setKrwAtBottom] = useState<boolean>(true);
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
    const lastSetting = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currencySetting) || '{}');
    const krwAtBottom = lastSetting.krwAtBottom ?? true;
    const targetCurrency = lastSetting.targetCurrency ?? {
      currency: 'USD',
      name: '미국 달러',
    };
    setKrwAtBottom(krwAtBottom);
    setTargetCurrency(targetCurrency);
  }, []);

  useEffect(() => {
    setAmountValue((prev) => ({
      ...prev,
      krw: prev.target === '' ? '' : (Number(prev.target) / exchangeRate).toFixed(),
    }));
  }, [exchangeRate]);

  // Handlers
  const handleSelectCurrency = (currencyObj: CurrencyItem) => {
    if (currencyObj.currency === 'KRW') return;
    setOpenCurrencyDrawer(false);
    setTargetCurrency(currencyObj);
    storeLastSetting(currencyObj, krwAtBottom);
    updateCurrencyHistory(currencyObj);
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
      setKrwAtBottom(!krwAtBottom);
      storeLastSetting(targetCurrency, !krwAtBottom);
    }, 150);
  };

  const storeLastSetting = (targetCurrency: CurrencyItem, krwAtBottom: boolean) => {
    const lastSetting = {
      targetCurrency,
      krwAtBottom,
    };
    localStorage.setItem(LOCALSTORAGE_KEYS.currencySetting, JSON.stringify(lastSetting));
  };

  return (
    <>
      <main className="min-h-[calc(100dvh-80px)] grid grid-cols-1 grid-rows-2 overflow-hidden relative">
        <div className="bg-brand-primary-dark px-6 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] z-10 pt-10 pb-[56px] overflow-hidden flex flex-col justify-between">
          <h1 className="mb-10 text-2xl font-semibold text-brand-primary-contrastText">환율 계산기</h1>
          <div className="flex items-end justify-between gap-10">
            <div className="space-y-2.5">
              {krwAtBottom && (
                <div className="flex items-center gap-2.5">
                  {localStorage.getItem(LOCALSTORAGE_KEYS.currencyHistory) &&
                    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currencyHistory) || '[]')
                      .reverse()
                      .map((currency: CurrencyItem) => (
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
              <CurrencySelectButton
                onClick={() => setOpenCurrencyDrawer(true)}
                className="max-w-[160px]"
                disabled={!krwAtBottom}
              >
                {krwAtBottom ? `${targetCurrency.currency}(${targetCurrency.name})` : 'KRW(한국 원)'}
              </CurrencySelectButton>
            </div>

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
        <CurrencySwitch onClick={handleSwitch} />
        <div className="bg-bg-back px-6 pb-10 pt-[56px] overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-2.5">
              <CurrencySelectButton
                onClick={() => setOpenCurrencyDrawer(true)}
                className="max-w-[160px]"
                disabled={krwAtBottom}
              >
                {krwAtBottom ? 'KRW(한국 원)' : `${targetCurrency.currency}(${targetCurrency.name})`}
              </CurrencySelectButton>
              {!krwAtBottom && (
                <div className="flex items-center gap-2.5">
                  {localStorage.getItem(LOCALSTORAGE_KEYS.currencyHistory) &&
                    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currencyHistory) || '[]')
                      .reverse()
                      .map((currency: CurrencyItem) => (
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
            <AmountInput
              className="text-text-primary [&~#amount-input-text]:text-text-primary"
              currency={krwAtBottom ? 'KRW' : targetCurrency.currency}
              value={krwAtBottom ? amountValue.krw.toString() : amountValue.target.toString()}
              onValueChange={(val) => handleValueChange(val, !krwAtBottom)}
              tabIndex={2}
              placeholder="금액을 입력하세요"
            />
          </div>
        </div>
      </main>
      <CurrencySelectDrawer
        open={openCurrencyDrawer !== false}
        onOpenChange={(open) => open === false && setOpenCurrencyDrawer(false)}
        onCurrencySelect={handleSelectCurrency}
      />
    </>
  );
};

export default Currency;
