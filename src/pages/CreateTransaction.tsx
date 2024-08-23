import AmountInput from '@/components/atoms/AmountInput';
import { CurrencySelectButton } from '@/components/atoms/currency';
import DateSelectorButton from '@/components/atoms/transaction/DateSelectorButton';
import { CurrencySelectDrawer } from '@/components/organism/currency';
import { Button, ButtonIcon } from '@/components/ui/buttons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CreateTransaction = () => {
  // Hooks
  const [searchParams] = useSearchParams();

  // States
  const [travelUid, setTravelUid] = useState<string | null>(null);
  const [openCurrencyDrawer, setOpenCurrencyDrawer] = useState(false);
  const [currency, setCurrency] = useState('KRW');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Lifecycle
  useEffect(() => {
    const travelUidFromUrl = searchParams.get('tuid');
    setTravelUid(travelUidFromUrl);
  }, [searchParams]);

  return (
    <>
      <div className="p-6 bg-brand-primary-dark">
        <header className="flex items-center justify-between gap-2 mb-12">
          <h1 className="text-2xl font-semibold text-brand-primary-contrastText">기록 작성</h1>
          <Button variant="contrast" className="p-2" size="large">
            <ButtonIcon name="x" size={24} />
          </Button>
        </header>

        <div className="flex items-center justify-between gap-6">
          <CurrencySelectButton onClick={() => setOpenCurrencyDrawer(true)}>{currency}</CurrencySelectButton>

          <AmountInput
            className="bg-brand-primary-dark"
            currency={currency}
            value={amount}
            onValueChange={setAmount}
            autoFocus
            tabIndex={1}
            placeholder="금액을 입력하세요"
          />
        </div>
      </div>

      <div className="p-6">
        <DateSelectorButton date={date} onDateChange={setDate} />
        asdfasdf
      </div>

      <CurrencySelectDrawer
        open={openCurrencyDrawer}
        onOpenChange={setOpenCurrencyDrawer}
        onCurrencySelect={setCurrency}
      />
    </>
  );
};

export default CreateTransaction;
