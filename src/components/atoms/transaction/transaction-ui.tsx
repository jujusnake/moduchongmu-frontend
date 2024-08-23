import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cn('text-sm text-text-secondary font-semibold', className)} {...props} />;
});

export { Label as TransactionLabel };
