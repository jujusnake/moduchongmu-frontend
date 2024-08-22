import { hasBatchim } from 'es-hangul';
import { useMemo, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import Vacation from '@/components/icons/Vacation';
import { Input } from '@/components/ui/input';
import EmptyIcon from '../atoms/EmptyIcon';
import { Button, ButtonIcon } from '../ui/buttons';

type Props = {
  location: string;
  onSelectLocation: (location: string) => void;
  thumbnail: File | null;
  onThumbnailChange: (file: File | null) => void;
};

const CreateTripFirst = ({ location, onSelectLocation, thumbnail, onThumbnailChange }: Props) => {
  // States
  const [inputFocus, setInputFocus] = useState(false);
  const [searchValue, setSearchValue] = useState(location);

  // Handlers
  const customLocationName = useMemo(() => {
    if (hasBatchim(searchValue)) {
      return `"${searchValue}"으로`;
    }
    return `"${searchValue}"로`;
  }, [searchValue]);

  const handleSelectLocation = (location: string) => {
    onSelectLocation(location);
    setSearchValue(location);
    setInputFocus(false);
  };

  const handleUploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onThumbnailChange(file);
    }
  };

  return (
    <>
      <main className="text-text-primary px-6">
        <section>
          <h1 className="text-lg font-semibold mb-3">이번 여행지는 어디인가요?</h1>
          <div className="relative">
            <TooltipProvider>
              <Tooltip open={searchValue.length > 0 && inputFocus}>
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
                      <li
                        className="py-4 px-2 flex items-center justify-between font-medium border-b border-[#F0F0F0] last:border-0 gap-2 hover:bg-bg-base cursor-pointer"
                        onClick={() => handleSelectLocation('호치민, 베트남')}
                      >
                        <span className="text-base text-text-primary shrink-0 max-w-full ellipsis-text-oneline">
                          호치민, 베트남
                        </span>
                        <span className="text-sm text-text-aside shrink-[3] ellipsis-text-oneline">
                          HO CHI MIHN CITY, VIETNAM
                        </span>
                      </li>

                      <li
                        className="text-base text-text-primary py-4 px-2 font-bold border-b border-[#F0F0F0] last:border-0 hover:bg-bg-base cursor-pointer"
                        onClick={() => handleSelectLocation(searchValue)}
                      >
                        {customLocationName} 직접입력
                      </li>
                    </ul>
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>

        <section
          data-visible={location.length > 0}
          className="opacity-0 data-[visible=true]:opacity-100 transition-opacity duration-500"
        >
          <h1 className="text-base font-semibold mt-11 mb-2">썸네일 이미지</h1>
          <div className="relative flex aspect-video rounded-md overflow-hidden isolate shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] bg-neutral-50 mb-3">
            <div
              className="absolute absolute-center flex flex-col items-center gap-3 text-center text-sm text-text-tertiary font-medium invisible data-[show=true]:visible"
              data-show={thumbnail === null}
            >
              <EmptyIcon width={28} height={28} />
              썸네일 이미지를 추가해주세요!
            </div>
            <img
              src={thumbnail ? URL.createObjectURL(thumbnail) : ''}
              data-show={thumbnail !== null}
              className="w-full h-full opacity-0 data-[show=true]:opacity-100 transition-opacity object-cover object-center"
            />
          </div>
          <Button size="small" variant="outline" className="w-full py-3 relative" asChild>
            <label htmlFor="thumbnail-upload-input" className="cursor-pointer">
              <ButtonIcon name="arrow-up-from-line" />새 이미지 업로드
              <input
                accept="image/*"
                id="thumbnail-upload-input"
                type="file"
                className="absolute w-0 h-0 opacity-0"
                onChange={handleUploadThumbnail}
              />
            </label>
          </Button>
        </section>
      </main>
    </>
  );
};

export default CreateTripFirst;
