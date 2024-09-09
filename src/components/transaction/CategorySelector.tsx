import { TransactionCategory, TransactionCategoryType } from '@/types/transaction';
import { TransactionLabel, TransactionCategoryButton } from '../ui/transaction';
import { cn } from '@/lib/utils';

type CategorySelectorProps = {
  category?: TransactionCategoryType;
  onCategoryChange?: (category: TransactionCategoryType) => void;
  className?: string;
};

const CategorySelector = ({ category, onCategoryChange, className }: CategorySelectorProps) => {
  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      <TransactionLabel className="w-full">카테고리</TransactionLabel>
      <div className="flex flex-wrap gap-2">
        {TransactionCategory.map((cateName) => (
          <TransactionCategoryButton
            key={`transaction-category-${cateName}`}
            category={cateName}
            selected={cateName === category}
            onClick={(_, cate) => onCategoryChange?.(cate)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
