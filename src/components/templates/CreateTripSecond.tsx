import { DateRange } from 'react-day-picker';
import { Calendar } from '../ui/calendar';
import { useMemo } from 'react';

type Props = { date: DateRange | undefined; onChangeDate: (date: DateRange | undefined) => void };

const CreateTripSecond = ({ date, onChangeDate }: Props) => {
  const fromDate = useMemo(() => {
    if (!date?.from) return undefined;
    const year = date.from.getFullYear();
    const month = date.from.getMonth() + 1;
    const day = date.from.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }, [date?.from]);

  const toDate = useMemo(() => {
    if (!date?.to) return '-';
    const year = date.to.getFullYear();
    const month = date.to.getMonth() + 1;
    const day = date.to.getDate();
    if (date.from && year === date.from.getFullYear()) {
      return `${month}월 ${day}일`;
    } else {
      return `${year}년 ${month}월 ${day}일`;
    }
  }, [date?.to]);

  return (
    <main className="px-6">
      <h1 className="text-lg font-semibold text-text-primary mb-4">여행 일정을 알려주세요</h1>
      <Calendar
        id="create-trip-calendar"
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={onChangeDate}
        className="rounded-md border border-border-light/50"
      />

      {date?.from && (
        <div className="mt-10">
          <span className="text-2xl font-semibold text-brand-primary-dark">{fromDate}</span>
          <span className="text-lg font-medium text-text-primary mr-2">부터</span>
          <span className="text-2xl font-semibold text-brand-primary-dark">{toDate}</span>
          <span className="text-lg font-medium text-text-primary">까지</span>
        </div>
      )}
    </main>
  );
};

export default CreateTripSecond;
