import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/buttons';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 transition-all', className)}
      classNames={{
        months: 'w-full flex flex-col space-y-4',
        month: 'space-y-6',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-base font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-text-secondary rounded-md w-full font-normal text-base',
        row: 'flex w-full mt-2',
        cell: 'transition-colors duration-300 aspect-square w-full text-center text-base p-0 relative focus-within:relative focus-within:z-20',
        day: cn(
          'transition-colors duration-300 h-full w-full p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-[#ecf6ff]',
        ),
        day_range_start: 'day-range-start rounded-l-md bg-[#b0dafe] aria-selected:hover:bg-[#b0dafe]',
        day_range_end: 'day-range-end rounded-r-md bg-[#b0dafe] aria-selected:hover:bg-[#b0dafe]',
        day_selected: 'text-text-primary rounded-none',
        day_today:
          'bg-[#f7f7f7] text-text-primary !font-bold rounded-md [&.day-range-end]:bg-[#b0dafe] [&.day-range-start]:bg-[#b0dafe]',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-[#ecf6ff] text-text-primary',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
