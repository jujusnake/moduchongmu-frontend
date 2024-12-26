import { useTransactionList } from '@/APIs/transaction/list/get';
import { DailyExpenseAdd, DailyExpenseBlock, DailyExpenseTitle, ExpenseItem } from './expense-list';
import { useMemo } from 'react';
import { TransactionCategoryType, TransactionItem } from '@/types/transaction';
import EmptyIcon from '@/components/atoms/EmptyIcon';

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
  const { data } = useTransactionList(travelUid);

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
          title={transaction.content ?? CATEGORY_LABEL[transaction.category as TransactionCategoryType]}
          amount={transaction.amount}
          currency={transaction.currency}
          category={CATEGORY_LABEL[transaction.category as TransactionCategoryType]}
          mates={transaction.targetList}
        />
      ))}
    </>
  );
};

const TransactionListByDate = ({ travelUid }: { travelUid: string }) => {
  // API Calls
  const { data } = useTransactionList(travelUid);

  // Values
  // const transactionsByDate = data?.pages?.reduce((acc: Record<string, any>, transaction: any) => {
  //   const date = transaction.date;
  //   if (!acc[date]) {
  //     acc[date] = [];
  //   }
  //   acc[date].push(transaction);
  //   return acc;
  // }, {});

  // console.log(transactionsByDate);

  return (
    <>
      <DailyExpenseBlock className="mb-5 last:mb-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <DailyExpenseTitle>05.02 (1일차)</DailyExpenseTitle>
          <DailyExpenseAdd />
        </div>
        <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
        <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
      </DailyExpenseBlock>
      <DailyExpenseBlock className="mb-5 last:mb-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <DailyExpenseTitle>05.02 (1일차)</DailyExpenseTitle>
          <DailyExpenseAdd />
        </div>
        <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
        <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
      </DailyExpenseBlock>
      <DailyExpenseBlock className="mb-5 last:mb-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <DailyExpenseTitle>05.02 (1일차)</DailyExpenseTitle>
          <DailyExpenseAdd />
        </div>
        <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
        <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
      </DailyExpenseBlock>
    </>
  );
};

export { TransactionList, TransactionListByDate };
