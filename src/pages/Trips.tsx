import EmptyIcon from '@/components/atoms/EmptyIcon';
import { TripListItem, TripListItemFloat } from '@/components/molecules/TripListItem';
import TripListTabs from '@/components/molecules/TripListTabs';
import TripsCurrentCarousel from '@/components/organism/TripsCurrentCarousel';
import { Button, ButtonIcon } from '@/components/ui/buttons';
import { Plane, PlaneTakeoff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Trips = () => {
  // Hooks
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // States
  const [activeTab, setActiveTab] = useState<string>('all');

  // Lifecycle
  useEffect(() => {
    if (!pathname.includes('/trips')) navigate('/trips');
  }, []);

  return (
    <>
      {/* Header */}
      <div className="pt-6 pb-[50px] bg-brand-primary-dark text-brand-primary-contrastText">
        <header className="flex items-center gap-1.5 px-6">
          <Plane />
          <span className="text-2xl font-semibold">여행</span>
        </header>

        <div className="mt-6">
          <TripsCurrentCarousel />
        </div>
      </div>

      {/* Empty */}
      {/* <main className="flex flex-col justify-center items-center px-6 min-h-[calc(100svh-200px)]">
        <PlaneTakeoff size={100} strokeWidth={1.3} className="mb-6" />
        <div className="mb-6 space-y-4 text-center text-text-primary">
          <h1 className="text-2xl font-semibold">여행을 시작해볼까요?</h1>
          <p className="text-base">함께 하는 여행, 비용에 대한 스트레스 없이 떠나보세요!</p>
        </div>
        <Button className="rounded-full w-full max-w-[200px] py-2">
          <ButtonIcon name="plus" />새 여행 만들기
        </Button>
      </main> */}

      {/* New Trip */}
      <aside className="-translate-y-1/2 mx-6 px-4 py-3 bg-brand-primary-bg rounded-[4px] font-semibold text-text-primary text-base flex items-center justify-between shadow-[2px_4px_4px_0px_rgba(0,0,0,0.15)]">
        새로운 곳으로 떠나볼까요?
        <Button
          size="small"
          className="px-2.5 rounded-full"
          onClick={() => navigate('/createtrip', { state: { from: '/trips' } })}
        >
          <ButtonIcon name="plus" />
          여행 만들기
        </Button>
      </aside>

      {/* List Filter */}
      <TripListTabs value={activeTab} onValueChange={setActiveTab} />

      {/* Main List */}
      <main>
        <TripListItem title="효짱 남쥬 여행~" location="도쿄, 일본" members={2} date="언제나~ 함께!" />
      </main>

      {/* Main List Empty */}
      {/* <aside className="flex flex-col items-center justify-center px-6 py-10 text-text-tertiary">
        <EmptyIcon width={40} height={40} className="mb-5" />
        <p className="text-lg font-semibold">여행을 찾지 못했어요!</p>
      </aside> */}
    </>
  );
};

export default Trips;
