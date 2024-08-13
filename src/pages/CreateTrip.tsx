import CreateTripNextButton from '@/components/atoms/CreateTripNextButton';
import CreateTripFirst from '@/components/templates/CreateTripFirst';
import CreateTripFourth from '@/components/templates/CreateTripFourth';
import CreateTripSecond from '@/components/templates/CreateTripSecond';
import CreateTripThird from '@/components/templates/CreateTripThird';
import { Button } from '@/components/ui/buttons';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogHeader } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  // Hooks
  const navigate = useNavigate();
  const { state } = useLocation();

  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState<File | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [nickname, setNickname] = useState('');

  return (
    <div className="min-h-dvh flex flex-col justify-between">
      <div className="flex-grow">
        <header className="flex items-center justify-between pt-10 px-6 mb-9">
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
                  <DialogTitle className="font-bold text-text-primary text-lg">여행 만들기를 그만둘까요?</DialogTitle>
                  <DialogDescription className="font-medium text-text-secondary text-base">
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

        <div className="w-full flex overflow-hidden pb-2">
          <div
            className="flex transition-transform w-full duration-500 ease-in-out"
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
                  thumbnail={thumbnailImg}
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
                <CreateTripFourth location={location} thumbnail={thumbnailImg} date={date} nickname={nickname} />
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
        onClick={() => setCurrentStep((prev) => prev + 1)}
        className="m-6"
      />
    </div>
  );
};

export default CreateTrip;
