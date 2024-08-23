import { cn } from '@/lib/utils';
import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { AutoTextSize } from 'auto-text-size';
import {
  getDecimalCountFromCurrency,
  validateNumberString,
  removeDecimalsByCount,
  formatAmountWithCurrency,
  trimStringToFloat,
} from '@/lib/money';

interface AmountInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'type'> {
  value: string;
  onValueChange: (value: string) => void;
  currency?: string;
}

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ value, currency, onValueChange, className, onChange, onBlur, onFocus, ...props }, ref) => {
    // States
    const [isFocused, setIsFocused] = useState(false);

    // Values
    const decimalCount = useMemo(() => getDecimalCountFromCurrency(currency), [currency]);

    const formattedVal = useMemo(() => {
      const parsed = parseFloat(value);
      return formatAmountWithCurrency(parsed, currency);
    }, [value, currency]);

    // Handlers
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (validateNumberString(e.target.value, decimalCount) === false) return;
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
      onFocus?.(e);

      setIsFocused(true);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
      onBlur?.(e);

      setIsFocused(false);
      const trimmed = trimStringToFloat(e.target.value);
      onValueChange?.(trimmed);
    };

    // Effects
    useEffect(() => {
      const newValue = removeDecimalsByCount(value, decimalCount);
      if (value !== newValue) onValueChange(newValue);
    }, [decimalCount]);

    return (
      <div className="relative flex justify-end overflow-hidden">
        <input
          inputMode="decimal"
          ref={ref}
          className={cn(
            'min-w-0 inline text-[24px]/[125%] pb-1 border-b-2 border-border-main/10 text-brand-primary-contrastText data-[hide=true]:text-transparent font-semibold focus:border-b-2 focus-visible:border-b-2 focus-visible:outline-none focus:border-brand-primary-contrastText focus-visible:border-brand-primary-contrastText text-right placeholder:font-light placeholder:text-base placeholder:text-brand-primary-lighter',
            className,
          )}
          data-hide={isFocused === false}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          type="text"
          min={0}
          value={value}
          {...props}
        />
        {isFocused === false && (
          <strong
            className="absolute top-0 right-0 w-full text-end text-[24px]/[125%] text-brand-primary-contrastText font-semibold pointer-events-none"
            style={{ textShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)' }}
          >
            <AutoTextSize mode="oneline" maxFontSizePx={24} className="w-full">
              {formattedVal}
            </AutoTextSize>
          </strong>
        )}
      </div>
    );
  },
);

export default AmountInput;
