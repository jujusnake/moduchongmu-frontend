import { cn } from '@/lib/utils';
import { HTMLAttributes, useMemo } from 'react';
import NavButton from '../atoms/NavButton';
import { Plus } from 'lucide-react';
import { useCurrentTravel } from '@/APIs/travel/current/get';
import { useLocation, useNavigate } from 'react-router-dom';

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
      <div className="relative w-1/5">
        <AddButton />
      </div>
      <NavButton variant="currency" className="w-1/5" />
      <NavButton variant="my" className="w-1/5" />
    </nav>
  );
};

const AddButton = () => {
  const { data: travel, isSuccess } = useCurrentTravel();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const createTransactionToCurrent = () => {
    navigate(`/createtransaction/${travel?.travel?.uid ?? ''}`, { state: { from: pathname } });
  };

  return (
    <button
      className="absolute p-3 -translate-x-1/2 border-4 border-white rounded-full text-brand-primary-contrastText bg-brand-primary-main -top-4 left-1/2 disabled:opacity-70"
      disabled={!isSuccess}
      onClick={createTransactionToCurrent}
    >
      <Plus size={28} />
    </button>
  );
};

export { BottomNavigation };
