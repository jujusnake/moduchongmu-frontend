import { hasBatchim } from 'es-hangul';
import { useMemo } from 'react';
import { DateRange } from 'react-day-picker';

type Props = {
  location: string[];
  thumbnail?: string;
  date: DateRange | undefined;
  nickname: string;
};

const CreateTripFourth = ({ location, thumbnail, date, nickname }: Props) => {
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
    <main className="px-6 min-h-[calc(100dvh-218px)] flex flex-col justify-center font-semibold text-text-primary">
      <div className="mb-[18px] text-lg">
        아름다운 <span className="text-2xl text-brand-primary-dark">{location.join(', ')}</span>
        {hasBatchim(location[1]) ? '으로' : '로'}
      </div>
      {thumbnail && (
        <img
          src={thumbnail}
          className="mb-[18px] w-full aspect-video object-cover object-center rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
        />
      )}
      <div className="mb-3">
        <span className="text-2xl font-semibold text-brand-primary-dark">{fromDate}</span>
        <span className="mr-2 text-lg font-medium text-text-primary">부터</span>
        <span className="text-2xl font-semibold text-brand-primary-dark">{toDate}</span>
        <span className="text-lg font-medium text-text-primary">까지</span>
      </div>

      <div className="text-lg">
        <span className="text-2xl text-brand-primary-dark">
          {nickname.length > 0 ? nickname : location.join(', ') + ' 여행'}
        </span>
        을 떠나볼까요?
      </div>
    </main>
  );
};

export default CreateTripFourth;
