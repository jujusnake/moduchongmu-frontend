import useRipple from '@/hooks/useRipple';
import { parseDateStr } from '@/lib/datetime';
import { formatAmountWithCurrency } from '@/lib/money';
import { cn } from '@/lib/utils';
import { TravelUser } from '@/types/transaction';
import { Plus } from 'lucide-react';
import { ButtonHTMLAttributes, HTMLAttributes, PointerEvent, forwardRef, useState } from 'react';

interface ExpenseItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  amount?: number;
  currency?: string;
  category?: string;
  payer?: TravelUser;
  mates?: TravelUser[];
  date?: string;
}

const ExpenseItem = forwardRef<HTMLButtonElement, ExpenseItemProps>(
  ({ title, amount, currency, category, payer, mates, className, date, onPointerDown, ...props }, ref) => {
    const [addRipple, ripples] = useRipple({ background: 'rgba(0, 0, 0, 0.15)' });

    return (
      <button
        ref={ref}
        className={cn(
          'group/expense-item relative overflow-hidden w-full flex gap-2 justify-between py-4 border-b border-[#ECECEC] last:border-none',
          className,
        )}
        onClick={(e) => {
          addRipple(e);
          props.onClick?.(e);
        }}
        {...props}
      >
        {props.children ?? (
          <>
            <div className="space-y-2 text-start">
              <h1 className="text-base font-semibold ellipsis-text-oneline text-text-primary">{title}</h1>
              <aside className="text-sm ellipsis-text-oneline text-text-tertiary">{category}</aside>
              <aside className="text-sm ellipsis-text-oneline text-text-tertiary">{payer?.userName}</aside>
            </div>
            <div className="space-y-2 text-end">
              {amount !== undefined && (
                <h2 className="text-base font-semibold ellipsis-text-oneline text-text-primary">
                  {formatAmountWithCurrency(amount, currency)}
                </h2>
              )}
              <aside className="text-sm ellipsis-text-oneline text-text-tertiary">
                {date && parseDateStr(date, 'yyyy-MM-dd')}
              </aside>
              <aside className="text-sm ellipsis-text-oneline text-text-tertiary">
                {mates?.map((mate) => mate.userName)?.join(', ')}
              </aside>
            </div>
          </>
        )}
        {ripples}
      </button>
    );
  },
);

interface DailyExpenseBlockProps extends HTMLAttributes<HTMLElement> {}

const DailyExpenseBlock = forwardRef<HTMLElement, DailyExpenseBlockProps>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn('px-5 py-4 group/expense rounded-md odd:bg-brand-primary-bg even:bg-white', className)}
      {...props}
    />
  );
});

interface DailyExpenseTitleProps extends HTMLAttributes<HTMLDivElement> {}

const DailyExpenseTitle = forwardRef<HTMLDivElement, DailyExpenseTitleProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('text-text-aside font-semibold text-[13px]/[125%] ellipsis-text-oneline', className)}
      {...props}
    />
  );
});

interface DailyExpenseAddProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const DailyExpenseAdd = forwardRef<HTMLButtonElement, DailyExpenseAddProps>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'text-text-secondary p-1.5 rounded-full group-odd/expense:bg-white group-even/expense:bg-[#F4F4F4] hover:group-even/expense:bg-brand-primary-lighter/50 hover:group-odd/expense:bg-brand-primary-lighter/50 active:group-odd/expense:bg-brand-primary-lighter active:group-even/expense:bg-brand-primary-lighter shrink-0 transition-all',
        className,
      )}
      {...props}
    >
      <Plus size={18} strokeWidth={3} />
    </button>
  );
});

export { ExpenseItem, DailyExpenseBlock, DailyExpenseTitle, DailyExpenseAdd };
