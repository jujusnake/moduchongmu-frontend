import { useTransactionList } from '@/APIs/transaction/list/get';
import { DailyExpenseAdd, DailyExpenseBlock, DailyExpenseTitle, ExpenseItem } from './expense-list';

const TransactionList = ({ travelUid }: { travelUid: string }) => {
  // API Calls
  const { data } = useTransactionList(travelUid);

  console.log(data);
  return (
    <>
      <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
      <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
      <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
      <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
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
