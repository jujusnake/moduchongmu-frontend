import { useUpdateTransaction } from '@/APIs/transaction/put';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { transactionFormReducer } from '../create-transaction/TransactionReducer';
import { CurrencyItem, TransactionCategoryType } from '@/types/transaction';
import { Member } from '@/types/travel';
import { toast } from 'sonner';
import { queryKeys } from '@/APIs/react-query';

type Props = {};

const EditTransaction = (props: Props) => {
  // Hooks
  const queryClient = useQueryClient();
  const { tripUid } = useParams();
  const navigate = useNavigate();

  // API Calls
  const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();

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
    if (!formState.travelUid) {
      alert('travelUid is required');
      return;
    }

    updateTransaction(
      {
        uid: formState.travelUid,
        // executorList: [formState.payer.idx],
        // targetList: formState.spenders.map((spender) => spender.idx),
        // category: formState.category,
        // content: formState.memo ?? '',
        // type: 'expense',
        // amount: formState.amount,
        // currency: formState.currency.currency,
        // paymentMethod: 'card',
        // expenseSplit: formState.splitEven ? {} : Object.fromEntries(formState.expenseSplit),
        // usedDate: format(formState.date, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      },
      {
        onSuccess: () => {
          toast.success('기록이 성공적으로 저장되었습니다.', { duration: 3000 });
          navigate(`/trip/${formState.travelUid}`);
          queryClient.refetchQueries({
            queryKey: [queryKeys.transaction, { type: 'list', uid: formState.travelUid }],
          });
        },
        onError: () => {
          toast.error('기록 저장에 실패했습니다. 다시 시도해주세요.', { duration: 3000 });
        },
      },
    );
  };

  if (!tripUid) {
    return <div>asdf</div>;
  }

  return <div>EditTransaction</div>;
};

export default EditTransaction;
