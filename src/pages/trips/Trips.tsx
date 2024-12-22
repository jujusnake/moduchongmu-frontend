import { useTravelList } from '@/APIs/travel/list/get';
import { TripListItem } from './components/TripListItem';
import TripsEmpty from '@/pages/trips/components/TripsEmpty';
import { Button, ButtonIcon } from '@/components/ui/buttons';
import { parseDateRange } from '@/lib/datetime';
import { getTravelThumbnail } from '@/lib/urls';
import { Plane } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TripsCurrentCarousel from './components/TripsCurrentCarousel';
import InfinityScrollTrigger from './components/InfinityScrollTrigger';

const Trips = () => {
  // Hooks
  const navigate = useNavigate();

  // API Calls
  const { data: travelList, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } = useTravelList();

  // Values
  const hasNoTravels = useMemo(() => {
    return travelList && travelList?.pages[0].totalCount < 1;
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
            members={travel.memberArray.length}
            date={parseDateRange(travel.startDate, travel.endDate)}
            imgSrc={getTravelThumbnail(travel.uid)}
            city={travel.city}
            country={travel.country}
            onClick={() => navigate(`/trip/${travel.uid}`)}
          />
        ))}
        {isFetched && (
          <InfinityScrollTrigger
            onIntersect={() => fetchNextPage()}
            hasNextPage={hasNextPage}
            isFetching={isFetchingNextPage}
          />
        )}
      </main>
    </>
  );
};

export default Trips;
