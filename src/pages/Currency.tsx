import { CurrencySelectButton, CurrencySuggestionButton, CurrencySwitch } from '@/components/atoms/currency';
import { CurrencySelectDrawer } from '@/components/organism/currency';
import { addCommas } from '@/lib/utils';
import { useState } from 'react';

const Currency = () => {
  const [openCurrencyDrawer, setOpenCurrencyDrawer] = useState(false);
  const [topCurrency, setTopCurrency] = useState('KRW(원)');
  const [topValue, setTopValue] = useState(10000);
  const [bottomCurrency, setBottomCurrency] = useState('VND(동)');
  const [bottomValue, setBottomValue] = useState(182796.81);

  const handleSwitch = () => {
    setTimeout(() => {
      const tempCurrency = topCurrency;
      const tempValue = topValue;

      setTopCurrency(bottomCurrency);
      setTopValue(bottomValue);
      setBottomCurrency(tempCurrency);
      setBottomValue(tempValue);
    }, 150);
  };

  return (
    <>
      <main className="min-h-[calc(100dvh-80px)] grid grid-cols-1 grid-rows-2 overflow-hidden relative">
        <div className="bg-brand-primary-dark px-6 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] z-10 pt-10 pb-[56px] overflow-hidden flex flex-col justify-between">
          <h1 className="mb-10 text-2xl font-semibold text-brand-primary-contrastText">환율 계산기</h1>
          <div className="flex items-end justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <CurrencySuggestionButton>{'USD(달러)'}</CurrencySuggestionButton>
                <CurrencySuggestionButton>{'JYP(엔)'}</CurrencySuggestionButton>
              </div>
              <CurrencySelectButton onClick={() => setOpenCurrencyDrawer(true)}>{topCurrency}</CurrencySelectButton>
            </div>
            <strong
              className="text-[24px]/[125%] font-semibold text-brand-primary-contrastText"
              style={{ textShadow: '0px 2px 2px rgba(0,0,0,0.15)' }}
            >
              ₩ {addCommas(topValue)}
            </strong>
          </div>
        </div>
        <CurrencySwitch onClick={handleSwitch} />
        <div className="bg-bg-back px-6 pb-10 pt-[56px] overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-2.5">
              <CurrencySelectButton onClick={() => setOpenCurrencyDrawer(true)}>{bottomCurrency}</CurrencySelectButton>
              <div className="flex items-center gap-2.5">
                <CurrencySuggestionButton variant="gray">{'KRW(원)'}</CurrencySuggestionButton>
                <CurrencySuggestionButton variant="gray">{'JYP(엔)'}</CurrencySuggestionButton>
              </div>
            </div>
            <strong
              className="text-[24px]/[125%] font-semibold text-text-primary"
              // style={{ textShadow: '0px 2px 2px rgba(0,0,0,0.15)' }}
            >
              ₫ {addCommas(bottomValue)}
            </strong>
          </div>
        </div>
      </main>
      <CurrencySelectDrawer open={openCurrencyDrawer} onOpenChange={setOpenCurrencyDrawer} />
    </>
  );
};

export default Currency;
