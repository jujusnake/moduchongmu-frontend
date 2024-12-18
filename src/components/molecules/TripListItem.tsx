import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, useState } from 'react';

type TripListItemProps = {
  imgSrc?: string;
  title?: string;
  location?: string;
  members?: number;
  date?: string;
  dday?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const TripListItem = ({ imgSrc, title, location, members, date, className, ...props }: TripListItemProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <button className={cn('px-6 py-3 flex gap-4 items-center', className)} {...props}>
      <div className="w-[60px] h-[60px] rounded-[4px] bg-[#D9D9D9] overflow-hidden isolate">
        <img
          src={imgSrc}
          className="w-full h-full object-cover data-[loaded=false]:opacity-0 transition-opacity"
          data-loaded={imgLoaded}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(false)}
        />
      </div>
      <div className="space-y-2 text-start">
        <h1 className="text-base font-semibold text-text-primary ellipsis-text-oneline">{title}</h1>
        <div className="space-y-0.5 text-sm text-text-tertiary ellipsis-text-oneline">
          <div className="flex gap-3">
            <div>{location}</div>
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
  location,
  members,
  date,
  className,
  dday,
  ...props
}: TripListItemProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <button className={cn('px-6 py-3 flex gap-4 items-center relative', className)} {...props}>
      <div className="w-[60px] h-[60px] rounded-[4px] bg-[#D9D9D9] overflow-hidden isolate">
        <img
          src={imgSrc}
          className="w-full h-full object-cover data-[loaded=false]:opacity-0 transition-opacity"
          data-loaded={imgLoaded}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(false)}
        />
      </div>
      <div className="space-y-2 text-start">
        <h1 className="text-base font-semibold text-brand-primary-contrastText ellipsis-text-oneline">{title}</h1>
        <div className="space-y-0.5 text-sm text-brand-primary-contrastText ellipsis-text-oneline">
          <div className="flex gap-3">
            <div>{location}</div>
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
