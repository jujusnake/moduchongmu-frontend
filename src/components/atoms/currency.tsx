import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { ButtonHTMLAttributes, MouseEvent as ReactMouseEvent, forwardRef, useState } from 'react';

interface CurrencySwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const TRANSITION_DURATION = 300;

const CurrencySwitch = ({ onClick, ...props }: CurrencySwitchProps) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [arrowPos, setArrowPos] = useState<number>(0);
  const [isSwitched, setIsSwitched] = useState(false);

  const handleSwitch = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(e);
    setArrowPos(100);
    setTimeout(() => {
      setIsTransitioning(false);
      setArrowPos(-100);
      setIsSwitched((prev) => !prev);

      setTimeout(() => {
        setIsTransitioning(true);
        setArrowPos(0);
      }, 50);
    }, TRANSITION_DURATION / 2);
  };

  return (
    <button
      className="absolute z-20 absolute-center bg-bg-back p-[18px] rounded-full shadow-md hover:bg-bg-base active:bg-[#f3f3f3] transition-[colors] duration-200"
      data-clicked={arrowPos !== 0}
      onClick={handleSwitch}
      {...props}
    >
      <div className="w-6 h-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-down-up"
        >
          <g
            style={{
              transition: isTransitioning ? `transform ${TRANSITION_DURATION / 2}ms ease-in-out` : '',
              transform: `translate(${isSwitched ? 10 : 0}px, ${arrowPos}%)`,
            }}
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
          </g>
          <g
            style={{
              transition: isTransitioning ? `transform ${TRANSITION_DURATION / 2}ms ease-in-out` : '',
              transform: `translate(${isSwitched ? -10 : 0}px, ${-arrowPos}%)`,
            }}
          >
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </g>
        </svg>
      </div>
    </button>
  );
};

const suggestionButtonVariants = cva(['text-xs', 'px-2 py-1.5', 'rounded-[3px]', 'font-semibold'], {
  variants: {
    variant: {
      primary: ['bg-[#5A84D4]', 'text-brand-primary-contrastText'],
      gray: ['bg-[#EEEEEE]', 'text-text-aside'],
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
});

interface CurrencySuggestionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof suggestionButtonVariants> {
  asChild?: boolean;
}

const CurrencySuggestionButton = forwardRef<HTMLButtonElement, CurrencySuggestionButtonProps>(
  ({ variant, asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp ref={ref} className={cn(suggestionButtonVariants({ variant }), className)} {...props} />;
  },
);

CurrencySuggestionButton.displayName = 'CurrencySuggestionButton';

interface CurrencySelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CurrencySelectButton = ({ className, children, ...props }: CurrencySelectButtonProps) => {
  return (
    <button
      className={cn(
        'flex items-center gap-1 text-lg px-3 py-2.5 rounded-[4px] font-semibold bg-[#46508C] hover:bg-brand-primary-darker active:bg-brand-primary-darker text-brand-primary-contrastText',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown size={16} strokeWidth={3} />
    </button>
  );
};

CurrencySelectButton.displayName = 'CurrencySelectButton';

export { CurrencySwitch, CurrencySuggestionButton, CurrencySelectButton };
