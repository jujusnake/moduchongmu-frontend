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

export { TransactionCategory, type TransactionCategoryType, type GetCurrencyRes, type GetExchangeRateRes };
