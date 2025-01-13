import AmountInput from '@/components/atoms/AmountInput';
import { CurrencySelectButtonMemoized } from '@/components/atoms/currency';
import DateSelector from '@/pages/create-transaction/components/DateSelector';
import { CurrencySelectDrawer } from '@/components/organism/currency';
import { Button } from '@/components/ui/buttons';
import { useCallback, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySelector from '@/pages/create-transaction/components/CategorySelector';
import { CurrencyItem, TransactionCategoryType } from '@/types/transaction';
import PayerSelector from '@/pages/create-transaction/components/PayerSelector';
import SpenderSelector from '@/pages/create-transaction/components/SpenderSelector';
import SplitSelector from '@/pages/create-transaction/components/SplitSelector';
import { Member } from '@/types/travel';
import TransactionMemo from './components/TransactionMemo';
import { transactionFormReducer } from './TransactionReducer';
import TripUidSelector from './components/TripUidSelector';
import { useCreateTransaction } from '@/APIs/transaction/post';
import { format } from 'date-fns';
import ExitButton from './components/ExitButton';
import { toast } from 'sonner';
import { queryKeys } from '@/APIs/react-query';
import { useQueryClient } from '@tanstack/react-query';

const CreateTransaction = () => {
  // Values
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { tripUid } = useParams();

  // API Calls
  const { mutate: createTransaction, isPending: isCreating } = useCreateTransaction();

  // Reducer
  const [formState, dispatch] = useReducer(transactionFormReducer, {
    travelUid: tripUid ?? null,
    currency: { currency: 'KRW', name: '한국 원' },
    amount: '',
    date: undefined,
    category: null,
    payer: null,
    spenders: [],
    splitEven: true,
    expenseSplit: new Map(),
    memo: '',
    showBlock: new Set(['date' as 'date']),
  });

  // States
  const [openCurrencyDrawer, setOpenCurrencyDrawer] = useState(false);

  // Handlers
  const handleOpenCurrency = useCallback(() => setOpenCurrencyDrawer(true), []);

  const handleAmountChange = useCallback((amount: string) => {
    dispatch({ type: 'SET_AMOUNT', payload: amount });
  }, []);

  const handleCurrencySelect = useCallback((currency: CurrencyItem) => {
    dispatch({ type: 'SET_CURRENCY', payload: currency });
    setOpenCurrencyDrawer(false);
  }, []);

  const handleDateChange = useCallback((date?: Date) => {
    dispatch({ type: 'SET_DATE', payload: date });
  }, []);

  const handleCategoryChange = useCallback((category: TransactionCategoryType | null) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const handleMemoChange = useCallback((memo: string) => {
    dispatch({ type: 'SET_MEMO', payload: memo });
  }, []);

  const handlePayerChange = useCallback((payer: Member | null) => {
    dispatch({ type: 'SET_PAYER', payload: payer });
  }, []);

  const handleSpendersChange = useCallback((spender: Member) => {
    dispatch({ type: 'SET_SPENDERS', payload: spender });
  }, []);

  const handleSplitModeChange = useCallback((isEven: boolean) => {
    dispatch({ type: 'SET_SPLIT_EVEN', payload: isEven });
  }, []);

  const handleUnevenSplitChange = useCallback((userIdx: number, amount: string) => {
    dispatch({ type: 'SET_EXPENSE_SPLIT', payload: { userIdx, amount } });
  }, []);

  const handleTripUIDChange = useCallback((tripUid: string) => {
    dispatch({ type: 'RESET_TRAVEL_UID_SENSITIVE_FIELDS' });
    dispatch({ type: 'SET_TRAVEL_UID', payload: tripUid });
  }, []);

  const handleCreateTransaction = () => {
    if (formState.travelUid === null) {
      toast.warning('어느 여행에서 쓴 기록인가요?', { duration: 2000 });
    } else if (formState.date === undefined) {
      toast.warning('날짜를 선택해주세요', { duration: 2000 });
    } else if (formState.amount === '') {
      toast.warning('금액을 입력해주세요', { duration: 2000 });
    } else if (formState.category === null) {
      toast.warning('카테고리를 선택해주세요', { duration: 2000 });
    } else if (formState.payer === null) {
      toast.warning('지불자를 선택해주세요', { duration: 2000 });
    } else if (formState.spenders.length === 0) {
      toast.warning('지출자를 선택해주세요', { duration: 2000 });
    } else if (formState.splitEven === false && formState.expenseSplit.size !== formState.spenders.length) {
      toast.warning('지출자별 금액을 입력해주세요', { duration: 2000 });
    } else {
      createTransaction(
        {
          travelUid: formState.travelUid,
          executorList: [formState.payer.idx],
          targetList: formState.spenders.map((spender) => spender.idx),
          category: formState.category,
          content: formState.memo ?? '',
          type: 'expense',
          amount: formState.amount,
          currency: formState.currency.currency,
          paymentMethod: 'card',
          expenseSplit: formState.splitEven ? {} : Object.fromEntries(formState.expenseSplit),
          usedDate: format(formState.date, "yyyy-MM-dd'T'HH:mm:ssXXX"),
        },
        {
          onSuccess: () => {
            toast.success('기록이 성공적으로 저장되었습니다.', { duration: 3000 });
            navigate(`/trip/${formState.travelUid}`, { replace: true });
            queryClient.refetchQueries({
              queryKey: [queryKeys.transaction, { type: 'list', uid: formState.travelUid }],
            });
          },
          onError: () => {
            toast.error('기록 저장에 실패했습니다. 다시 시도해주세요.', { duration: 3000 });
          },
        },
      );
    }
  };

  return (
    <>
      <div className="fixed top-0 z-30 w-full p-6 -translate-x-1/2 max-w-moduchongmu left-1/2 bg-brand-primary-dark">
        <header className="flex items-center justify-between gap-2 mb-12">
          <h1 className="text-2xl font-semibold text-brand-primary-contrastText">기록 작성</h1>
          <ExitButton />
        </header>

        <div className="flex items-center justify-between gap-6">
          <CurrencySelectButtonMemoized onClick={handleOpenCurrency} className="max-w-[120px]">
            {formState.currency.currency} ({formState.currency.name})
          </CurrencySelectButtonMemoized>

          <AmountInput
            className="bg-brand-primary-dark"
            currency={formState.currency.currency}
            value={formState.amount}
            onValueChange={handleAmountChange}
            autoFocus
            tabIndex={1}
            placeholder="금액을 입력하세요"
          />
        </div>
      </div>

      <div className="px-6 pt-6 pb-4 space-y-6 mt-[180px]">
        <TripUidSelector selected={formState.travelUid} onSelectedChange={handleTripUIDChange} />

        <DateSelector date={formState.date} onDateChange={handleDateChange} />
        <CategorySelector
          activated={formState.showBlock.has('category')}
          category={formState.category}
          onCategoryChange={handleCategoryChange}
        />
        <PayerSelector
          activated={formState.showBlock.has('payer')}
          payer={formState.payer}
          onPayerChange={handlePayerChange}
          tripUid={formState.travelUid}
        />
        <SpenderSelector
          activated={formState.showBlock.has('spenders')}
          spenders={formState.spenders}
          onSpenderChange={handleSpendersChange}
          tripUid={formState.travelUid}
        />
      </div>

      <div
        className="px-6 pt-0 pb-6 data-[show=false]:opacity-0 data-[show=false]:invisible transition-[opacity,_visibility] visible opacity-100 duration-500"
        data-show={formState.showBlock.has('all')}
      >
        <SplitSelector
          amount={formState.amount}
          users={formState.spenders}
          currency={formState.currency.currency}
          isEven={formState.splitEven}
          onSplitModeChange={handleSplitModeChange}
          expenseSplit={formState.expenseSplit}
          setExpenseSplit={handleUnevenSplitChange}
        />

        <hr className="my-6 border-border-light" />

        <div className="space-y-4">
          <TransactionMemo value={formState.memo} onValueChange={handleMemoChange} />
          <Button className="w-full" onClick={handleCreateTransaction} disabled={isCreating}>
            {isCreating ? '생성 중...' : '기록 저장'}
          </Button>
        </div>
      </div>

      <CurrencySelectDrawer
        open={openCurrencyDrawer}
        onOpenChange={setOpenCurrencyDrawer}
        onCurrencySelect={handleCurrencySelect}
      />
    </>
  );
};

export default CreateTransaction;
