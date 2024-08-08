import { forwardRef, lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div />;

type LucideIconName = keyof typeof dynamicIconImports;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName;
}

const LucideIcon = forwardRef<any, IconProps>(({ name, ...props }, ref) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} ref={ref} />
    </Suspense>
  );
});

export { LucideIcon, type LucideIconName };
