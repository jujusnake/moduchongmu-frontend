import { useTravel } from '@/APIs/travel/get';
import { TransactionAvatarButton, TransactionLabel } from '../../../components/ui/transaction';
import { getUserThumbnail } from '@/lib/urls';
import { memo } from 'react';
import { Member } from '@/types/travel';

type PayerSelectorProps = {
  activated?: boolean;
  payer?: Member | null;
  onPayerChange?: (payer: Member | null) => void;
  tripUid?: string | null;
};

const PayerSelector = ({ tripUid, activated, payer, onPayerChange }: PayerSelectorProps) => {
  // API Calls
  const { data: travelRes } = useTravel(tripUid ?? '');

  return (
    <div
      className="flex flex-col items-start gap-2 opacity-100 max-h-[500px] data-[show=false]:opacity-0 data-[show=false]:max-h-0 transition-[max-height,_opacity] overflow-hidden duration-500"
      data-show={activated}
    >
      <TransactionLabel className="w-full">결제한 사람</TransactionLabel>
      <div className="flex flex-wrap gap-1">
        {travelRes?.data.travel.memberArray.map((member) => (
          <TransactionAvatarButton
            key={`create-transaction-payer-select-${member.idx}`}
            label={member.name}
            imgSrc={getUserThumbnail(member.email)}
            onClick={() => onPayerChange?.(payer?.idx === member.idx ? null : member)}
            selected={payer?.idx === member.idx}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PayerSelector);
