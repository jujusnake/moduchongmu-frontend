import { usePostSignin } from '@/APIs/signin/post';
import { usePostTravel } from '@/APIs/travel/post';
import CreateTripNextButton from '@/components/atoms/CreateTripNextButton';
import CreateTripFirst from '@/components/templates/CreateTripFirst';
import CreateTripFourth from '@/components/templates/CreateTripFourth';
import CreateTripSecond from '@/components/templates/CreateTripSecond';
import CreateTripThird from '@/components/templates/CreateTripThird';
import { Button } from '@/components/ui/buttons';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogHeader } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { error } from 'console';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateTrip = () => {
  // Hooks
  const navigate = useNavigate();
  const { state } = useLocation();

  // API Calls
  const { mutate: createTrip, isPending: isCreatingTrip } = usePostTravel();

  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState<string[]>([]);
  const [thumbnailImg, setThumbnailImg] = useState<File | string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [nickname, setNickname] = useState('');

  // Values
  const thumbnailSrc = useMemo(() => {
    if (thumbnailImg instanceof File) {
      return URL.createObjectURL(thumbnailImg);
    }
    return thumbnailImg ?? undefined;
  }, [thumbnailImg]);

  // Handlers
  const handleClickNext = () => {
    if (currentStep === 3) {
      createTrip(
        {
          travelName: nickname.length > 0 ? nickname : `${location.join(', ')} 여행`,
          city: location[0],
          country: location[1],
          startDate: date?.from?.toISOString() ?? '',
          endDate: date?.to?.toISOString() ?? '',
          // memo: '',
        },
        {
          onSuccess: (data) => {
            navigate(`/trips`);
            toast.success('여행이 성공적으로 생성되었습니다');
          },
          onError: (error) => {
            console.log(error);
            toast.error('여행 만들기를 실패했습니다. 다시 시도해주세요');
          },
        },
      );
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-dvh">
      <div className="flex-grow">
        <header className="flex items-center justify-between px-6 pt-10 mb-9">
          <span className="text-2xl font-semibold text-text-primary">새 여행 만들기</span>

          {currentStep < 1 ? (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="text-sm font-bold text-text-aside data-[exit=true]:text-functional-error-main"
                  data-exit={currentStep < 1}
                >
                  {currentStep < 1 ? '나가기' : '돌아가기'}
                </button>
              </DialogTrigger>
              <DialogContent className="bg-bg-back max-w-moduchongmu">
                <DialogHeader className="text-start">
                  <DialogTitle className="text-lg font-bold text-text-primary">여행 만들기를 그만둘까요?</DialogTitle>
                  <DialogDescription className="text-base font-medium text-text-secondary">
                    지금까지 만들던 여행 정보가 사라집니다
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2 gap-1 min-[640px]:gap-0">
                  <DialogClose asChild>
                    <Button variant="ghost" size="medium">
                      계속 만들기
                    </Button>
                  </DialogClose>
                  <DialogClose asChild onClick={() => navigate(state?.from ?? '/trips')}>
                    <Button variant="destructive" size="medium">
                      나가기
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <button
              className="text-sm font-bold text-text-aside data-[exit=true]:text-functional-error-main"
              data-exit={currentStep < 1}
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              {currentStep < 1 ? '나가기' : '돌아가기'}
            </button>
          )}
        </header>

        <div className="flex w-full pb-2 overflow-hidden">
          <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            <div
              className="w-full flex-shrink-0 invisible opacity-0 transition-[opacity,_visibility] duration-300 data-[show=true]:visible data-[show=true]:opacity-100"
              data-show={currentStep === 0}
            >
              {currentStep === 0 && (
                <CreateTripFirst
                  location={location}
                  onSelectLocation={setLocation}
                  thumbnail={thumbnailSrc}
                  onThumbnailChange={setThumbnailImg}
                />
              )}
            </div>
            <div
              className="w-full flex-shrink-0 invisible opacity-0 transition-[opacity,_visibility] duration-300 data-[show=true]:visible data-[show=true]:opacity-100"
              data-show={currentStep === 1}
            >
              {currentStep === 1 && <CreateTripSecond date={date} onChangeDate={setDate} />}
            </div>
            <div
              className="w-full flex-shrink-0 invisible opacity-0 transition-[opacity,_visibility] duration-300 data-[show=true]:visible data-[show=true]:opacity-100"
              data-show={currentStep === 2}
            >
              {currentStep === 2 && (
                <CreateTripThird nickname={nickname} onNicknameChange={setNickname} location={location} />
              )}
            </div>
            <div
              className="w-full flex-shrink-0 invisible opacity-0 transition-[opacity,_visibility] duration-300 data-[show=true]:visible data-[show=true]:opacity-100"
              data-show={currentStep === 3}
            >
              {currentStep === 3 && (
                <CreateTripFourth location={location} thumbnail={thumbnailSrc} date={date} nickname={nickname} />
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateTripNextButton
        step={currentStep}
        location={location}
        date={date}
        nickname={nickname}
        onClick={handleClickNext}
        className="m-6"
        disabled={isCreatingTrip}
      />
    </div>
  );
};

export default CreateTrip;
