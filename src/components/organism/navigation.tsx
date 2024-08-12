import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import NavButton from '../atoms/NavButton';
import { Plus } from 'lucide-react';

interface BottomNavigationProps extends HTMLAttributes<HTMLElement> {}

const BottomNavigation = ({ className, ...props }: BottomNavigationProps) => {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-moduchongmu flex justify-between shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.05)] rounded-t-[12px] bg-bg-back',
        className,
      )}
      {...props}
    >
      <NavButton variant="now" className="w-1/5" />
      <NavButton variant="trips" className="w-1/5" />
      <div className="w-1/5 relative">
        <button className="p-3 text-brand-primary-contrastText bg-brand-primary-main rounded-full border-white border-4 absolute -top-4 left-1/2 -translate-x-1/2">
          <Plus size={28} />
        </button>
      </div>
      <NavButton variant="currency" className="w-1/5" />
      <NavButton variant="my" className="w-1/5" />
    </nav>
  );
};

export { BottomNavigation };
