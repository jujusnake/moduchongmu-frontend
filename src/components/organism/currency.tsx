import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ComponentProps, LiHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

const CurrencySelectDrawer = ({
  onCurrencySelect,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root> & { onCurrencySelect?: (currency: string) => void }) => {
  // Refs
  const drawerContentRef = useRef<HTMLDivElement>(null);

  // State
  const [left, setLeft] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  // Effects
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];

      // set left position so that it is centered on window
      if (entry.contentRect.width > 500) {
        setLeft((entry.contentRect.width - 500) / 2);
      } else {
        setLeft(0);
      }
    });

    ro.observe(document.body);

    return () => {
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (props.open && window.visualViewport) {
      window.visualViewport.addEventListener('resize', onVisualViewportChange);

      return () => window.visualViewport?.removeEventListener('resize', onVisualViewportChange);
    }
  }, [props.open]);

  function onVisualViewportChange() {
    if (!drawerContentRef.current || !window.visualViewport) return;
    const visualViewportHeight = window.visualViewport.height;

    drawerContentRef.current.style.height = `${visualViewportHeight * 0.8}px`;
  }

  return (
    <Drawer {...props}>
      <DrawerContent
        ref={drawerContentRef}
        id="currency-select-drawer-content"
        className="max-w-moduchongmu max-h-[80%] [&>div]:shrink-0"
        style={{ left }}
        aria-describedby={undefined}
      >
        <DrawerHeader>
          <DrawerTitle className="mb-3">통화 선택</DrawerTitle>
          <Input placeholder="통화 검색" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </DrawerHeader>
        <ul className="px-4 pt-2 pb-10 overflow-auto">
          <CurrencyListItem
            onClick={() => {
              props.onOpenChange?.(false);
              onCurrencySelect?.('KRW');
            }}
          >
            KRW(원)
          </CurrencyListItem>
          <CurrencyListItem
            onClick={() => {
              props.onOpenChange?.(false);
              onCurrencySelect?.('CNY');
            }}
          >
            CNY(위안)
          </CurrencyListItem>
          <CurrencyListItem
            onClick={() => {
              props.onOpenChange?.(false);
              onCurrencySelect?.('USD');
            }}
          >
            USD(달러)
          </CurrencyListItem>
          <CurrencyListItem
            onClick={() => {
              props.onOpenChange?.(false);
              onCurrencySelect?.('JOD');
            }}
          >
            JOD(요르단 디나르)
          </CurrencyListItem>
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

const CurrencyListItem = ({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) => {
  return (
    <li
      className={cn(
        'border-[#ECECEC] w-full p-3 text-[15px]/[125%] font-medium even:bg-bg-base hover:bg-bg-base/50 active:bg-bg-front rounded-sm transition-colors',
        className,
      )}
      {...props}
    ></li>
  );
};

export { CurrencySelectDrawer };
