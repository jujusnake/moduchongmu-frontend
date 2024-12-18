import { useTravelList } from '@/APIs/travel/list/get';
import { TripListItem } from '@/components/molecules/TripListItem';
// import TripListTabs from '@/components/molecules/TripListTabs';
import TripsEmpty from '@/components/organism/trips/TripsEmpty';
import TripsCurrentCarousel from '@/components/organism/TripsCurrentCarousel';
import { Button, ButtonIcon } from '@/components/ui/buttons';
import { parseDateRange } from '@/lib/datetime';
import { getDestinationName } from '@/lib/geonames';
import { getTravelThumbnail } from '@/lib/urls';
import { ChevronDown, Plane } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Trips = () => {
  // Hooks
  const navigate = useNavigate();
  // const { pathname } = useLocation();

  // States
  // const [activeTab, setActiveTab] = useState<string>('all');

  // API Calls
  const { data: travelList, fetchNextPage, hasNextPage } = useTravelList();

  // Values
  const hasNoTravels = useMemo(() => {
    return travelList && travelList?.pages.length < 1;
  }, [travelList]);

  const currentTravel = useMemo(() => {
    return travelList?.pages[0].currentTravel;
  }, [travelList]);

  const flatTravelList = useMemo(() => {
    return travelList?.pages.flatMap((page) => page.travelList);
  }, [travelList]);

  return (
    <>
      {/* Header */}
      <div
        className="pt-6 pb-[50px] data-[empty=true]:pb-6 bg-brand-primary-dark text-brand-primary-contrastText"
        data-empty={hasNoTravels}
      >
        <header className="flex items-center gap-1.5 px-6">
          <Plane />
          <span className="text-2xl font-semibold">여행</span>
        </header>

        <div className="mt-6 data-[hide=true]:hidden" data-hide={hasNoTravels || currentTravel === undefined}>
          <TripsCurrentCarousel currentTravel={currentTravel} />
        </div>
      </div>

      {/* Empty */}
      {hasNoTravels === true && <TripsEmpty />}

      {/* New Trip */}
      <aside
        className="-translate-y-1/2 mx-6 px-4 py-3 bg-brand-primary-bg rounded-[4px] font-semibold text-text-primary text-base flex items-center justify-between shadow-[2px_4px_4px_0px_rgba(0,0,0,0.15)] data-[hide=true]:hidden"
        data-hide={hasNoTravels}
      >
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
      {/* <TripListTabs value={activeTab} onValueChange={setActiveTab} /> */}

      {/* Main List */}
      <main data-hide={hasNoTravels} className="data-[hide=true]:hidden">
        {flatTravelList?.map((travel) => (
          <TripListItem
            key={`trips-list-item-${travel.uid}`}
            title={travel.travelName}
            location={getDestinationName(travel.city, travel.country)}
            members={travel.memberArray.length}
            date={parseDateRange(travel.startDate, travel.endDate)}
            // imgSrc={travel.coverImgUrl}
            imgSrc={getTravelThumbnail(travel.uid)}
          />
        ))}
        {!hasNextPage && (
          <button onClick={() => fetchNextPage()} className="flex justify-center w-full px-6">
            더 보기 <ChevronDown />
          </button>
        )}
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
