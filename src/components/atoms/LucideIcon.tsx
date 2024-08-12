import { forwardRef, lazy, Suspense, memo } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div />;

type LucideIconName = keyof typeof dynamicIconImports;

interface LucideIconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName;
}

const LucideIcon = forwardRef<any, LucideIconProps>(({ name, ...props }, ref) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} ref={ref} />
    </Suspense>
  );
});

const MemoizedLucideIcon = memo(LucideIcon);

export { LucideIcon, MemoizedLucideIcon, type LucideIconName, type LucideIconProps };
