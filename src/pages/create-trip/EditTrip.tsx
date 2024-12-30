import { useCitySearch } from '@/APIs/travel/city/get';
import { useTravel } from '@/APIs/travel/get';
import Vacation from '@/components/icons/Vacation';
import { Button } from '@/components/ui/buttons';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { hasBatchim } from 'es-hangul';
import { ChevronLeft, Image } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import TripThumbnailImg from '@/components/atoms/TripThumbnailImg';
import { getTravelThumbnail } from '@/lib/urls';

const EditTrip = () => {
  // Hooks
  const { tripUid } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  // States
  const [travelName, setTravelName] = useState('');
  const [date, setDate] = useState<DateRange | undefined>({ from: undefined, to: undefined });
  const [location, setLocation] = useState<string[]>([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [searchValue, setSearchValue] = useState(location.join(', '));

  // API Calls
  const { data: travelRes, isError, isPending: fetchingTravel } = useTravel(tripUid ?? '');
  const { data: citySearchRes } = useCitySearch(searchValue);

  // Values
  const customLocationName = useMemo(() => {
    if (hasBatchim(searchValue)) {
      return `"${searchValue}"으로`;
    }
    return `"${searchValue}"로`;
  }, [searchValue]);

  const handleSelectLocation = (location: string[]) => {
    setLocation(location);
    setSearchValue(location.join(', '));
    setInputFocus(false);
  };

  useEffect(() => {
    if (travelRes) {
      setTravelName(travelRes.data.travel.travelName);
      setLocation([travelRes.data.travel.city, travelRes.data.travel.country]);
      setSearchValue(`${travelRes.data.travel.city}, ${travelRes.data.travel.country}`);
      setDate({
        from: new Date(travelRes.data.travel.startDate),
        to: new Date(travelRes.data.travel.endDate),
      });
    }
  }, [travelRes]);

  // Render
  if (isError) {
    return <div>오류가 있는 것 같습니다!</div>;
  }

  return (
    <>
      <header className="relative flex gap-2 px-6 py-6 bg-brand-primary-dark">
        <button className="text-text-contrast" onClick={() => navigate(state?.from ?? `/trip/${tripUid}`)}>
          <ChevronLeft />
        </button>
        <h1 className="z-10 text-2xl font-semibold text-brand-primary-contrastText">여행 정보 수정하기</h1>
      </header>

      <main className="p-6 space-y-6">
        <div>
          <h1 className="mb-2 ml-0.5 text-sm font-semibold text-text-primary">여행 이름</h1>
          <Input
            value={travelName}
            onChange={(e) => setTravelName(e.target.value)}
            placeholder={travelRes?.data.travel.travelName}
          />
        </div>

        <div>
          <h1 className="mb-2 ml-0.5 text-sm font-semibold text-text-primary">여행지</h1>
          <div className="relative">
            <TooltipProvider>
              <Tooltip open={inputFocus}>
                <TooltipTrigger asChild>
                  <Input
                    customIcon={<Vacation />}
                    placeholder="도시, 국가로 검색해주세요"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                  />
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
                            handleSelectLocation([city.city, city.country]);
                            // city.cover && onThumbnailChange(city.cover);
                          }}
                        >
                          <span className="max-w-full text-base text-text-primary shrink-0 ellipsis-text-oneline">
                            {city.city}, {city.country}
                          </span>
                          {/* <span className="text-sm text-text-aside shrink-[3] ellipsis-text-oneline">
                            HO CHI MIHN CITY, VIETNAM
                          </span> */}
                        </li>
                      ))}

                      <li
                        className="text-base text-text-primary py-4 px-2 font-bold border-b border-[#F0F0F0] last:border-0 hover:bg-bg-base cursor-pointer data-[show=false]:hidden"
                        data-show={searchValue.length > 0}
                        onClick={() => {
                          handleSelectLocation([searchValue]);
                          // onThumbnailChange(null);
                        }}
                      >
                        {customLocationName} 직접입력
                      </li>
                    </ul>
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div>
          <h1 className="mb-2 ml-0.5 text-sm font-semibold text-text-primary">썸네일</h1>
          <div className="relative flex aspect-video rounded-md overflow-hidden isolate shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] bg-neutral-50 mb-3">
            <TripThumbnailImg
              src={getTravelThumbnail(travelRes?.data.travel.uid)}
              city={travelRes?.data.travel.city}
              className="object-cover object-center w-full h-full"
            />

            <div className="absolute p-2 overflow-hidden rounded-full size-10 bottom-2 right-2 bg-bg-base">
              <Image size={24} />
              <input type="file" className="w-full h-full opacity-0" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="mb-2 ml-0.5 text-sm font-semibold text-text-primary">여행 일정</h1>
          <div className="flex items-center gap-3">
            <Calendar
              id="create-trip-calendar"
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              className="w-full border rounded-md border-border-light/50 bg-bg-back"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" className="flex-grow">
            저장하기
          </Button>
        </div>
      </main>
    </>
  );
};

export default EditTrip;
