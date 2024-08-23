import { useEffect, useRef, useState } from 'react';
import { TransactionLabel } from './transaction-ui';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/buttons';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import useHideTransition from '@/hooks/useHideTransition';
import { cn } from '@/lib/utils';

type DateSelectorButtonProps = {
  date?: Date;
  onDateChange?: (date?: Date) => void;
};

const DateSelectorButton = ({ date, onDateChange }: DateSelectorButtonProps) => {
  const [isEdit, setIsEdit] = useState(true);

  const {
    offRef: buttonRef,
    onRef: calendarRef,
    containerHeight,
    cn: hideCn,
    offProps,
    onProps,
  } = useHideTransition(isEdit);

  return (
    <div className="flex flex-col items-start gap-2">
      <TransactionLabel className="w-full">{isEdit ? '언제 결제하셨나요?' : '날짜'}</TransactionLabel>

      <div
        className="relative w-full overflow-hidden transition-[height] duration-300"
        style={{ height: containerHeight }}
      >
        <div ref={calendarRef} className={cn('absolute top-0 left-0 w-full', hideCn)} {...onProps}>
          <Calendar
            id="create-trip-calendar"
            mode="single"
            selected={date}
            onSelect={(day) => {
              onDateChange?.(day);
              setIsEdit(false);
            }}
            className="w-full border rounded-md border-border-light/50 max-w-[330px]"
            classNames={{
              day_selected:
                'rounded-md bg-brand-primary-main !text-brand-primary-contrastText !font-bold hover:bg-brand-primary-main',
            }}
          />
        </div>
        <Button
          ref={buttonRef}
          variant="outline"
          size="medium"
          className={cn(
            'gap-2.5 border-[#ECECEC] w-full justify-between data-[hide=true]:invisible data-[hide=true]:delay-0 data-[hide=true]:opacity-0 transition-[visibility,_opacity] duration-300 delay-300',
            hideCn,
          )}
          onClick={() => setIsEdit(true)}
          {...offProps}
        >
          <div className="flex gap-2.5 items-center">
            <CalendarIcon size={14} />
            {date?.toLocaleDateString()}
          </div>

          <ChevronDown size={14} />
        </Button>
      </div>
    </div>
  );
};

export default DateSelectorButton;
