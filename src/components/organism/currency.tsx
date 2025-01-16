import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ComponentProps, LiHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useCurrencies } from '@/APIs/transaction/currency/get';
import { CurrencyItem } from '@/types/transaction';
import { useCurrencyStore } from '@/stores/currencyStore';
import { Button } from '../ui/buttons';
import { X } from 'lucide-react';

const CurrencySelectDrawer = ({
  onCurrencySelect,
  filter,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root> & {
  onCurrencySelect?: (item: CurrencyItem) => void;
  filter?: (item: CurrencyItem) => boolean;
}) => {
  // Store
  const { history, addToHistory } = useCurrencyStore();

  // API Calls
  const { data: currencies } = useCurrencies();

  // Refs
  const drawerContentRef = useRef<HTMLDivElement>(null);

  // State
  const [searchValue, setSearchValue] = useState('');

  // Values
  const sortedFilteredCurrencies = useMemo(() => {
    if (!currencies) return [];
    const sorted = currencies.data.currencyList
      .sort((a, b) => a.currency.localeCompare(b.currency))
      .filter(filter || (() => true));
    const filtered = sorted.filter(
      (currency) =>
        currency.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        currency.country.includes(searchValue),
    );
    return filtered;
  }, [currencies, searchValue, filter]);

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

  const handleSelect = (currency: CurrencyItem) => {
    addToHistory(currency);
    onCurrencySelect?.(currency);
  };

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const searchInput = e.currentTarget.querySelector('#currency-drawer-search') as HTMLInputElement;
              setSearchValue(searchInput.value);
            }}
            onReset={(e) => {
              e.preventDefault();
              const searchInput = e.currentTarget.querySelector('#currency-drawer-search') as HTMLInputElement;
              searchInput.value = '';
              setSearchValue('');
            }}
            className="relative"
          >
            <Input
              id="currency-drawer-search"
              type="search"
              inputMode="search"
              name="currency-drawer-search"
              placeholder="통화 검색"
              className="hide-clear"
            />
            {searchValue && (
              <button className="absolute -translate-y-1/2 right-2 top-1/2" type="reset">
                <X size={16} />
              </button>
            )}
          </form>
        </DrawerHeader>

        {history && (
          <div className="grid items-center grid-cols-5 gap-2 px-4">
            {history.map(({ currency, name }) => (
              <Button
                key={`currency-drawer-history-item-${currency}`}
                variant="secondary"
                size="small"
                className="justify-start px-2.5"
                onClick={() => handleSelect({ currency, name })}
              >
                <span className="truncate">
                  {currency}({name})
                </span>
              </Button>
            ))}
          </div>
        )}

        <ul className="px-4 pt-2 pb-10 overflow-auto">
          {sortedFilteredCurrencies.length > 0 ? (
            sortedFilteredCurrencies.map((currency) => (
              <CurrencyListItem
                key={`currency-select-item-${currency.currency}`}
                onClick={() => handleSelect({ currency: currency.currency, name: currency.name })}
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
