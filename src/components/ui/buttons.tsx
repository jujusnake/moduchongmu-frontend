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
        secondary: [
          'text-text-primary',
          'bg-[#EEF2F8]',
          'hover:bg-[#DFE8F4]',
          'active:bg-[#C9D7E9]',
          'disabled:text-text-disabled',
          'disabled:bg-element-disabled',
        ],
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
        'ghost-destructive': [
          'text-functional-error-main',
          'hover:bg-functional-error-bg',
          'active:bg-functional-error-bg',
          'disabled:text-text-disabled',
        ],
        contrast: [
          'text-brand-primary-contrastText',
          // 'bg-brand-primary-main',
          // 'hover:bg-brand-primary-dark',
          'hover:text-brand-primary-lighter',
          'active:text-brand-primary-contrastText',
          'active:bg-brand-primary-light',
          'disabled:text-text-disabled',
        ],
      },
      size: {
        xsmall: ['px-3 py-1.5', 'text-xs'],
        small: ['px-4 py-2', 'text-sm'],
        medium: ['px-4 py-2.5', 'text-base'],
        large: ['px-5 py-3', 'text-lg'],
      },
      shape: {
        rectangle: ['rounded-[6px]'],
        round: ['rounded-full'],
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'medium',
        shape: 'rectangle',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      shape: 'rectangle',
    },
  },
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'medium', shape = 'rectangle', variant, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <ButtonContext.Provider value={{ size }}>
        <Comp ref={ref} className={cn(buttonVariants({ variant, size, shape }), className)} {...props} />
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

  return <MemoizedLucideIcon size={size ? iconSize[size] : 24} {...props} />;
});

export { Button, ButtonIcon, buttonVariants };
