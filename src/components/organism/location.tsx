import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import { useMemo, useState } from 'react';
import { Input } from '../ui/input';
import Vacation from '../icons/Vacation';
import { useCitySearch } from '@/APIs/travel/city/get';
import { roUroJosa } from '@/lib/geonames';

type Props = {
  location?: string[];
  onLocationChange: (location: string[], coverImg: string | null) => void;
};

const LocationSelector = ({ location, onLocationChange }: Props) => {
  // States
  const [inputFocus, setInputFocus] = useState(false);
  const [searchValue, setSearchValue] = useState(location?.join(', ') ?? '');

  // API Calls
  const { data: citySearchRes } = useCitySearch(searchValue);

  // Values
  const customLocationName = useMemo(() => {
    if (roUroJosa(searchValue)) {
      return `"${searchValue}"으로`;
    }
    return `"${searchValue}"로`;
  }, [searchValue]);

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip open={inputFocus}>
          <TooltipTrigger asChild>
            <div className="relative">
              <Input
                customIcon={<Vacation />}
                placeholder="도시, 국가로 검색해주세요"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
              />
              <div
                className="pointer-events-none absolute text-base font-medium flex items-center text-text-primary top-1 bottom-1 left-[39px] bg-white right-1 data-[hide=true]:invisible"
                data-hide={inputFocus}
              >
                {location?.join(', ') ?? ''}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              side="bottom"
              className="p-0 rounded-none border-[#fdfdfd] w-screen max-w-moduchongmu px-6 bg-bg-back shadow-none"
            >
              <ul>
                {citySearchRes?.data.result?.map((city) => (
                  <li
                    key={`search-result-${city.city}-${city.country}`}
                    className="py-4 px-2 flex items-center justify-between font-medium border-b border-[#F0F0F0] last:border-0 gap-2 hover:bg-bg-base cursor-pointer"
                    onClick={() => {
                      setSearchValue(`${city.city}, ${city.country}`);
                      onLocationChange([city.city, city.country], city.cover);
                    }}
                  >
                    <span className="max-w-full text-base text-text-primary shrink-0 ellipsis-text-oneline">
                      {city.city}, {city.country}
                    </span>
                  </li>
                ))}

                <li
                  className="text-base text-text-primary py-4 px-2 font-bold border-b border-[#F0F0F0] last:border-0 hover:bg-bg-base cursor-pointer data-[show=false]:hidden"
                  data-show={searchValue.length > 0}
                  onClick={() => onLocationChange([searchValue], null)}
                >
                  {customLocationName} 직접입력
                </li>
              </ul>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { LocationSelector };
