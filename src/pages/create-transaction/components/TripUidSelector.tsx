import { useTravel } from '@/APIs/travel/get';
import { useTravelList } from '@/APIs/travel/list/get';
import { Button } from '@/components/ui/buttons';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { TransactionLabel } from '@/components/ui/transaction';
import { parseDateRange } from '@/lib/datetime';
import { getDestinationName } from '@/lib/geonames';
import { ChevronRight, Loader2, Palmtree } from 'lucide-react';
import { memo, useMemo } from 'react';

type Props = { selected: string | null; onSelectedChange: (selected: string) => void };

const TripUidSelector = ({ selected, onSelectedChange }: Props) => {
  const { data: selectedTrip } = useTravel(selected ?? '');
  const { data: trips, fetchNextPage, hasNextPage, isFetchingNextPage } = useTravelList();

  const flatTrips = useMemo(() => {
    return trips?.pages.flatMap((page) => page.travelList);
  }, [trips]);

  return (
    <div>
      <TransactionLabel className="w-full">어느 여행에서 사용하신 기록인가요?</TransactionLabel>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="medium"
            className="gap-2.5 border-[#ECECEC] w-full justify-between text-base py-3 mt-2"
          >
            <div className="flex gap-2.5 items-center">
              <Palmtree size={14} />
              {selectedTrip?.data.travel.travelName ?? '여행 선택'}
            </div>

            <ChevronRight size={14} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[60dvh] min-h-[50dvh] max-w-moduchongmu moduchongmu:left-[calc(50%-250px)]">
          <DrawerHeader>
            <DrawerTitle>여행 선택하기</DrawerTitle>
            <DrawerDescription>어떤 여행에서 사용하신 기록인가요?</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col overflow-auto">
            {flatTrips?.map((trip) => (
              <DrawerClose
                key={`create-transaction-select-tripuid-${trip.uid}`}
                onClick={() => {
                  onSelectedChange(trip.uid);
                }}
                data-current={trip.uid === selected}
                className="w-full px-4 py-2.5 text-start odd:bg-brand-primary-bg data-[current=true]:bg-brand-primary-dark group"
              >
                <div className="mb-1 text-base font-semibold text-text-primary group-data-[current=true]:text-white">
                  {trip.travelName}
                </div>
                <div className="flex gap-3">
                  <div className="text-sm text-text-secondary group-data-[current=true]:text-white">
                    {getDestinationName(trip.city, trip.country)}
                  </div>
                  <div className="text-sm text-text-secondary group-data-[current=true]:text-white">
                    {parseDateRange(trip.startDate, trip.endDate)}
                  </div>
                </div>
              </DrawerClose>
            ))}
            {hasNextPage && (
              <button
                className="flex justify-center w-full py-2 text-sm font-semibold text-center rounded text-brand-primary-dark hover:bg-brand-primary-bg active:bg-brand-primary-bg data-[hide=true]:invisible"
                onClick={() => fetchNextPage()}
                data-hide={!hasNextPage}
              >
                {isFetchingNextPage ? <Loader2 className="animate-spin" size={16} /> : '더보기'}
              </button>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default memo(TripUidSelector);
