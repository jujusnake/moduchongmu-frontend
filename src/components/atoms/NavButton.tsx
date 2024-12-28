import { cn, getCleanPathname } from '@/lib/utils';
import { Backpack, CircleDollarSign, Plane, User } from 'lucide-react';
import { useMemo } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

type NavButtonProps = Omit<LinkProps, 'to'> & {
  current?: boolean;
} & (
    | {
        variant: 'now' | 'trips' | 'currency' | 'my';
        to?: never;
      }
    | {
        variant?: never;
        to: string;
      }
  );

const NavButton = ({ variant, current, children, className, to, ...props }: NavButtonProps) => {
  const { pathname } = useLocation();

  const defaultIcons = {
    now: <Backpack size={24} />,
    trips: <Plane size={24} />,
    currency: <CircleDollarSign size={24} />,
    my: <User size={24} />,
  };

  const defaultLabel = {
    now: 'NOW',
    trips: '여행',
    currency: '환율',
    my: 'MY',
  };

  const defaultPaths = {
    now: '/now',
    trips: '/trips',
    currency: '/currency',
    my: '/my',
  };

  const isCurrent = useMemo(() => {
    if (current !== undefined) return current;
    if (variant === 'now') return getCleanPathname(pathname) === defaultPaths.now || getCleanPathname(pathname) === '/';
    return variant ? getCleanPathname(pathname) === defaultPaths[variant] : false;
  }, [current, pathname]);

  return (
    <Link
      to={variant ? defaultPaths[variant] : to}
      className={cn(
        "flex flex-col items-center text-center p-3 gap-1 text-2xs text-text-tertiary font-semibold group data-[current='true']:pointer-events-none data-[current='true']:text-brand-primary-main",
        className,
      )}
      data-current={isCurrent}
      {...props}
    >
      {variant && (
        <>
          {defaultIcons[variant]}
          {defaultLabel[variant]}
        </>
      )}
      {children}
    </Link>
  );
};

export default NavButton;
