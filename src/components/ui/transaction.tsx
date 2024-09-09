import { cn } from '@/lib/utils';
import { TransactionCategoryType } from '@/types/transaction';
import { Bed, Bus, CableCar, Check, CircleEllipsis, Plane, ShoppingBag, Utensils } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef, ReactElement, MouseEvent as ReactMouseEvent } from 'react';
import BetterImg from '../atoms/BetterImg';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cn('text-sm text-text-secondary font-semibold', className)} {...props} />;
});

interface CategoryButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  category: TransactionCategoryType;
  selected?: boolean;
  onClick?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, category: TransactionCategoryType) => void;
}

const CATEGORY_CONTENT: Record<TransactionCategoryType, { label: string; icon: ReactElement }> = {
  food: {
    label: '식비',
    icon: <Utensils size={20} />,
  },
  transport: {
    label: '교통',
    icon: <Bus size={20} />,
  },
  shopping: {
    label: '쇼핑',
    icon: <ShoppingBag size={20} />,
  },
  tour: {
    label: '관광',
    icon: <CableCar size={20} />,
  },
  accomodation: {
    label: '숙박',
    icon: <Bed size={20} />,
  },
  flight: {
    label: '항공',
    icon: <Plane size={20} />,
  },
  etc: {
    label: '기타',
    icon: <CircleEllipsis size={20} />,
  },
};

const CategoryButton = forwardRef<HTMLButtonElement, CategoryButtonProps>(
  ({ category, selected, onClick, className, ...props }, ref) => {
    // Handlers
    const handleClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        onClick(e, category);
      }
    };

    return (
      <button
        ref={ref}
        data-category={category}
        data-selected={selected}
        aria-selected={selected}
        className={cn(
          'flex flex-col items-center justify-center gap-2 h-16 w-16 rounded-[4px] text-text-primary border border-border-light hover:bg-brand-primary-bg active:bg-[#e8f2ff] data-[selected=true]:bg-brand-primary-dark data-[selected=true]:text-brand-primary-contrastText data-[selected=true]:border-brand-primary-dark transition-colors',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {CATEGORY_CONTENT[category].icon}
        <span className="text-xs font-semibold">{CATEGORY_CONTENT[category].label}</span>
      </button>
    );
  },
);

interface AvatarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imgSrc?: string;
  label?: string;
  selected?: boolean;
}

const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(
  ({ imgSrc, label, selected, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group/avatar-button flex flex-col items-center justify-center w-[72px] h-[84px] gap-1.5 rounded-[4px] hover:bg-neutral-50 active:bg-neutral-100 transition-colors',
          className,
        )}
        data-selected={selected}
        {...props}
      >
        <div className="relative w-12 h-12 overflow-hidden rounded-full isolate bg-brand-primary-lighter">
          <BetterImg src={imgSrc} className="absolute top-0 bottom-0 left-0 right-0 rounded-full" />
          <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 z-10 rounded-full bg-[#1E1E1E]/70 opacity-0 group-data-[selected=true]/avatar-button:opacity-100 transition-opacity">
            <Check size={28} className="text-functional-success-light" />
          </div>
        </div>
        <span className="w-full text-sm font-semibold text-text-primary ellipsis-text-oneline">{label}</span>
      </button>
    );
  },
);

export {
  Label as TransactionLabel,
  CategoryButton as TransactionCategoryButton,
  AvatarButton as TransactionAvatarButton,
};
