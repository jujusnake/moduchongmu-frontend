import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { HTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';

interface CheckboxLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabelProps>(({ className, ...props }, ref) => {
  return <label className={cn('text-[13px]/[125%] text-text-primary font-semibold', className)} ref={ref} {...props} />;
});

CheckboxLabel.displayName = 'CheckboxLabel';

interface CheckboxLabelDescProps extends HTMLAttributes<HTMLParagraphElement> {}

const CheckboxLabelDesc = forwardRef<HTMLParagraphElement, CheckboxLabelDescProps>(({ className, ...props }, ref) => {
  return <p className={cn('text-xs text-text-tertiary font-normal', className)} ref={ref} {...props} />;
});

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <label className="relative w-8 h-8">
      <input
        type="checkbox"
        ref={ref}
        className={cn('opacity-0 w-full h-full cursor-pointer peer', className)}
        {...props}
      />

      <div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 w-5 h-5 border-2 rounded *:invisible *:peer-checked:visible peer-checked:border-brand-primary-main peer-checked:bg-brand-primary-main pointer-events-none">
        <Check className="w-full h-full text-white" size={20} strokeWidth={3} />
      </div>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export {
  Checkbox,
  CheckboxLabel,
  CheckboxLabelDesc,
  type CheckboxProps,
  type CheckboxLabelProps,
  type CheckboxLabelDescProps,
};
