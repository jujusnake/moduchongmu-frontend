import { memo, useEffect, useState } from 'react';
import { TransactionAvatarButton, TransactionLabel } from '../../../components/ui/transaction';
import { useParams } from 'react-router-dom';
import { useTravel } from '@/APIs/travel/get';
import { getUserThumbnail } from '@/lib/urls';
import { Member } from '@/types/travel';

type SpenderSelectorProps = { activated?: boolean; spenders?: Member[]; onSpenderChange?: (spender: Member) => void };

const SpenderSelector = ({ activated, spenders, onSpenderChange }: SpenderSelectorProps) => {
  // Values
  const { tripUid } = useParams();

  // API Calls
  const { data: travelRes } = useTravel(tripUid ?? '');

  return (
    <div
      className="flex flex-col items-start gap-2 max-h-[500px] data-[show=false]:opacity-0 data-[show=false]:max-h-0 transition-[max-height,_opacity] overflow-hidden duration-500"
      data-show={activated}
    >
      <TransactionLabel className="w-full">누가 함께 사용했나요?</TransactionLabel>
      <div className="flex flex-wrap gap-1">
        {travelRes?.data.travel.memberArray.map((member) => (
          <TransactionAvatarButton
            key={`create-transaction-spender-select-${member}`}
            label={member.name}
            imgSrc={getUserThumbnail(member.email)}
            onClick={() => onSpenderChange?.(member)}
            selected={spenders?.find((spender) => spender.idx === member.idx) !== undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(SpenderSelector);
