import { TransactionCategory, TransactionCategoryType } from '@/types/transaction';
import { TransactionLabel, TransactionCategoryButton } from '../../../components/ui/transaction';
import { cn } from '@/lib/utils';
import { memo, useEffect, useState } from 'react';
import { SwitchTransitionContainer, SwitchTransitionOff, SwitchTransitionOn } from '../../../components/ui/transitions';

type CategorySelectorProps = {
  activated?: boolean;
  category?: TransactionCategoryType | null;
  onCategoryChange?: (category: TransactionCategoryType | null) => void;
  className?: string;
};

const CategorySelector = ({ activated, category, onCategoryChange, className }: CategorySelectorProps) => {
  const [isEdit, setIsEdit] = useState(true);

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-2 max-h-[500px] opacity-100 data-[show=false]:max-h-0 data-[show=false]:opacity-0 transition-[max-height,_opacity] overflow-hidden duration-500',
        className,
      )}
      data-show={activated}
    >
      <TransactionLabel className="w-full">카테고리</TransactionLabel>

      <SwitchTransitionContainer on={isEdit}>
        <SwitchTransitionOff>
          <div className="flex flex-wrap gap-2">
            {category && <TransactionCategoryButton category={category} selected />}
            <button
              className="flex flex-col items-center justify-center gap-2 h-16 w-16 rounded-[4px] text-text-primary border border-border-light hover:bg-brand-primary-bg active:bg-[#e8f2ff] data-[selected=true]:bg-brand-primary-dark data-[selected=true]:text-brand-primary-contrastText data-[selected=true]:border-brand-primary-dark transition-colors"
              onClick={() => setIsEdit(true)}
            >
              <span className="p-2 text-xs font-semibold">
                다시
                <br />
                선택하기
              </span>
            </button>
          </div>
        </SwitchTransitionOff>
        <SwitchTransitionOn>
          <div className="flex flex-wrap gap-2">
            {TransactionCategory.map((cateName) => (
              <TransactionCategoryButton
                key={`transaction-category-${cateName}`}
                category={cateName}
                selected={cateName === category}
                onClick={(_, cate) => {
                  onCategoryChange?.(cate);
                  setIsEdit(false);
                }}
              />
            ))}
          </div>
        </SwitchTransitionOn>
      </SwitchTransitionContainer>
    </div>
  );
};

export default memo(CategorySelector);
