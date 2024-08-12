import { cn } from '@/lib/utils';
import { LucideIconName, MemoizedLucideIcon } from '../atoms/LucideIcon';
import { InputHTMLAttributes, forwardRef } from 'react';
import { Label } from './label';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIconName;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ icon, className, type, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (
        <MemoizedLucideIcon
          ref={ref}
          name={icon}
          size={16}
          aria-disabled={props.disabled}
          className="absolute top-1/2 -translate-y-1/2 left-3 text-text-secondary aria-disabled:text-text-aside"
        />
      )}

      <input
        type={type}
        className={cn(
          'font-medium flex p-[11px] gap-2.5 w-full rounded-md border border-[#ECECEC] text-base text-text-primary placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-dark disabled:bg-[#F7F7F7] disabled:cursor-not-allowed data-[with-icon="true"]:pl-[38px]',
          className,
        )}
        ref={ref}
        data-with-icon={icon !== undefined}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

const InputLabel = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return <Label ref={ref} className={cn('inline-block mb-2 text-text-secondary', className)} {...props} />;
  },
);

export { Input, InputLabel };
