import { forwardRef, lazy, Suspense, memo } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

type LucideIconName = keyof typeof dynamicIconImports;

interface LucideIconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName;
}

const LucideIcon = forwardRef<any, LucideIconProps>(({ name, ...props }, ref) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  const fallback = <div style={{ width: props.size ?? props.width ?? 24, height: props.size ?? props.width ?? 24 }} />;

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} ref={ref} />
    </Suspense>
  );
});

const MemoizedLucideIcon = memo(LucideIcon);

export { LucideIcon, MemoizedLucideIcon, type LucideIconName, type LucideIconProps };
