import { DailyExpenseAdd, DailyExpenseBlock, DailyExpenseTitle, ExpenseItem } from '@/components/ui/expense-list';
import { Button, ButtonIcon } from '@/components/ui/buttons';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Ellipsis, MapPin, UserPlus, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Trip = ({ tripUid }: { tripUid?: string }) => {
  // Hooks
  const navigate = useNavigate();
  const { travelUid } = useParams();

  // Values
  const TripUID = useMemo(() => tripUid ?? travelUid, []);

  // States
  const [currentTab, setCurrentTab] = useState('all');

  return (
    <div className="flex flex-col">
      <header className="relative z-0">
        <div className="absolute top-0 left-0 right-0 flex justify-between p-5">
          <button
            className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200"
            onClick={() => navigate('/trips')}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <div className="flex gap-3">
            <button className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200">
              <UserPlus size={20} strokeWidth={2.5} />
            </button>
            <button className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200">
              <Ellipsis size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <img src="/example-thumbnail.png" className="max-h-[280px] object-cover w-full" />
      </header>

      <div className="mx-5 px-5 py-4 rounded-[4px] bg-[#FCFCFC] shadow-[0px_2px_6px_rgba(0,_0,_0,_0.2)] -mt-10 z-10 mb-5">
        <div className="flex justify-between items-start mb-1.5">
          <h1 className="text-2xl font-semibold ellipsis-text-oneline text-text-primary">나트랑 여행</h1>
          <aside className="shrink-0 text-brand-primary-dark font-extrabold text-[13px]/[125%]">D-4</aside>
        </div>
        <div className="mb-5 text-[13px]/[125%] font-medium text-text-tertiary">2024.05.02 - 05.12</div>
        <div className="flex gap-2">
          <div className="rounded-full flex items-center gap-1 px-3 py-1.5 border border-border-light text-text-secondary font-semibold text-sm">
            <MapPin size={14} />
            <span>나트랑, 베트남</span>
          </div>
          <button className="rounded-full flex items-center gap-1 px-3 py-1.5 border border-border-light text-text-secondary font-semibold text-sm">
            <UsersRound size={14} />
            <span>4명의 메이트</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 mb-9">
        <Button shape="round" variant="secondary">
          <ButtonIcon name="chart-pie" />
          정산하기
        </Button>
        <Button shape="round" variant="primary">
          <ButtonIcon name="plus" />
          기록 추가하기
        </Button>
      </div>

      <Tabs className="w-full px-5 mb-4" value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="per-date">날짜별</TabsTrigger>
        </TabsList>
      </Tabs>

      <main className="px-5 pb-10">
        {currentTab === 'all' && (
          <>
            <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
            <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
            <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
            <ExpenseItem title="점심식사" amount={12300} currency="₩" category="식비" mates={['남듀', '효고버섯']} />
          </>
        )}

        {currentTab === 'per-date' && (
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
        )}
      </main>
    </div>
  );
};

export default Trip;
