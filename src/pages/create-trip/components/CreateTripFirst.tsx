import EmptyIcon from '../../../components/atoms/EmptyIcon';
import { Button, ButtonIcon } from '../../../components/ui/buttons';
import { LocationSelector } from '@/components/organism/location';

type Props = {
  location: string[];
  onSelectLocation: (location: string[]) => void;
  thumbnail?: string;
  onThumbnailChange: (file: File | string | null) => void;
};

const CreateTripFirst = ({ location, onSelectLocation, thumbnail, onThumbnailChange }: Props) => {
  // Handlers
  const handleSelectLocation = (location: string[], coverImg: string | null) => {
    onSelectLocation(location);
    onThumbnailChange(coverImg);
  };

  const handleUploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onThumbnailChange(file);
    }
  };

  return (
    <>
      <main className="px-6 text-text-primary">
        <section>
          <h1 className="mb-3 text-lg font-semibold">이번 여행지는 어디인가요?</h1>
          <LocationSelector location={location} onLocationChange={handleSelectLocation} />
        </section>

        <section
          data-visible={location.length > 0}
          className="opacity-0 data-[visible=true]:opacity-100 transition-opacity duration-500"
        >
          <h1 className="mb-2 text-base font-semibold mt-11">썸네일 이미지</h1>
          <div className="relative flex aspect-video rounded-md overflow-hidden isolate shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] bg-neutral-50 mb-3">
            <div
              className="absolute absolute-center flex flex-col items-center gap-3 text-center text-sm text-text-tertiary font-medium invisible data-[show=true]:visible"
              data-show={thumbnail === null}
            >
              <EmptyIcon width={28} height={28} />
              썸네일 이미지를 추가해주세요!
            </div>
            <img
              src={thumbnail}
              data-show={!!thumbnail}
              className="w-full h-full opacity-0 data-[show=true]:opacity-100 transition-opacity object-cover object-center"
            />
          </div>
          <Button size="small" variant="outline" className="relative w-full py-3" asChild>
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
