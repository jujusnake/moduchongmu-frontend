import { Button, ButtonIcon } from '@/components/ui/buttons';
import { PlaneTakeoff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TripsEmpty = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center px-6 min-h-[calc(100svh-200px)]">
      <PlaneTakeoff size={100} strokeWidth={1.3} className="mb-6" />
      <div className="mb-6 space-y-4 text-center text-text-primary">
        <h1 className="text-2xl font-semibold">여행을 시작해볼까요?</h1>
        <p className="text-base">함께 하는 여행, 비용에 대한 스트레스 없이 떠나보세요!</p>
      </div>
      <Button
        className="rounded-full w-full max-w-[200px] py-2"
        onClick={() => navigate('/createtrip', { state: { from: '/trips' } })}
      >
        <ButtonIcon name="plus" />새 여행 만들기
      </Button>
    </main>
  );
};

export default TripsEmpty;
