import { addCommas, cn } from '@/lib/utils';
import BetterImg from '../../../components/atoms/BetterImg';
import { forwardRef, HTMLAttributes } from 'react';
import { formatAmountWithCurrency } from '@/lib/money';

interface SettlementAvatarProps {
  userName?: string;
  profileImage?: string;
}

const SettlementAvatar = ({ userName, profileImage }: SettlementAvatarProps) => {
  return (
    <div className="py-1.5 px-2.5 flex flex-col items-center gap-1.5 w-full max-w-[100px]">
      <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden text-xl font-semibold rounded-full bg-brand-primary-lighter text-text-secondary">
        {profileImage === undefined && userName?.charAt(0)}
        <BetterImg className="absolute top-0 left-0 object-cover object-center w-full h-full" src={profileImage} />
      </div>
      <div className="w-full text-base font-medium text-center text-text-primary ellipsis-text-oneline">{userName}</div>
    </div>
  );
};

interface SettlementArrowProps {
  amount?: number;
  currency?: string;
}

const SettlementArrow = ({ amount, currency }: SettlementArrowProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-grow max-w-[200px]">
      <div className="relative w-full h-px mr-1 bg-neutral-300">
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -translate-y-1/2 left-full top-1/2 w-[5px] h-[6px]"
        >
          <path d="M0 12V0L10 6L0 12Z" fill="#d4d4d4" />
        </svg>
      </div>
      {amount !== undefined && (
        <div className="text-lg font-bold text-brand-primary-dark">
          {currency}
          {addCommas(amount)}
        </div>
      )}
    </div>
  );
};

interface SettlementContainerProps extends HTMLAttributes<HTMLDivElement> {}

const SettlementContainer = forwardRef<HTMLDivElement, SettlementContainerProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('p-5 rounded-lg bg-brand-primary-bg', className)} {...props} />;
});

interface SettlementSenderProps extends HTMLAttributes<HTMLDivElement> {
  userName?: string;
  profileImg?: string;
}

const SettlementSender = forwardRef<HTMLDivElement, SettlementSenderProps>(
  ({ userName, profileImg, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
        <div className="relative flex items-center justify-center overflow-hidden text-sm font-semibold rounded-full w-7 h-7 bg-brand-primary-lighter text-text-secondary">
          {profileImg === undefined && userName?.charAt(0)}
          <BetterImg className="absolute top-0 left-0 object-cover object-center w-full h-full" src={profileImg} />
        </div>

        <div className="text-2xl font-bold text-text-primary">{userName}</div>
      </div>
    );
  },
);

interface SettlementReceiverProps extends HTMLAttributes<HTMLDivElement> {
  userName?: string;
  amounts?: {
    amount: number;
    currency: string;
  }[];
}

const SettlementReceiver = forwardRef<HTMLDivElement, SettlementReceiverProps>(
  ({ userName, amounts, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('border-b last:border-0 pb-3 last:pb-0 flex items-start justify-between w-full gap-2', className)}
        {...props}
      >
        <div className="flex items-center gap-1.5 text-lg font-semibold text-text-secondary w-full overflow-hidden">
          <svg
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M5.9043 9.35547L4.90625 8.37109L7.90039 5.39062H0.640625V3.95508H7.90039L4.90625 0.974609L5.9043 -0.00976562L10.5801 4.66602L5.9043 9.35547Z"
              fill="#535353"
            />
          </svg>
          <span className="ellipsis-text-oneline">{userName}</span>
        </div>
        <div className="flex flex-col gap-1 text-end">
          {amounts?.map(({ amount, currency }) => (
            <div
              className="text-lg font-bold text-brand-primary-dark shrink-0"
              key={`settlement-receiver-${userName}-${amount}-${currency}`}
            >
              {formatAmountWithCurrency(amount, currency)}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export { SettlementAvatar, SettlementArrow, SettlementContainer, SettlementSender, SettlementReceiver };
