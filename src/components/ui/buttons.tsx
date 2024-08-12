import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, createContext, forwardRef, useContext } from 'react';
import { LucideIconProps, MemoizedLucideIcon } from '../atoms/LucideIcon';

type ButtonContextType = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | null;
};

const ButtonContext = createContext<ButtonContextType>({});

const buttonVariants = cva(
  ['flex', 'items-center', 'justify-center', 'font-semibold', 'gap-1.5', 'transition-colors'],
  {
    variants: {
      variant: {
        primary: [
          'text-brand-primary-contrastText',
          'bg-brand-primary-main',
          'hover:bg-brand-primary-dark',
          'active:bg-brand-primary-darker',
          'disabled:text-text-disabled',
          'disabled:bg-element-disabled',
        ],
        secondary: [''],
        outline: [
          'text-text-primary',
          'shadow-border-main shadow-[0px_0px_0px_1px_inset]',
          'hover:bg-bg-front',
          'active:bg-bg-front',
          'active:shadow-border-dark',
          'disabled:shadow-border-light',
          'disabled:text-text-disabled',
        ],
        ghost: ['text-text-primary', 'hover:bg-[#EDEDED]', 'active:bg-[#DCDCDC]', 'disabled:text-text-disabled'],
        destructive: [
          'text-functional-error-contrastText',
          'bg-functional-error-main',
          'hover:bg-functional-error-dark',
          'active:bg-functional-error-darker',
          'disabled:text-text-disabled',
          'disabled:bg-element-disabled',
        ],
      },
      size: {
        xsmall: ['px-3 py-1.5', 'rounded-[4px]', 'text-xs'],
        small: ['px-4 py-2', 'rounded-[4px]', 'text-sm'],
        medium: ['px-4 py-2.5', 'rounded-[6px]', 'text-base'],
        large: ['px-5 py-3', 'rounded-[6px]', 'text-lg'],
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'medium',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'medium', variant, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <ButtonContext.Provider value={{ size }}>
        <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
      </ButtonContext.Provider>
    );
  },
);

Button.displayName = 'Button';

interface ButtonIconProps extends LucideIconProps {}

const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(({ className, ...props }, ref) => {
  const { size } = useContext(ButtonContext);

  const iconSize = {
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 20,
  };

  return <MemoizedLucideIcon {...props} size={size ? iconSize[size] : 24} />;
});

export { Button, ButtonIcon, buttonVariants };
