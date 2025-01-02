import { useTransactionList } from '@/APIs/transaction/list/get';
import { DailyExpenseAdd, DailyExpenseBlock, DailyExpenseTitle, ExpenseItem } from './expense-list';
import { useMemo } from 'react';
import { TransactionCategoryType, TransactionItem } from '@/types/transaction';
import EmptyIcon from '@/components/atoms/EmptyIcon';
import InfinityScrollTrigger from '@/components/atoms/InfinityScrollTrigger';
import { compareDesc, format } from 'date-fns';

const CATEGORY_LABEL: Record<TransactionCategoryType, string> = {
  food: '식비',
  transport: '교통',
  shopping: '쇼핑',
  tour: '관광',
  accomodation: '숙박',
  flight: '항공',
  etc: '기타',
};

const TransactionList = ({ travelUid }: { travelUid: string }) => {
  // API Calls
  const { data, hasNextPage, fetchNextPage, isFetched, isFetchingNextPage } = useTransactionList(travelUid);

  // Values
  const transactions = useMemo(() => {
    return data?.pages.reduce((acc: TransactionItem[], page) => {
      const nextList = page?.transactionList ?? [];
      return [...acc, ...nextList];
    }, []);
  }, [data]);

  return (
    <>
      {transactions?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-5 text-base font-medium text-gray-500">
          <EmptyIcon />
          거래 내역이 없습니다
        </div>
      )}
      {transactions?.map((transaction) => (
        <ExpenseItem
          key={transaction.uid}
          title={transaction.content || CATEGORY_LABEL[transaction.category as TransactionCategoryType]}
          amount={transaction.amount}
          currency={transaction.currency}
          category={CATEGORY_LABEL[transaction.category as TransactionCategoryType]}
          payer={transaction.executorList[0]}
          mates={transaction.targetList}
          date={transaction.usedDate}
        />
      ))}

      {isFetched && transactions && transactions?.length > 0 && (
        <InfinityScrollTrigger
          hasNextPage={hasNextPage}
          onIntersect={fetchNextPage}
          isFetching={isFetchingNextPage}
          className="mt-5"
        />
      )}
    </>
  );
};

const TransactionListByDate = ({ travelUid }: { travelUid: string }) => {
  // API Calls
  const { data, hasNextPage, fetchNextPage, isFetched, isFetchingNextPage } = useTransactionList(travelUid);

  const transactions = useMemo(() => {
    return data?.pages.reduce((acc: TransactionItem[], page) => {
      const nextList = page?.transactionList ?? [];
      return [...acc, ...nextList];
    }, []);
  }, [data]);

  // Values
  const transactionsByDate = useMemo(() => {
    if (!transactions) return [];

    const result: Record<string, TransactionItem[]> = {};
    for (const item of transactions) {
      const date = item.usedDate;
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(item);
    }

    return Object.entries(result).sort(([a], [b]) => compareDesc(a, b));
  }, [transactions]);

  return (
    <>
      {transactions?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-5 text-base font-medium text-gray-500">
          <EmptyIcon />
          거래 내역이 없습니다
        </div>
      )}

      {transactionsByDate.map(([date, transactions]) => (
        <DailyExpenseBlock className="mb-5 shadow last:mb-0" key={`travel-${travelUid}-daily-${date}`}>
          <div className="flex items-center justify-between gap-2 mb-1">
            {date && <DailyExpenseTitle>{date && format(date, 'yyyy-MM-dd')}</DailyExpenseTitle>}
            {/* <DailyExpenseAdd /> */}
          </div>
          {transactions.map((transaction) => (
            <ExpenseItem
              key={`travel-${travelUid}-daily-${date}-item-${transaction.uid}`}
              title={transaction.content || CATEGORY_LABEL[transaction.category as TransactionCategoryType]}
              amount={transaction.amount}
              date={transaction.usedDate}
              currency={transaction.currency}
              category={CATEGORY_LABEL[transaction.category as TransactionCategoryType]}
              mates={transaction.targetList}
              payer={transaction.executorList[0]}
            />
          ))}
        </DailyExpenseBlock>
      ))}

      {isFetched && transactions && transactions?.length > 0 && (
        <InfinityScrollTrigger
          hasNextPage={hasNextPage}
          onIntersect={fetchNextPage}
          isFetching={isFetchingNextPage}
          className="mt-5"
        />
      )}
    </>
  );
};

export { TransactionList, TransactionListByDate };
