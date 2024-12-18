const TransactionCategory = ['food', 'transport', 'shopping', 'tour', 'accomodation', 'flight', 'etc'] as const;

type TransactionCategoryType = (typeof TransactionCategory)[number];

export { TransactionCategory, type TransactionCategoryType };
