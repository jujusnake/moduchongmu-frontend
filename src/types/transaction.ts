const TransactionCategory = ['food', 'transport', 'shopping', 'tour', 'accomodation', 'flight', 'etc'] as const;

type TransactionCategoryType = (typeof TransactionCategory)[number];

type GetCurrencyRes = {
  currencyList: {
    country: string[];
    currency: string;
    symbol: string;
    name: string;
  }[];
};

type GetExchangeRateRes = {
  exchangeRateList: {
    currency: string;
    rate: number;
  }[];
};

type CurrencyItem = {
  currency: string;
  name: string;
};

type PostTransactionParams = {
  travelUid: string;
  executorList: number[];
  targetList: number[];
  category: string;
  content: string;
  type: 'expense' | 'transfer';
  amount: number | string;
  currency: string;
  paymentMethod: 'card' | 'teamCash' | 'personalCash';
  expenseSplit?: {
    [travelMemberIdx: number]: string;
  };
  usedDate: string; // YYYY-MM-DD T HH:mm:ss +09:00
};

type TransactionItem = {
  uid: string;
  recordBy: string;
  executorList: string[];
  targetList: string[];
  category: string;
  content: string;
  type: 'expense' | 'income' | 'transfer';
  amount: number;
  currency: string;
  paymentMethod: string;
  usedDate: string;
  createdDate: string;
};

type GetTransactionListRes = {
  totalCount: number;
  transactionList: TransactionItem[];
};

type PostTransactionRes = {
  transaction: TransactionItem;
};

export {
  TransactionCategory,
  type TransactionCategoryType,
  type GetCurrencyRes,
  type GetExchangeRateRes,
  type CurrencyItem,
  type TransactionItem,
  type GetTransactionListRes,
  type PostTransactionParams,
  type PostTransactionRes,
};
