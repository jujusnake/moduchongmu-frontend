import { useTravelList } from '@/APIs/travel/list/get';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TransactionLabel } from '@/components/ui/transaction';
import { parseDateRange } from '@/lib/datetime';
import { Loader2 } from 'lucide-react';
import { memo, useMemo } from 'react';

type Props = { selected: string | null; onSelectedChange: (selected: string) => void };

const TripUidSelector = ({ selected, onSelectedChange }: Props) => {
  const { data: trips, fetchNextPage, hasNextPage, isFetchingNextPage } = useTravelList();

  const flatTrips = useMemo(() => {
    return trips?.pages.flatMap((page) => page.travelList);
  }, [trips]);

  return (
    <div>
      <TransactionLabel className="w-full">어느 여행에서 사용하신 기록인가요?</TransactionLabel>
      <Select value={selected ?? undefined} onValueChange={onSelectedChange}>
        <SelectTrigger className="w-full text-start [&>span]:w-full mt-2">
          <SelectValue placeholder="여행 선택" />
        </SelectTrigger>
        <SelectContent className="select-transaction-tripuid">
          {hasNextPage && (
            <button
              className="flex justify-center w-full py-2 text-sm font-semibold text-center rounded text-brand-primary-dark hover:bg-brand-primary-bg active:bg-brand-primary-bg"
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? <Loader2 className="animate-spin" size={16} /> : '더보기'}
            </button>
          )}
          {flatTrips?.reverse().map((trip) => (
            <SelectItem value={trip.uid} key={trip.uid}>
              <div className="font-semibold">{trip.travelName}</div>
              <div className="text-text-secondary">{parseDateRange(trip.startDate, trip.endDate)}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default memo(TripUidSelector);
