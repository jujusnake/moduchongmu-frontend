import { Input } from '@/components/ui/input';
import { TransactionLabel } from '@/components/ui/transaction';
import React, { memo } from 'react';

type Props = { value?: string; onValueChange?: (value: string) => void };

const TransactionMemo = ({ value, onValueChange }: Props) => {
  return (
    <div>
      <TransactionLabel className="w-full">설명</TransactionLabel>
      <Input
        className="mt-2"
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        placeholder="설명 추가 (선택사항)"
      />
    </div>
  );
};

export default memo(TransactionMemo);
