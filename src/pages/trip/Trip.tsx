import { Button, ButtonIcon } from '@/components/ui/buttons';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Loader2, MapPin, Settings } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTravel } from '@/APIs/travel/get';
import { getDdayOrElapsedDay, parseDateRange } from '@/lib/datetime';
import { getDestinationName } from '@/lib/geonames';
import TripThumbnailImg from '@/components/atoms/TripThumbnailImg';
import { getTravelThumbnail } from '@/lib/urls';
import { TransactionList, TransactionListByDate } from './components/transaction-list';
import MemberList from './components/MemberList';
import InviteDialog from './components/InviteDialog';

const Trip = ({ fixedUid }: { fixedUid?: string }) => {
  // Hooks
  const navigate = useNavigate();
  const { tripUid: pathParamUid } = useParams();

  // Values
  const TripUID = useMemo(() => fixedUid ?? pathParamUid ?? '', []);

  // API Calls
  const { data: travelRes, isPending: fetchingTravel } = useTravel(TripUID);
  const travelData = useMemo(() => travelRes?.data.travel, [travelRes]);

  // States
  const [currentTab, setCurrentTab] = useState('all');

  return (
    <>
      <div className="flex flex-col">
        <header className="relative z-0 bg-brand-primary-lighter">
          <div className="absolute top-0 left-0 right-0 flex justify-between p-5">
            <button
              className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200 data-[hide=true]:invisible"
              onClick={() => navigate('/trips')}
              data-hide={fixedUid !== undefined}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <div className="flex gap-3">
              <InviteDialog travelUid={travelData?.uid} />
              <button
                className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200"
                onClick={() =>
                  navigate(`/trip/${TripUID}/edit`, { state: { from: fixedUid !== undefined ? '/now' : undefined } })
                }
              >
                <Settings size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <TripThumbnailImg
            src={getTravelThumbnail(travelData?.uid)}
            city={travelData?.city}
            className="aspect-video max-h-[280px] object-cover w-full bg-white"
          />
        </header>

        <div className="mx-5 px-5 py-4 rounded-[4px] bg-[#FCFCFC] shadow-[0px_2px_6px_rgba(0,_0,_0,_0.2)] -mt-10 z-10 mb-5">
          <div className="flex justify-between items-start mb-1.5">
            <h1 className="text-2xl font-semibold ellipsis-text-oneline text-text-primary">
              {travelData?.travelName ?? '-'}
            </h1>
            <aside className="shrink-0 text-brand-primary-dark font-extrabold text-[13px]/[125%]">
              {travelData ? getDdayOrElapsedDay(travelData?.startDate, travelData?.endDate) : ''}
            </aside>
          </div>
          <div className="mb-5 text-[13px]/[125%] font-medium text-text-tertiary">
            {travelData ? parseDateRange(travelData?.startDate, travelData?.endDate) : '-'}
          </div>
          <div className="flex gap-2">
            <div className="rounded-full flex items-center gap-1 px-3 py-1.5 border border-border-light text-text-secondary font-semibold text-sm">
              <MapPin size={14} />
              <span>{travelData ? getDestinationName(travelData.city, travelData?.country) : '-'}</span>
            </div>
            <MemberList travelUid={TripUID} memberArray={travelData?.memberArray} host={travelData?.host} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 px-5 mb-9">
          <Button shape="round" variant="secondary" onClick={() => navigate(`/trip/${TripUID}/settlement`)}>
            <ButtonIcon name="chart-pie" />
            정산하기
          </Button>
          <Button
            shape="round"
            variant="primary"
            onClick={() => navigate(`/createtransaction/${TripUID}`, { state: { from: `/trip/${TripUID}` } })}
          >
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
          {currentTab === 'all' && <TransactionList travelUid={TripUID} />}

          {currentTab === 'per-date' && <TransactionListByDate travelUid={TripUID} />}
        </main>
      </div>

      {fetchingTravel && (
        <div className="z-[999] fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-bg-base/60">
          <Loader2 size={80} className="animate-spin text-brand-primary-dark" />
        </div>
      )}
    </>
  );
};

export default Trip;
