import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';
import TripThumbnailImg from '@/components/atoms/TripThumbnailImg';
import { getDestinationName } from '@/lib/geonames';

type TripListItemProps = {
  imgSrc?: string;
  title?: string;
  members?: number;
  date?: string;
  dday?: number;
  city: string;
  country: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const TripListItem = ({ city, country, imgSrc, title, members, date, className, ...props }: TripListItemProps) => {
  return (
    <button className={cn('px-6 py-3 flex gap-4 items-center', className)} {...props}>
      <div className="w-[60px] h-[60px] rounded-[4px] bg-[#D9D9D9] overflow-hidden isolate">
        <TripThumbnailImg src={imgSrc} city={city} />
      </div>
      <div className="space-y-2 text-start">
        <h1 className="text-base font-semibold text-text-primary ellipsis-text-oneline">{title}</h1>
        <div className="space-y-0.5 text-sm text-text-tertiary ellipsis-text-oneline">
          <div className="flex gap-3">
            <div>{getDestinationName(city, country)}</div>
            {members && <div>{members}명의 메이트</div>}
          </div>
          <div>{date}</div>
        </div>
      </div>
    </button>
  );
};

const TripListItemFloat = ({
  imgSrc,
  title,
  members,
  date,
  className,
  dday,
  city,
  country,
  ...props
}: TripListItemProps) => {
  return (
    <button className={cn('px-6 py-3 flex gap-4 items-center relative', className)} {...props}>
      <div className="w-[60px] h-[60px] rounded-[4px] bg-[#D9D9D9] overflow-hidden isolate">
        <TripThumbnailImg src={imgSrc} city={city} />
      </div>
      <div className="space-y-2 text-start">
        <h1 className="text-base font-semibold text-brand-primary-contrastText ellipsis-text-oneline">{title}</h1>
        <div className="space-y-0.5 text-sm text-brand-primary-contrastText ellipsis-text-oneline">
          <div className="flex gap-3">
            <div>{getDestinationName(city, country)}</div>
            {members && <div>{members}명의 메이트</div>}
          </div>
          <div>{date}</div>
        </div>
      </div>
      {dday !== undefined && (
        <aside className="absolute text-sm font-semibold top-2 right-2">D{dday > 0 ? `+${dday}` : dday}</aside>
      )}
    </button>
  );
};

export { TripListItem, TripListItemFloat };
