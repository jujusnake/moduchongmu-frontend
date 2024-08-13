import { ButtonHTMLAttributes, useMemo } from 'react';
import { Button } from '../ui/buttons';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

type Props = {
  step: number;
  location: string;
  date: DateRange | undefined;
  nickname: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CreateTripNextButton = ({ step, location, date, nickname, className, ...props }: Props) => {
  // Values
  const isButtonDisabled = useMemo(() => {
    if (step === 0) {
      return location.length < 1;
    }
    if (step === 1) {
      return !date?.from;
    }

    return false;
  }, [step, location, date?.from, nickname]);

  const buttonLabel = useMemo(() => {
    if (step === 2 && nickname.length < 1) {
      return '건너뛰기';
    } else if (step > 2) {
      return '여행 만들기';
    } else return '다음 단계로';
  }, [step, nickname]);

  return (
    <Button
      size="large"
      className={cn('w-[calc(100vw-48px)] max-w-moduchongmu-padding', className)}
      disabled={isButtonDisabled}
      {...props}
    >
      {buttonLabel}
    </Button>
  );
};

export default CreateTripNextButton;
