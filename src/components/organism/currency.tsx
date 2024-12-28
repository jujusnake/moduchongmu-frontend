import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ComponentProps, LiHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useCurrencies } from '@/APIs/transaction/currency/get';
import { CurrencyItem } from '@/types/transaction';

const CurrencySelectDrawer = ({
  onCurrencySelect,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root> & {
  onCurrencySelect?: (item: CurrencyItem) => void;
}) => {
  // API Calls
  const { data: currencies } = useCurrencies();

  // Refs
  const drawerContentRef = useRef<HTMLDivElement>(null);

  // State
  const [left, setLeft] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  // Values
  const sortedFilteredCurrencies = useMemo(() => {
    if (!currencies) return [];
    const sorted = currencies.data.currencyList.sort((a, b) => a.currency.localeCompare(b.currency));
    const filtered = sorted.filter(
      (currency) =>
        currency.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        currency.country.includes(searchValue),
    );
    return filtered;
  }, [currencies, searchValue]);

  // Effects
  // useEffect(() => {
  //   const ro = new ResizeObserver((entries) => {
  //     const entry = entries[0];

  //     // set left position so that it is centered on window
  //     if (entry.contentRect.width > 500) {
  //       setLeft((entry.contentRect.width - 500) / 2);
  //     } else {
  //       setLeft(0);
  //     }
  //   });

  //   ro.observe(document.body);

  //   return () => {
  //     ro.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    if (props.open && window.visualViewport) {
      window.visualViewport.addEventListener('resize', onVisualViewportChange);

      return () => window.visualViewport?.removeEventListener('resize', onVisualViewportChange);
    }
  }, [props.open]);

  // Functions
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
        className="max-w-moduchongmu h-[80%] [&>div]:shrink-0 moduchongmu:left-[calc(50%-250px)]"
        aria-describedby={undefined}
      >
        <DrawerHeader>
          <DrawerTitle className="mb-3">통화 선택</DrawerTitle>
          <Input placeholder="통화 검색" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </DrawerHeader>
        <ul className="px-4 pt-2 pb-10 overflow-auto">
          {sortedFilteredCurrencies.length > 0 ? (
            sortedFilteredCurrencies.map((currency) => (
              <CurrencyListItem
                key={`currency-select-item-${currency.currency}`}
                onClick={() => {
                  onCurrencySelect?.({ currency: currency.currency, name: currency.name });
                }}
              >
                {currency.currency}({currency.name})
              </CurrencyListItem>
            ))
          ) : (
            <div className="my-8 text-base font-semibold text-center text-text-tertiary">검색 결과가 없습니다</div>
          )}
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
