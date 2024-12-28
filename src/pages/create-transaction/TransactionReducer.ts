import { CurrencyItem, TransactionCategoryType } from '@/types/transaction';
import { Member } from '@/types/travel';

type TransactionFormState = {
  travelUid: string | null;
  currency: CurrencyItem;
  amount: string;
  date: Date | undefined;
  category: TransactionCategoryType | null;
  payer: Member | null;
  spenders: Member[];
  splitEven: boolean;
  expenseSplit: Map<number, string>;
  memo: string;
  showBlock: Set<'date' | 'category' | 'payer' | 'spenders' | 'all'>;
};

type TransactionFormAction =
  | { type: 'SET_TRAVEL_UID'; payload: string | null }
  | { type: 'SET_CURRENCY'; payload: CurrencyItem }
  | { type: 'SET_AMOUNT'; payload: string }
  | { type: 'SET_DATE'; payload: Date | undefined }
  | { type: 'SET_CATEGORY'; payload: TransactionCategoryType | null }
  | { type: 'SET_PAYER'; payload: Member | null }
  | { type: 'SET_SPENDERS'; payload: Member }
  | { type: 'SET_SPLIT_EVEN'; payload: boolean }
  | { type: 'SET_EXPENSE_SPLIT'; payload: { userIdx: number; amount: string } }
  | { type: 'SET_MEMO'; payload: string }
  | { type: 'RESET_TRAVEL_UID_SENSITIVE_FIELDS' };

const transactionFormReducer = (state: TransactionFormState, action: TransactionFormAction): TransactionFormState => {
  switch (action.type) {
    case 'SET_TRAVEL_UID':
      return { ...state, travelUid: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload };
    case 'SET_DATE': {
      state.showBlock.add('category');
      return { ...state, date: action.payload };
    }
    case 'SET_CATEGORY':
      state.showBlock.add('payer');
      return { ...state, category: action.payload };
    case 'SET_PAYER': {
      state.showBlock.add('spenders');
      if (state.payer?.idx === action.payload?.idx) {
        return { ...state, payer: null };
      } else {
        return { ...state, payer: action.payload };
      }
    }
    case 'SET_SPENDERS': {
      state.showBlock.add('all');
      if (state.spenders.find((s) => s.idx === action.payload?.idx) !== undefined) {
        return { ...state, spenders: state.spenders.filter((s) => s !== action.payload) };
      } else {
        return { ...state, spenders: [...state.spenders, action.payload] };
      }
    }
    case 'SET_SPLIT_EVEN':
      return { ...state, splitEven: action.payload };
    case 'SET_EXPENSE_SPLIT': {
      state.expenseSplit.set(action.payload.userIdx, action.payload.amount);
      return { ...state, expenseSplit: state.expenseSplit };
    }
    case 'SET_MEMO':
      return { ...state, memo: action.payload };
    case 'RESET_TRAVEL_UID_SENSITIVE_FIELDS': {
      return {
        ...state,
        payer: null,
        spenders: [],
        splitEven: true,
        expenseSplit: new Map(),
      };
    }
    default:
      return state;
  }
};

export { type TransactionFormState, type TransactionFormAction, transactionFormReducer };
