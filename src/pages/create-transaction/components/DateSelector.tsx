import { memo, useState } from 'react';
import { TransactionLabel } from '@/components/ui/transaction';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/buttons';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { SwitchTransitionContainer, SwitchTransitionOff, SwitchTransitionOn } from '@/components/ui/transitions';
import { startOfToday } from 'date-fns';

type DateSelectorProps = {
  date?: Date;
  onDateChange?: (date?: Date) => void;
};

const DateSelector = ({ date, onDateChange }: DateSelectorProps) => {
  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="flex flex-col items-start gap-2">
      <TransactionLabel className="w-full">날짜</TransactionLabel>

      <SwitchTransitionContainer on={isEdit}>
        <SwitchTransitionOff>
          <Button
            variant="outline"
            size="medium"
            className="gap-2.5 border-[#ECECEC] w-full justify-between"
            onClick={() => setIsEdit(true)}
          >
            <div className="flex gap-2.5 items-center">
              <CalendarIcon size={14} />
              {date?.toLocaleDateString()}
            </div>

            <ChevronDown size={14} />
          </Button>
        </SwitchTransitionOff>
        <SwitchTransitionOn>
          <Calendar
            id="create-trip-calendar"
            mode="single"
            selected={date}
            onSelect={(day) => {
              onDateChange?.(day);
              day !== undefined && setIsEdit(false);
            }}
            className="w-full border rounded-md border-border-light/50 max-w-[330px]"
            classNames={{
              day_selected:
                'rounded-md bg-brand-primary-main !text-brand-primary-contrastText !font-bold hover:bg-brand-primary-main',
            }}
          />
          <Button
            variant="secondary"
            className="w-full mt-3 max-w-[330px]"
            onClick={() => {
              onDateChange?.(startOfToday());
              setIsEdit(false);
            }}
          >
            오늘 지출했어요
          </Button>
        </SwitchTransitionOn>
      </SwitchTransitionContainer>
    </div>
  );
};

export default memo(DateSelector);
