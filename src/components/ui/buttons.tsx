import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(['flex', 'items-center', 'justify-center', 'font-semibold', 'gap-8', 'transition-colors'], {
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
    },
    size: {
      medium: [''],
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
});

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ size, variant, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

Button.displayName = 'Button';

export { Button };
